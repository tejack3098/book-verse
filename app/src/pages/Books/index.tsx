import { useState, useEffect, useCallback } from "react";
import { getBooks } from "../../services/BooksAPI";
import { IBookInfo } from "../../models/IBookInfo";
import { Card } from "../../components/Card";
import { Container, CardContainer, PaginationContainer, SearchContainer } from "./styles";
import { Title } from "../../components/Title";
import { useTranslation } from 'react-i18next';
import LanguageSelector from "../../components/Translate/LanguageSelector";
import { FaSearch } from 'react-icons/fa'; // Importing the search icon

const BOOKS_PER_PAGE = 15;

export const Books = () => {
    const { t } = useTranslation('common');
    const [books, setBooks] = useState<IBookInfo[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchData = useCallback(() => {
        getBooks().then((response: IBookInfo[]) => setBooks(response));
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Filter books based on search query
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate the books to display on the current page
    const indexOfLastBook = currentPage * BOOKS_PER_PAGE;
    const indexOfFirstBook = indexOfLastBook - BOOKS_PER_PAGE;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

    // Calculate total pages
    const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <Container>
            <Title text={t("app.explore")} />
            <SearchContainer>
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    placeholder={t("search.placeholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </SearchContainer>
            <CardContainer>
                {currentBooks.map((book, index) => (
                    <Card
                        info={{
                            id: book.id,
                            author: book.authors,
                            country: book.country,
                            imageLink: book.image_url,
                            link: book.link,
                            title: book.title,
                            year: book.year,
                            price: book.price,
                            book_id: book.book_id,
                            detailsButton: true,
                        }}
                        key={index}
                    />
                ))}
            </CardContainer>
            <PaginationContainer>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => {
                    const page = index + 1;
                    if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                        return (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={currentPage === page ? 'active' : ''}
                            >
                                {page}
                            </button>
                        );
                    }
                    return null;
                })}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </PaginationContainer>
            <div className="language-selector-container">
                <LanguageSelector />
            </div>
        </Container>
    );
};
