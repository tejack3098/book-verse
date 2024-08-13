import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { getBooks, searchBooks, deleteBook, getBookById, updateBook } from "../../services/BooksAPI";
import { IBookInfo } from "../../models/IBookInfo";


const AdminBooksPage: React.FC = () => {
  const [books, setBooks] = useState<IBookInfo[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [selectedBook, setSelectedBook] = useState<IBookInfo | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      if (searchKeyword) {
        const searchParams = new URLSearchParams({ keyword: searchKeyword });
        const results = await searchBooks(searchParams);
        setBooks(results);
      } else {
        const results = await getBooks();
        setBooks(results);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleSearch = () => {
    fetchBooks();
  };

  const handleEdit = async (id: string) => {
    try {
      const book = await getBookById(id);
      setSelectedBook(book);
      setOpenModal(true);
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  const handleSave = async () => {
    if (selectedBook) {
      try {
        await updateBook(selectedBook.id, selectedBook);
        fetchBooks();
        setOpenModal(false);
        setSelectedBook(null);
      } catch (error) {
        console.error("Error updating book:", error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    if (selectedBook) {
      setSelectedBook({
        ...selectedBook,
        [field]: value,
      });
    }
  };

  return (
    <div>
      <TextField
        label="Search by Title"
        variant="outlined"
        fullWidth
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        style={{ marginBottom: "16px" }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>

      <Grid container spacing={2} style={{ marginTop: "16px" }}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
            <Card style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
              <CardContent>
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="subtitle1">Author: {book.author}</Typography>
                <Typography>Year: {book.year}</Typography>
                <Typography>Price: ${book.price ? book.price.toFixed(2) : "N/A"}</Typography>
              </CardContent>
              <div style={{ padding: "16px", display: "flex", justifyContent: "space-between" }}>
                <Button variant="contained" color="primary" onClick={() => handleEdit(book.id)}>
                  Edit
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleDelete(book.id)}>
                  Delete
                </Button>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Edit Book Details</DialogTitle>
        <DialogContent>
          {selectedBook && (
            <div>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={selectedBook.title || ""}
                onChange={(e) => handleInputChange("title", e.target.value)}
                style={{ marginBottom: "16px" }}
              />
              <TextField
                label="Author"
                variant="outlined"
                fullWidth
                value={selectedBook.author || ""}
                onChange={(e) => handleInputChange("author", e.target.value)}
                style={{ marginBottom: "16px" }}
              />
              <TextField
                label="Year"
                type="number"
                variant="outlined"
                fullWidth
                value={selectedBook.year || ""}
                onChange={(e) => handleInputChange("year", parseInt(e.target.value))}
                style={{ marginBottom: "16px" }}
              />
              <TextField
                label="Price"
                type="number"
                variant="outlined"
                fullWidth
                value={selectedBook.price || ""}
                onChange={(e) => handleInputChange("price", parseFloat(e.target.value))}
                style={{ marginBottom: "16px" }}
              />
              <TextField
                label="Image Link"
                variant="outlined"
                fullWidth
                value={selectedBook.imageLink || ""}
                onChange={(e) => handleInputChange("imageLink", e.target.value)}
                style={{ marginBottom: "16px" }}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminBooksPage;
