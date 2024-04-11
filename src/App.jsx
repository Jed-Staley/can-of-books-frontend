import React from 'react';
import axios from 'axios';

import Header from './Header';
import Footer from './Footer';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BestBooks from './BestBooks';
import About from './About';
import AddBook from './AddBook';
import EditBook from './EditBook';
import DeleteBook from './DeleteBook';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  state = {
    showAddBookModal: false,
    showEditBookModal: false,
    showDeleteBookModal: false,
    books: []
  };

  updateBooks = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/books`);
      this.setState({ books: response.data });
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  toggleAddBookModal = () => {
    this.setState({ showAddBookModal: !this.state.showAddBookModal });
  };

  toggleEditBookModal = () => {
    this.setState({ showEditBookModal: !this.state.showEditBookModal });
  };

  toggleDeleteBookModal = () => {
    this.setState({ showDeleteBookModal: !this.state.showDeleteBookModal });
  };

  setBooks = (newBooks) => {
    this.setState({ books: newBooks })
  }

  render() {
    const { books } = this.state;

    return (
      <>
        <Router>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
              <Link className="navbar-brand" to="./">Home</Link>
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <button className="nav-link" onClick={this.toggleAddBookModal}>Add Book</button>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={this.toggleEditBookModal}>Edit Book</button>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={this.toggleDeleteBookModal}>Delete Book</button>
                </li>
                <li className="nav-item">
                  <Link to="/about" className="nav-link">About</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Header />
          <Routes>
            <Route exact path="/" element={<BestBooks books={books} updateBooks={this.updateBooks} />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
        </Router>
        <AddBook show={this.state.showAddBookModal} close={this.toggleAddBookModal} updateBooks={this.updateBooks} />
        <EditBook show={this.state.showEditBookModal} close={this.toggleEditBookModal} books={this.state.books} updateBooks={this.updateBooks} />
        <DeleteBook show={this.state.showDeleteBookModal} close={this.toggleDeleteBookModal} books={this.state.books} updateBooks={this.updateBooks} />
      </>
    )
  }
}

export default App;
