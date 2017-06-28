import React from "react";
import { Button } from 'react-bootstrap'

export default class UserInput extends React.Component {
    constructor() {
        super();

        /**
         * Method to send message
         */
        this.sendMessage = () => {
            let message = this.yearInput.value;
            if (message) {
                this.yearInput.value = "";
                this.props.sendMessage(message);
            }
        }
        /**
         * To handle Enter key press
         */
        this.onSend = (e) => {
            if(e.key=== 'Enter'){
                this.sendMessage();
            }
        }
        /**
         * To handle Enter key Press of RegUser Text field
         */
        this.onRegUser = (e) => {
            if(e.key=== 'Enter') {
                this.registerUser();
            }
        }

        /**
         * Method to register user
         */
        this.registerUser = () => {
            let username = this.name.value;
            if (username) {
                this.name.value = "";
                this.props.registerUser(username);
            }
        }

    }

    static get propTypes() {
        return {
            registerUser: React.PropTypes.func.isRequired,
            sendMessage: React.PropTypes.func.isRequired,
            currentUser: React.PropTypes.string.isRequired
        }
    }

    render() {
        // inline style
        var divstyle = { margin: "auto" }

        var currentUser = this.props.currentUser;
        //message input fields
        var message_inputfield = (
                <input type="text" id="msgText" onKeyPress={this.onSend} className="mytext" placeholder="Type a message" ref={node => this.yearInput = node} />
            )
        //user input fields
        var user_inputfield = (
                <input type="text" id= "userName"  onKeyPress={this.onRegUser}  className="mytext" placeholder="Enter your name" ref={name => this.name = name} />
            )

        return (
            <div>
                {(() => {
                    if (currentUser === undefined || currentUser === null) {
                        return (<div className="msg-rta macro" style={divstyle}>
                            <div className="text text-r">{user_inputfield}</div>
                             <Button type="submit" id = "regUser" onClick={this.registerUser}>Enter</Button>
                            </div>)
                    } else {
                        return (<div className="msg-rta macro" style={divstyle}>
                            <div className="text text-r">{message_inputfield}</div>
                            <Button type="submit" onClick={this.sendMessage}>send</Button>
                            </div>)
                    }
                })()}
            </div>
        );
    }
}
