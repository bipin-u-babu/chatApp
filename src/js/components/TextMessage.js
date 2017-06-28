import React from "react";

export default class TextMessage extends React.Component {
  
  constructor() {
    super();

  }

  static get propTypes() {
    return {
    message : React.PropTypes.object.isRequired,
    currentUser: React.PropTypes.string.isRequired
    }
  }
  
  render() {
    var message = this.props.message;
    var currentUser = this.props.currentUser;

    return (
        <div>
            {(() => {
              if (message.user === currentUser) {
                return (
                    <div className="msg macro">
                      <div className="text text-l">
                        <p> {message.msg}</p>
                        <p><small>{'~'+message.user}</small></p>
                      </div>
                    </div>
                )
              } else {
                return (
                     <div className="msg-rta macro">
                      <div className="text text-r">
                       <p> {message.msg}</p>
                        <p><small>{'~'+message.user}</small></p>
                      </div></div>
                )
              }
            })()}
          </div>
    );
  }
}
