import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

import AddBook from './AddBook';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      loading: true,
      error: null,
      showAddBookModal: false
    };
  }

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks = async () => {
    try {
      console.log('Contacting', `${import.meta.env.VITE_BACKEND_URL}/books`);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/books`);
      this.setState({
        books: response.data,
        loading: false,
        error: null
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: 'Failed to fetch books.'
      });
      console.error('Error fetching books:', error);
    }
  };

  toggleAddBookModal = () => {
    this.setState(prevState => ({
      showAddBookModal: !prevState.showAddBookModal
    }));
  };

  render() {
    const { books, loading, error, showAddBookModal } = this.state;

    return (
      <>
        <h2>My Essential Lifelong Learning & Formation Shelf</h2>

        <Button onClick={this.toggleAddBookModal}>Add Book</Button>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <h3>{error}</h3>
        ) : books.length ? (
          <Carousel>
            {books.map(book => (
              <Carousel.Item key={book._id}>
                <div className="book">
                  <h3>{book.title}</h3>
                  <p>{book.description}</p>
                  <p>Status: {book.status}</p>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <h3>No Books Found :(</h3>
        )}
        <AddBook
          show={showAddBookModal}
          handleClose={this.toggleAddBookModal}
          handleAddBook={this.handleAddBook}
          books={books}
        />
      </>
    );
  }
}

export default BestBooks;
