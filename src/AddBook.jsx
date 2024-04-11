import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

function AddBook({ show, close, updateBooks }) {
  const [bookData, setBookData] = useState({ title: '', description: '', availability: '' });

  const handleChange = event => setBookData({ ...bookData, [event.target.name]: event.target.value});

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(bookData);
    addBook(bookData);
  }

  const addBook = async (newBook) => {
    try {
      console.log('Adding book through', `${import.meta.env.VITE_BACKEND_URL}/books`, newBook);
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/books`, newBook);
      updateBooks();
      close();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Books</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="title" placeholder="Name" value={bookData.title} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name="description" placeholder="Description" value={bookData.description} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="availability">
            <Form.Label>Availability</Form.Label>
            <Form.Control type="text" name="availability" placeholder="Availability" value={bookData.availability} onChange={handleChange} />
          </Form.Group>
          <Button type="submit">Add Book</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddBook;