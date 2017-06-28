import React from "react";
import io from 'socket.io-client'
import TextMessage from './TextMessage'
import UserInput from './UserInput'

export default class ChatBox extends React.Component {

  constructor() {
    super();

    this.state = {
      messages: [],
      socket: io('http://localhost:3000'),
      currentUser: sessionStorage.getItem("user")
    };

    /**
     * Method to emit new message to the server
     */
    this.sendMessage = (message) => {
     if (message) {
          let messageObj = { "msg": message, "user": this.state.currentUser }
          this.state.socket.emit("new-message", messageObj)
       }
    }

    /**
     * Method to save user info in session storage
     */
    this.registerUser = (username) => {
     
      if (this.state.currentUser === undefined || this.state.currentUser === null) {
          sessionStorage.setItem("user", username);
          this.setState({ currentUser: username })
          let messageObj = { "msg": username+' has joined', "user": '.' }
          this.state.socket.emit("new-message", messageObj)

          }
     }

  }

  /**
   * Invokes before component rendering
   */
  componentDidMount() {
    var self = this;
    this.state.socket.on("receive-message", function (msg) {
      var message = self.state.messages;
      message.push(msg)
      self.setState({ messages: message })
    });
  }
  
  // render method
  render() {
    // inline styles
    var textstyle = { width: "100%" }
     // messages
    var messages_list = this.state.messages.map(message_object => {
      if (message_object) {
        return (
          <li style={textstyle}>
            <TextMessage message={message_object} currentUser={this.state.currentUser}></TextMessage>
          </li>
        );}
    })

    return (
      <div>
        <br></br>
        <div className="col-sm-3 col-sm-offset-4 frame">
          <ul>{messages_list}</ul>
          <UserInput registerUser = {this.registerUser} sendMessage ={this.sendMessage} currentUser = {this.state.currentUser}></UserInput>
         </div>
      </div>
    );
  }
}
