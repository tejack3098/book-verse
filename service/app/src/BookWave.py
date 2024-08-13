#!/usr/bin/env python
# coding: utf-8

# Book Wave: Curated Reads Just For You

import pandas as pd
import numpy as np
import seaborn as sns
import gzip
import json
import sys
import pickle

# ## Dataset for Collaborative Filtering

def load_data(file_name, end_index = 500):
    count = 0
    data = []
    with gzip.open(file_name) as fin:
        for l in fin:
            d = json.loads(l)
            count += 1
            data.append(d)
            
            # break if reaches the 100th line
            if (end_index is not None) and (count > end_index):
                break
    return data

import ast
def extract_author_ids(authors_column):
    author_ids = set()
    for authors_list in authors_column:
        authors_data = ast.literal_eval(authors_list)  # Convert string representation of list to actual list
        for author in authors_data:
            author_ids.add(author['author_id'])
    return list(author_ids)

def preprocess():
    # loading the csv:
    good_reads_reviews_100_df = pd.read_csv('./app/src/Popular_Book_Ratings.csv')

    good_reads_books_df = pd.read_csv('./app/src/Popular_Books.csv')


    good_reads_books_df['authors']


    # ### Loading Authors

    good_reads_authors = load_data('./app/src/Goodreads_Book_Authors.json.gz', end_index=10000000)
    good_reads_authors_df = pd.DataFrame(good_reads_authors)
    good_reads_authors_df.drop(columns=['text_reviews_count', 'ratings_count'], inplace=True)
    # good_reads_authors_df.info()


    # We only need authors of the 558 unique books:




    book_author_ids = extract_author_ids(good_reads_books_df['authors'])
    good_reads_authors_df = good_reads_authors_df[good_reads_authors_df['author_id'].isin(book_author_ids)]
    # good_reads_authors_df.head()

    # ## Exploratory Data Analysis on Goodreads Dataset

    # Let us look at how many unique books, users and ratings are there in the latest dataset.
    good_reads_reviews_100_df['user_id'].nunique()
    # There are a total of 5,469 unique users.

    good_reads_reviews_100_df['book_id'].nunique()
    # There are a total of 558 unique books.


    good_reads_reviews_100_df['rating'].nunique()

    # let's see the unique values of the ratings
    sorted(good_reads_reviews_100_df['rating'].unique())
    # The users are allowed to rate each book as the following values [0, 1, 2, 3, 4, 5]



    # good_reads_reviews_100_df['title'].sort_values().unique()




    # Let's see if any users have read The Chronicles of Narnia
    # good_reads_reviews_100_df[good_reads_reviews_100_df['title'] == 'The Chronicles of Narnia (Chronicles of Narnia, #1-7)'].head(5)


    # It looks like the user id df7068f85819b1d0bd6b4ed20096692d liked the book very much because they rated it a 5/5.



    # df7068f85819b1d0bd6b4ed20096692d
    # good_reads_reviews_100_df['title'][good_reads_reviews_100_df['user_id'] == 'df7068f85819b1d0bd6b4ed20096692d'].sort_values().unique()


    # # Machine Learning Models (On Goodreads Dataset)

    # # Item Based Collaborative Filtering

    # ## Creating The Books - User Matrix

    # For this we must convert the data frame that we have such that each user will be denoted by the rows and the books will be denoted by the columns, and each user’s rating of the book will be the data in this matrix. We can convert our data frame to this matrix by using pivot table concept as shown below:

    cf_matrix = good_reads_reviews_100_df.pivot_table(index='book_id', columns='user_id', values='rating')

    # print("cf_matrix:")
    # cf_matrix.info()


    # ## Problems with Computing Similarity Immediately
    # If we directly use the cosine similarity from this matrix, it will not be very useful, because the models will think that a rating of 2/5 and 4/5 are very close to each other. However, in reality the rating 2 denotes that the book was not very good (negative rating), and rating 4 denotes that a book is very good (positive rating). One way that we can combat this problem is that we can perform mean centering based on average rating of the books.
    # ### Mean Center Users

    matrix_mean_center = cf_matrix.subtract(cf_matrix.mean(axis=1), axis = 0)
    # matrix_mean_center


    # ## Pearson Correlation

    # Finding the user - user similarity matrix using Pearson correlation
    book_similarity = matrix_mean_center.T.corr()
    # book_similarity.head()

    # Selecting a user ID (of a user who has read Chronicles of Narnia but who has not read Harry Potter)
    userid = 'df7068f85819b1d0bd6b4ed20096692d'

    # Books that the target user has read
    userid_read = pd.DataFrame(matrix_mean_center[userid].dropna(axis=0, how='all')                          .sort_values(ascending=False))                          .reset_index()                          .rename(columns={1:'rating'})

    # Let's load the matrix_mean_center & book_similarity using pickle

    with open('./app/src/matrix_mean_center.pkl', 'wb') as f:
        pickle.dump(matrix_mean_center, f)

    with open('./app/src/book_similarity.pkl', 'wb') as f:
        pickle.dump(book_similarity, f)


    # Selecting a book
    # selected_book = 'Harry Potter and the Half-Blood Prince (Harry Potter, #6)'
    # The Great Gatsby:
    selected_book = 4671

    # Similarity score of The Great Gatsby book with all the other books
    book_similarity_score = book_similarity[[selected_book]].reset_index().rename(columns={4671:'Book_Similarity_Score'})

    # Rank the similarities between the books the user rated and Great Gatsby.
    n = 5

    user_read_similarity = pd.merge(left=userid_read, 
                                                right=book_similarity_score, 
                                                on='book_id', 
                                                how='inner')\
                                            .rename(columns={userid: 'User_Rating'})\
                                            .sort_values('Book_Similarity_Score', ascending=False)[:5]

    # Take a look at the User's read books with highest similarity
    # print("The books with the highest similarity to The Great Gatsby Based on the User")
    # print(user_read_similarity)



