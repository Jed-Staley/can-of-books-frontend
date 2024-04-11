import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

function EditBook({ show, close, books, updateBooks }) {
  const [showBooksSelection, setShowBooksSelection] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});
  useEffect(() => {
    if (show) {
      setShowBooksSelection(true);
    }
  }, [show]);
  const [showBookEditor, setShowBookEditor] = useState(false);

  const chooseBook = (book) => {
    setSelectedBook(book);
    setBookData({
      title: book.title || '',
      description: book.description || '',
      availability: book.availability || ''
    });
    setShowBooksSelection(false);
    setShowBookEditor(true);
  }

  const [bookData, setBookData] = useState({ title: '', description: '', availability: '' });

  const handleChange = event => setBookData({ ...bookData, [event.target.name]: event.target.value});

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(bookData);
    updateBook(bookData);
  }

  const updateBook = async (updatedBook) => {
    const id = selectedBook._id;
  
    try {
      console.log('Updating book through', `${import.meta.env.VITE_BACKEND_URL}/books/${id}`);
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/books/${id}`, updatedBook);
      updateBooks([]);
      close();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <>
      <Modal show={showBooksSelection && show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Books</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {books.map((book) => (
          <div key={book._id}>
            <h2>{book.title}</h2>
            <p>Availability: {book.availability}</p>
            <Button key={book._id} onClick={() => chooseBook(book)}>Edit</Button>
          </div>
        )) || (
          <h3>No Books Found :(</h3>
        )}
        </Modal.Body>
      </Modal>
      <Modal show={showBookEditor && show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {(selectedBook.title === undefined) ? '' : selectedBook.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={bookData.title} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="description" value={bookData.description} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="availability">
              <Form.Label>Availability</Form.Label>
              <Form.Control type="text" name="availability" value={bookData.availability} onChange={handleChange} />
            </Form.Group>
            <Button type="submit">Save Changes</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditBook;
