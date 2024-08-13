import {PythonShell} from 'python-shell';
import axios from 'axios';

export const getUserRecommendations = async (id, query) => {
    // console.log(id);
    // console.log(query);
    const options = {
    mode: 'text',
    // pythonPath: 'path/to/python',
    scriptPath: './app/src',
    args: [
        'user',
        id || 'df7068f85819b1d0bd6b4ed20096692d',
        query.number_of_similar_books || 5,
        query.number_of_recommendations || 5
    ]
    };
    // console.log(options);

    try {
        const message = await PythonShell.run('BookWave.py', options);
        const result = JSON.parse(message[0]);
        console.log(result);
        return await result;
    } catch (error) {
        console.error('Error running Python script:', error);
        throw error;
    }
};

export const getBookRecommendations = async (id, query) => {
    const options = {
        mode: 'text',
        // pythonPath: 'path/to/python',
        scriptPath: './app/src',
        args: [
            'book',
            id || '8664353',
            query.number_of_similar_books || 5
        ]
    };

    try {
        const message = await PythonShell.run('BookWave.py', options);
        const result = JSON.parse(message[0]);

        console.log(result);

        // fetching the books from the result
        const bookDetailsPromises = result.map(async (rec) => {
            try {
                // console.log(`http://localhost:3000/books/?book_id=${rec.book_id}`);
                const response = await axios.get(`http://localhost:3000/books/?book_id=${rec.book_id}`);
                return { ...rec, ...response.data };
            } catch (error) {
                console.error(`Error fetching details for book_id ${rec.book_id}:`, error);
                return { ...rec, error: `Failed to fetch details for book_id ${rec.book_id}` };
            }
        });

        // Wait for all promises to resolve
        const detailedRecommendations = await Promise.all(bookDetailsPromises);

        console.log(detailedRecommendations);
        return detailedRecommendations;

    } catch (error) {
        console.error('Error running Python script:', error);
        throw error;
    }
};

