import React, {Component} from 'react';
import {BookListItem} from '../book-list-item';
import {connect} from 'react-redux';
import {withBookStoreService} from '../HOC';
import {fetchBooks, bookAddedToCart} from '../../actions';

import {Spinner} from '../Spinner';


import './book-list.css';
import ErrorIndicator from "../Error-indication/ErrorIndicator";

const BookList = ({books, onAddedToCart}) => {
    return (
        <ul className={'book-list'}>
            {
                books.map((book) => {
                    return (
                        <li key={book.id}>
                            <BookListItem
                                onAddedToCart={() => onAddedToCart(book.id)}
                                book={book}/>
                        </li>
                    )
                })
            }
        </ul>
    )
};

class BookListContainer extends Component {

    componentDidMount() {
        this.props.fetchBooks();
    }

    render() {
        const {books, loading, error, onAddedToCart} = this.props;

        if (loading) {
            return <Spinner/>
        }

        if (error) {
            return <ErrorIndicator/>
        }

        return (
            <BookList
                onAddedToCart={onAddedToCart}
                books={books}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books,
        loading: state.loading,
        error: state.error
    }
};

const mapDispatchToProps = (dispatch, {bookStoreService}) => {
    return {
        fetchBooks: fetchBooks(bookStoreService, dispatch),
        onAddedToCart: (id) => dispatch(bookAddedToCart(id))
    }
};


export default withBookStoreService()(connect(mapStateToProps, mapDispatchToProps)(BookListContainer));