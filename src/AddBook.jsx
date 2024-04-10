import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function AddBook(props) {
  const [bookData, setBookData] = useState({ title: '', description: '', availability: '' });

  const handleChange = event => setBookData({ ...bookData, [event.target.name]: event.target.value});

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(bookData);
    props.handleAddBook(bookData);
  }

  return (
    <Modal show={props.show} onHide={props.handleClose}>
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
        <section>
          {props.books.map((book) => (
            <div key={book._id}>
              <h2>{book.title}</h2>
              <p>Color: {book.availability}</p>
              <button id={book._id} onClick={() => props.handleDeleteBook(book._id)}>Delete Me</button>
            </div>
          ))}
        </section>
      </Modal.Body>
    </Modal>
  );
}

export default AddBook;