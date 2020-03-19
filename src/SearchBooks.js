import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Bookshelf from './Bookshelf'

class SearchBooks extends Component {
  static propTypes = {
    onChangeBook: PropTypes.func.isRequired,
    isBookOnBookshelf: PropTypes.func.isRequired
  };  
  state = {
    searchTerm: '',
    books: []
  };
  onSearchTermChange = searchTerm => {
    searchTerm === '' ? this.clearBooks() : this.searchBooksAPI(searchTerm);
    this.setState(() => ({
      searchTerm: searchTerm.trim()
    }));
  };
  clearBooks = () => {
    this.setState({
      books: []
    });
  };
  parseSearchResults = searchResults => {
    this.setState(() => ({
      books: searchResults.map(book => {
        const { id, title, authors, imageLinks} = book;
        return {
          id: id,
          title: title,
          authors: authors ? authors.join(', ') : '',
          imageLinks: {
            smallThumbnail: imageLinks ? imageLinks.smallThumbnail : '',
            thumbnail: imageLinks ? imageLinks.thumbnail : ''
          },
          shelf: 'none'
        }
      })
    }));
  };
  searchBooksAPI = searchTerm => {
    BooksAPI.search(searchTerm)
      .then((searchResults) => {
        'error' in searchResults ? this.clearBooks() : this.parseSearchResults(searchResults)
      });
  };
  render(){
    const { searchTerm } = this.state;
    const { onChangeBook, isBookOnBookshelf} = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/'>
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author"
              value={searchTerm}
              onChange={ e => this.onSearchTermChange(e.target.value)} />

          </div>
        </div>
        <div className="search-books-results">
            <Bookshelf 
              title='Search Results'
              onChangeBook={onChangeBook}
              isBookOnBookshelf={isBookOnBookshelf}
              books={this.state.books} />
        </div>
      </div>
    );
  }
}

export default SearchBooks;