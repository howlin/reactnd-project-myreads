import React from 'react';
import { Route } from 'react-router-dom';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';


class BooksApp extends React.Component {
  state = {
    bookShelves: [{
      title: 'Currently Reading',
      shelf: 'currentlyReading'
    },{
      title: 'Want to Read',
      shelf: 'wantToRead'
    },{
      title: 'Read',
      shelf: 'read'
    }],
    books: []
  };
  componentDidMount() {
    const retrived = localStorage.getItem('books')
    if (retrived){
      this.setState(() => ({
        books: JSON.parse(retrived)
      }))
    }
  }
  isBookOnBookshelf = (book) => {
    let shelf;
    this.state.books.forEach(b => {
      if (b.id === book.id){
        shelf = b.shelf
      }
    });
    return shelf ?? 'none'
  };
  changeShelf = (updatedBook, shelf) => {
    this.setState( prevState => ({
      books: prevState.books.map(b => {
        if (b.id === updatedBook.id){
          b.shelf = shelf;
        }
        return b;
      })
    }), this.syncLocalStorage);
  };
  addBook = (book, shelf) => {
    book.shelf = shelf;
    this.setState( prevState => {
      const books = [...prevState.books, book]
      return {
        books: books
      }
    }, this.syncLocalStorage);
  };
  removeBook = book => {
    this.setState( prevState => ({
      books: prevState.books.filter(b => {
        return b.id !== book.id;
      })
    }), this.syncLocalStorage);
  };
  onChangeBook = (action, book, shelf) => {
    if (!['changeShelf', 'add', 'delete'].includes(action)){
      throw new Error('ERROR: action can only be "changeShelf", "add" or "delete"');
    }

    switch (action) {
      case 'add':
        this.addBook(book, shelf);
        break;
      case 'delete':
        this.removeBook(book);
        break;
      case 'changeShelf':
      default:
        this.changeShelf(book, shelf);
        break;
    }
  }
  syncLocalStorage = () => {
    localStorage.setItem('books', JSON.stringify(this.state.books))
  }
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks 
            bookShelves={this.state.bookShelves} 
            books={this.state.books} 
            onChangeBook={this.onChangeBook} 
            isBookOnBookshelf={this.isBookOnBookshelf} />
        )} />
        <Route path='/search' render={() => (
          <SearchBooks 
            onChangeBook={this.onChangeBook} 
            isBookOnBookshelf={this.isBookOnBookshelf} />
        )} />
      </div>
    );
  }
}

export default BooksApp;
