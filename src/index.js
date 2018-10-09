import React from 'react';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, combineReducers} from 'redux';
import { Provider} from 'react-redux';
import feed from './feed.json';
import { render } from 'react-dom';

let initialState = {
    feed_data: feed,
    filter_data: feed
}

const filterReducer = (state=initialState, action) => {
    var newState;
    switch(action.type)
    {
        case 'Text only':
        newState={
            ...state,
            feed_data: state.filter_data.filter((item) => {
                return item.image === ''
            })
        }
        return newState;

        case 'Images only':
        newState={
            ...state,
            feed_data: state.filter_data.filter((item) => {
                return item.image !== ''
            })
        }
        return newState;

        case 'No items':
        newState={
            ...state,
            feed_data: []
        }
        return newState;

        default:
        newState={
            ...state,
            feed_data: state.filter_data
        }
        return newState;
    }
}

const reducer = (state=initialState, action) => {
    var newState;
    var newdata=state.feed_data;
    switch(action.type) 
    {
        case 'Like':
            newdata[action.payload-1].likes=parseInt(state.feed_data[action.payload-1].likes)+1;
            newState = {
                ...state,
                feed_data: newdata
            }
            return newState;

        case 'Dislike':
            newdata[action.payload-1].likes=parseInt(state.feed_data[action.payload-1].likes)-1;
            newState = {
                ...state,
                feed_data: newdata
            }
            return newState;

        case 'comment':
            let newComment = {
            "comment" : action.payload,
            "created_at" : new Date().toDateString().concat(' ',new Date().toTimeString())
            }
            state.filter_data[action.value-1].comments.push(newComment)
            break;

        default:
            {}
    }
    return state;
}

const store = createStore(combineReducers({reducer,filterReducer}))

render(
    <Provider store = {store}>
        <App/>
    </Provider>, document.getElementById('root')
)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