import json
import operator

# Recommendation function for books
def book_based_rec(book_id, number_of_similar_books=5):
    # loading the book_similarity matrix
    with open('./app/src/book_similarity.pkl', 'rb') as f:
        book_similarity = pickle.load(f)
    
    # Check if the book_id exists in the book_similarity dataframe
    if book_id not in book_similarity.columns:
        return json.dumps({"error": "Book ID not found"})

    # get the similarity score for a book
    similar_books = book_similarity[[book_id]].reset_index().rename(columns={book_id:'similarity_score'})
    
    # Sort by similarity score in descending order and select the top similar books
    similar_books = similar_books.sort_values('similarity_score', ascending=False).head(number_of_similar_books)

    # creating a list of dictionaries
    recommendations = [
        {"book_id": row['book_id'], "similarity_score": row['similarity_score']}
        for index, row in similar_books.iterrows()
    ]

    return json.dumps(recommendations)

# Item-based recommendation function
def user_based_rec(userid='df7068f85819b1d0bd6b4ed20096692d', number_of_similar_books=5, number_of_recommendations =5):
    
    # load from the pickle file
    with open('./app/src/matrix_mean_center.pkl', 'rb') as f:
        matrix_mean_center = pickle.load(f)

    with open('./app/src/book_similarity.pkl', 'rb') as f:
        book_similarity = pickle.load(f)
    
    # Dataframe storing books that the target user has not yet read
    user_unread_book = pd.DataFrame(matrix_mean_center[userid].isna()).reset_index()
    user_unread_book = user_unread_book[user_unread_book[userid]==True]['book_id'].values.tolist()

    # Dataframe storing books that the target user has read
    user_read_book = pd.DataFrame(matrix_mean_center[userid].dropna(axis=0, how='all')                            .sort_values(ascending=False))                            .reset_index()                            .rename(columns={1:'rating'})
    
    # print("The books the user has read are: ")
    # print(user_read_book['book_id'][:number_of_similar_books])
    # print()
    # Dictionary to save the unread book and predicted rating pair
    rating_prediction ={}  

    # Loop through unread books          
    for book in user_unread_book: 
        # Calculate the similarity score of the book with other books
        book_similarity_score = book_similarity[[book]].reset_index().rename(columns={book:'similarity_score'})
        # Rank the similarities between the read books and the unread books.
        user_read_book_similarity = pd.merge(left=user_read_book, 
                                                    right=book_similarity_score, 
                                                    on='book_id', 
                                                    how='inner')\
                                            .sort_values('similarity_score', ascending=False)[:number_of_similar_books]
        
        # print(user_read_book_similarity)
        # Calculate the predicted rating using weighted average of similarity scores and the ratings from user 1
        predicted_rating = round(np.average(user_read_book_similarity[userid], 
                                            weights=user_read_book_similarity['similarity_score']), 6)
        # Save the predicted rating in the dictionary
        rating_prediction[book] = predicted_rating

    # Convert sorted recommendations into a list of dictionaries
    recommendations = [{"book_id": book_id, "similarity": similarity_score} for book_id, similarity_score in sorted(rating_prediction.items(), key=operator.itemgetter(1), reverse=True)[:number_of_recommendations]]

    # Return the top recommended books
    return json.dumps(recommendations)

# Get recommendations
# recommended_book = book_based_rec(userid='df7068f85819b1d0bd6b4ed20096692d', number_of_similar_books=10, number_of_recommendations =20)
# Recommended Books for the user are:
# print('Recommended Book IDs for the user based on item based collaborative filtering are: ')
# print(recommended_book)


# # Conclusion
# From these set of experiments, we can see that the cosine similarity was indeed able to recommend similar books. The first content-based filtering approach were more focused on the content rather that the type of books users read. The row highlighted above using the count vectorizer with k = 20 having precision - 0.111, recall – 0.1 and f1-score 0.105 was the best among the rest.
# <br>
# 
# However, this was not a good metric to use to understand how the performance of the models were. In the below table we can see that the highest similarity score of the different models while recommendation
# 
# Finally, we can see that the advanced Doc2Vec model had the highest similarity score for the book recommendations from 89.5% to 78.4%.
# 

if __name__ == '__main__':
    # Parsing command line arguments
    if (len(sys.argv) > 1 and sys.argv[1] == 'user'):
        userid = sys.argv[2] if len(sys.argv) > 1 else 'df7068f85819b1d0bd6b4ed20096692d'
        number_of_similar_books = int(sys.argv[3]) if len(sys.argv) > 2 else 5
        number_of_recommendations = int(sys.argv[4]) if len(sys.argv) > 3 else 5
        result = user_based_rec(userid=userid, number_of_similar_books=number_of_similar_books, number_of_recommendations=number_of_recommendations)
    elif (len(sys.argv) > 1 and sys.argv[1] == 'book'):
        book_id = sys.argv[2] if len(sys.argv) > 1 else '12067'
        number_of_similar_books = int(sys.argv[3]) if len(sys.argv) > 2 else 5
        result = book_based_rec(book_id=int(book_id), number_of_similar_books=number_of_similar_books)
    else:
        result = json.dumps({"error": "Invalid REST API Input"})
    print(result)