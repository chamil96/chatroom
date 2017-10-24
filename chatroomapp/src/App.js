import React, { Component } from 'react';

class App extends Component {
  //Need to set up state
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      currentComment: '',
      commentsList: []
    }

  }

  //function to push comment into state when button is pressed
  handleClick(){
    const newCommentArray = this.state.commentsList.slice();
    const newComment = this.state.currentComment;
    const commentObject = {text: newComment, likes:0, dislikes:0, replies:[], replyComment: ""};
    newCommentArray.push(commentObject);
    if(this.state.currentComment === ''){
      return;
    }
    this.setState({
      commentsList: newCommentArray,
      currentComment: ''
    });
  }

  // function to recognize change in box
  handleChange(e){
    const comment = e.target.value;
    this.setState({
      currentComment: comment
    });
  }

  handleReplyChange(e, i){
    const copyState = Object.assign({}, this.state);
    copyState.commentsList[i].replyComment = e.target.value;
    this.setState(
      copyState
    );
  }


  // Decreases likes
  dislikeCounter(i){
    const newCommentArray = this.state.commentsList.slice();
    newCommentArray[i].dislikes++;
    this.setState({
      commentsList: newCommentArray
    });
  }

  // Increases likes
  likeCounter(i){
    const newCommentArray = this.state.commentsList.slice();
    newCommentArray[i].likes++;
    this.setState({
      commentsList: newCommentArray
    });
  }

  // Delete
    handleDelete(i){
      const copyState = Object.assign({}, this.state);
      copyState.commentsList.splice(i, 1);
      this.setState(copyState);
    }

    //Reply
    handleReply(i){
      const copyState = Object.assign({}, this.state);
      const replyObject = {text: copyState.commentsList[i].replyComment, likes: 0, dislikes: 0}
      copyState.commentsList[i].replies.push(replyObject);
      copyState.commentsList.replyComment = "";
      this.setState(copyState);
    }


  render() {
    //loops through each commentlist list and returns comment with varius buttons
    const postedComments = this.state.commentsList.map(function(comment, i){

      let addReplies = comment.replies.map(function(replies, i ){
        return(
          <li key={i}>
            Reply: {replies.text}
          </li>
        )
      }, this);


      return(
        <div className="posted_comments">
          <div className="comment-setup">
            {comment.text}
            <div className="comment_buttons">
              <textarea onChange={(e) => {this.handleReplyChange(e, i)}} id="commentbox" name="comment" rows="1" cols="30" placeholder="Reply"></textarea><br/>
              <input type="button" onClick={() => {this.handleReply(i)}} value="Reply" />
              <input type="button" onClick={() => {this.likeCounter(i)}} value="Like" /> {comment.likes}
              <input type="button" onClick={() => {this.dislikeCounter(i)}} value="Dislike" /> {comment.dislikes}
              <input type="button" onClick={() => {this.handleDelete(i)}} value="Delete" />
            </div>
          </div>
          <div>
            <ul className="Replies">
              {addReplies}
            </ul>
          </div>
        </div>
      );
    }, this);

    return (
      <div className="App">
        <h1 id="header">Chatroom</h1>
        <div className="commentsection">
          <textarea onChange={this.handleChange} id="commentbox" name="comment" rows="2" cols="70" value={this.state.currentComment} placeholder="What is on your mind?"></textarea><br/>
          <input id="post_btn" type="button" onClick={this.handleClick} value="Post" />
        </div>
        {postedComments}
      </div>
    );
  }
}

export default App;
