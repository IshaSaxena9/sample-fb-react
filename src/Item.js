import React, {Component} from 'react';
import './styles.css';

export class Item extends Component {
    constructor(props){
        super(props);
        this.state = {
            likeToggle: 'Like',
            input: ''
        } 
        this.handleChange = this.handleChange.bind(this);
        this.like = this.like.bind(this);
    }

    like(event) {
        this.props.likeFeed(event,this.state.likeToggle)
        if(this.state.likeToggle==='Like')
            this.setState({
                likeToggle: 'Dislike'
            })
        else
            this.setState({
                likeToggle: 'Like'
            })
    }

    handleChange(event) {
        this.setState({
            input: event.target.value
        })
    }

        render() {
            return(
                    <div className='item_card'>
                        <div>
                            <div className='item_description'>{this.props.feedItem.item_description}</div>
                            <img src={this.props.feedItem.image}/>
                            <br></br>
                            <span>{this.props.feedItem.likes} likes</span>
                            <br></br>
                            <button onClick={(event) => this.like(event)} className='like-button'
                            value={this.props.feedItem.itemKey}>{this.state.likeToggle}</button>
                        </div>
                        <div>
                            <ul>
                                {this.props.feedItem.comments.map((comment) => {
                                return (<li>
                                    <div>{comment.comment}</div>
                                    <div>{comment.created_at}</div>
                                    </li>)
                            })}
                        </ul>
                        <form  onSubmit={(event)=>{
                            event.preventDefault();
                             this.props.addComment(this.state.input,this.props.feedItem.itemKey)
                             this.setState({ input: '' })}}>
                            <input placeholder='Reply to comment...' className='reply_box'
                            onChange={this.handleChange} value={this.state.input}></input>
                        </form>
                    </div>
                    </div>
                            
            )
        }
}