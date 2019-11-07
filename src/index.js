import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import {App} from './components/App';
import {ErrorBoundry} from './components/Error-boundry';
import BookstoreService from './services/bookstore-service';
import {BookStoreServiceProvider} from './components/Bookstore-service-context';

import store from './store';

const booksstoreService = new BookstoreService();

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry>
            <BookStoreServiceProvider value={booksstoreService}>
                <Router>
                    <App/>
                </Router>
            </BookStoreServiceProvider>
        </ErrorBoundry>
    </Provider>,
    document.getElementById('root')
);