import React, {Component} from 'react';
import {BookListItem} from '../book-list-item';
import {connect} from 'react-redux';
import {withBookStoreService} from '../HOC';
import {booksLoaded, booksRequested} from '../../actions';

import {Spinner} from '../Spinner';


import './book-list.css';

class BookList extends Component {

    componentDidMount() {
        const {bookStoreService, booksLoaded, booksRequested} = this.props;
        booksRequested();
        bookStoreService.getBooks()
            .then((data) => {booksLoaded(data)});
    }

    render() {
        const {books, loading} = this.props;

        if(loading) {
            return <Spinner />
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
        loading: state.loading
    }
};

const mapDispatchToProps = {
    booksLoaded,
    booksRequested
};


export default withBookStoreService()(connect(mapStateToProps, mapDispatchToProps)(BookList));