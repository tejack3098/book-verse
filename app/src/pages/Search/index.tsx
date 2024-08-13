import { useSearchParams } from "react-router-dom";
import { IBookInfo, searchBooks } from "../../services/BooksAPI";
import { useCallback, useEffect, useState } from "react";
import { Container } from "./styles";
import { Link } from "react-router-dom";

export const Search = () => {
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [data, setData] = useState<IBookInfo[]>([]);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const response = await searchBooks(searchParams);
      setData(response);
    } catch (error) {
      setError("Error while fetching Book!");
    }
    setLoading(false);
  }, [searchParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {error && <p>An error ocurred!</p>}
      {loading && <p>Loading data...</p>}
      {data && (
        <Container>
          <h2>
            <span>{data.length}</span> registers for <span>Website</span>
          </h2>
          {data.map((item, index) => (
            <div key={index}>
              <Link to={`/books/${item.id}`}>
                <p>{item.title}</p>
              </Link>
            </div>
          ))}
        </Container>
      )}
    </>
  );
};
