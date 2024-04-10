import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About';
import AddBook from './AddBook';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
              <Link to="/" className="navbar-brand">Home</Link>
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/about" className="nav-link">About</Link>
                </li>
                <li className="nav-item">
                  <Link to="/addbook" className="nav-link">Add Book</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Header />
          <Routes>
            <Route 
              exact path="/"
              element={<BestBooks />}
            />
            <Route 
              path="/about"
              element={<About />}
            />
          </Routes>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
