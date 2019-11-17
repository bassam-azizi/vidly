import React, { Component } from "react";

class Like extends Component {
  render() {
    const { liked, onClick } = this.props;
    let classes = "fa fa-heart";
    if (!liked) classes += "-o";
    return (
      <i
        onClick={onClick}
        className={classes}
        area-hidden="true"
        style={{ cursor: "pointer" }}
      ></i>
    );
  }
}

export default Like;
