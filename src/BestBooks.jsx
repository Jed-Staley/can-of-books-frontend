import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import AddBook from './AddBook';

const BestBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddBookModal, setShowAddBookModal] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      console.log(`${import.meta.env.VITE_BACKEND_URL}/books`);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/books`);
      setBooks(response.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError('Failed to fetch books.');
      console.error('Error fetching books:', error);
    }
  };

  const addBook = async (newBook) => {
    // try {
      console.log(`${import.meta.env.VITE_BACKEND_URL}/books`, newBook);
      let response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/books`, newBook);
      console.log(response);  
      console.log(response.data);
      setBooks([...books, response.data]);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const deleteBook = async (id) => {
    try {
      console.log(`${import.meta.env.VITE_BACKEND_URL}/books/${id}`);
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/books/${id}`);
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const toggleAddBookModal = () => {
    setShowAddBookModal((prev) => !prev);
  };

  return (
    <>
      <h2>My Essential Lifelong Learning & Formation Shelf</h2>

      <Button onClick={toggleAddBookModal}>Add Book</Button>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <h3>{error}</h3>
      ) : books.length ? (
        <Carousel>
          {books.map((book) => (
            <Carousel.Item key={book._id}>
              <div className="book">
                <h3>{book.title}</h3>
                <p>{book.description}</p>
                <p>Availability: {book.availability}</p>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <h3>No Books Found :(</h3>
      )}
      <AddBook
        show={showAddBookModal}
        handleClose={toggleAddBookModal}
        handleAddBook={addBook}
        handleDeleteBook={deleteBook}
        books={books}
      />
    </>
  );
};

export default BestBooks;
