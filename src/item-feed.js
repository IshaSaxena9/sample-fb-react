import React, { Component } from 'react';
import './styles.css';
import {Item} from './Item';

export class ItemFeed extends Component {
    render() {
        return(
            <div>
                {
                    this.props.feedData.map((feedItem) => {
                        return(
                                <Item feedItem={feedItem} likeFeed={this.props.likeFeed} 
                                addComment={this.props.addComment}></Item>
                        )
                    })
                }
            </div>
        )
    }
}