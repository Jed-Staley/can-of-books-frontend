import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

const BestBooks = ({ books, updateBooks }) => {
  updateBooks();

  return (
    <>
      <h2>My Essential Lifelong Learning & Formation Shelf</h2>

      {books.length ? (
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
    </>
  );
};

export default BestBooks;
