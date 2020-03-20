import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onChangeBook: PropTypes.func.isRequired,
    isBookOnBookshelf: PropTypes.func.isRequired
  };
  state = {
    shelf: ''
  };
  componentDidMount() {
    const { book, isBookOnBookshelf } = this.props;
    this.setState(() => ({
      shelf: isBookOnBookshelf(book)
    }));
  }
  whatShelfChangeAction = (prevShelf, newShelf) => {
    // user has selected 'none', remove the book from the bookshelf
    if (newShelf === 'none') {
      return 'delete';
    }
    // user has selected a new shelf, and the book was not previously on a shelf, so let's add it
    if (newShelf !== 'none' && prevShelf === 'none'){
      return 'add';
    }
    // user has selected a new shelf but the book was already on another shelf, so let's update that
    if (newShelf !== 'none' && prevShelf !== 'none'){
      return 'changeShelf';
    }
    return '';
  };
  handleShelfChange = (e) => {
    const newShelf = e.target.value;
    const { book } = this.props;
    let action = this.whatShelfChangeAction(this.state.shelf, newShelf)
    
    this.setState({shelf: newShelf});

    if(this.props.onChangeBook){
      try {
        this.props.onChangeBook(action, book, newShelf);
      }catch(e){
        // if this was a production app, we'd do something better here
        console.log(e);
      }
    }
  };
  render() {
    const { title, authors, imageLinks } = this.props.book;
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
                  minWidth: 128,
                  minHeight: 188,
                  backgroundImage: `url("${imageLinks.smallThumbnail}")` }}>
          </div>
          <div className="book-shelf-changer">
            <select onChange={this.handleShelfChange} value={this.state.shelf} >
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    );
  }
}

export default Book;