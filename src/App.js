import React, { Component } from 'react';
import {ItemFeed} from './item-feed';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div>
        <select onChange={this.props.filterFeed} className='selectors'>
          <option defaultValue hidden>Select Type</option>
          <option>Text only</option>
          <option>Images only</option>
          <option>Image and text</option>
          <option>No items</option>
        </select>
        <ItemFeed feedData={this.props.filterReducer.feed_data} likeFeed={this.props.likeFeed} 
         addComment={this.props.addComment} ></ItemFeed>
      </div>
    );
  }
}

function filterAction(event) {
  return {
    type: event.target.value
  }
}

function likeAction(event, likeToggle) {
  return {
    type: likeToggle,
    payload: event.target.value
  }
}

function commentAction(data,key) {
  return {
    type: 'comment',
    payload: data,
    value: key
  }
}

const mapStateToProps = (state)=>{
  return{
      reducer: state.reducer,
      filterReducer: state.filterReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    filterFeed: (event) => {
      dispatch(filterAction(event))
    },
    likeFeed: (event, likeToggle) => {
      dispatch(likeAction(event,likeToggle))
    },
    addComment: (data,key) => {
      dispatch(commentAction(data,key))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);