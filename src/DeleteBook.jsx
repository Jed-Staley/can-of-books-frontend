import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

function DeleteBook({ show, close, books, updateBooks }) {
  const deleteBook = async (id) => {
    try {
      console.log('Deleting book through', `${import.meta.env.VITE_BACKEND_URL}/books/${id}`);
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/books/${id}`);
      updateBooks([]);
      close();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Books</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {books.map((book) => (
            <div key={book._id}>
              <h2>{book.title}</h2>
              <p>Availability: {book.availability}</p>
              <Button key={book._id} onClick={() => deleteBook(book._id)}>Delete</Button>
            </div>
          )) || (
            <h3>No Books Found :(</h3>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteBook;
