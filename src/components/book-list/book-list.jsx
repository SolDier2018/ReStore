import React, {Component} from 'react';
import {BookListItem} from '../book-list-item';
import {connect} from 'react-redux';
import {withBookStoreService} from '../HOC';
import {fetchBooks} from '../../actions';

import {Spinner} from '../Spinner';


import './book-list.css';
import ErrorIndicator from "../Error-indication/ErrorIndicator";

class BookList extends Component {

    componentDidMount() {
        this.props.fetchBooks();
    }

    render() {
        const {books, loading, error} = this.props;

        if (loading) {
            return <Spinner/>
        }

        if (error) {
            return <ErrorIndicator/>
        }

        return (
            <ul className={'book-list'}>
                {
                    books.map((book) => {
                        return (
                            <li key={book.id}><BookListItem book={book}/></li>
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

const mapDispatchToProps = (dispatch, {bookStoreService}) => {
    return {
        fetchBooks: fetchBooks(bookStoreService, dispatch)
    }
};


export default withBookStoreService()(connect(mapStateToProps, mapDispatchToProps)(BookList));