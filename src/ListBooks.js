import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Bookshelf from './Bookshelf';

class ListBooks extends Component {
  static propTypes = {
    bookShelves: PropTypes.array.isRequired,
    books: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired
  };
  render(){
    const { bookShelves, books, updateBookShelf } = this.props
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
          {bookShelves.map( ({ title, shelf }) => (
            <Bookshelf key={title} title={title} updateBookShelf={updateBookShelf} books={
              books.filter(book => book.shelf === shelf)
            } />
          ))}
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ListBooks;