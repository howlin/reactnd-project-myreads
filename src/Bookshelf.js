import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class Bookshelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onChangeBook: PropTypes.func.isRequired,
    isBookOnBookshelf: PropTypes.func.isRequired
  };
  render() {
    const { title, books, onChangeBook, isBookOnBookshelf } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map( book => (
              <li key={book.id} >
                <Book
                  book={book}
                  onChangeBook={onChangeBook}
                  isBookOnBookshelf={isBookOnBookshelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;