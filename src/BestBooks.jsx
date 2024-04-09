import React from 'react';
import axios from 'axios'; // Assuming you have Axios installed
import Carousel from 'react-bootstrap/Carousel';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      loading: true, // Add loading state to manage the fetch status
      error: null    // Add error state to handle fetch errors
    };
  }

  componentDidMount() {
    // Fetch books data when the component mounts
    this.fetchBooks();
  }

  fetchBooks = async () => {
    try {
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

  render() {
    const { books, loading, error } = this.state;

    return (
      <>
        <h2>My Essential Lifelong Learning & Formation Shelf</h2>
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
          <h3>No Books Found</h3>
        )}
      </>
    );
  }
}

export default BestBooks;

