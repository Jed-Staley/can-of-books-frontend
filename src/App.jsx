import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link // Import Link component from react-router-dom
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
              <Link to="/" className="navbar-brand">Home</Link>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/about" className="nav-link">About</Link>
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
