import React, {Component} from 'react';
import {BookListItem} from '../book-list-item';
import {connect} from 'react-redux';
import {withBookStoreService} from '../HOC';
import {booksLoaded, booksRequested, booksError} from '../../actions';

import {Spinner} from '../Spinner';


import './book-list.css';
import ErrorIndicator from "../Error-indication/ErrorIndicator";

class BookList extends Component {

    componentDidMount() {
        this.props.fetchBooks();
    }

    render() {
        const {books, loading, error} = this.props;

        if(loading) {
            return <Spinner />
        }

        if(error) {
            return <ErrorIndicator />
        }

        return(
            <ul className={'book-list'}>
                {
                    books.map((book) => {
                        return(
                            <li key={book.id}><BookListItem book={book} /></li>
                        )
                    })
                }
            </ul>
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

const mapDispatchToProps =(dispatch, ownProps) => {

    const {bookStoreService} = ownProps;

    return {
        fetchBooks: () => {
            dispatch(booksRequested());
            bookStoreService.getBooks()
                .then((data) => dispatch(booksLoaded(data)))
                .catch((err) => dispatch(booksError(err)));
        }
    }
};


export default withBookStoreService()(connect(mapStateToProps, mapDispatchToProps)(BookList));