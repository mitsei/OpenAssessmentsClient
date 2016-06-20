"use strict";

import React                from "react";
import { connect }          from "react-redux";

const select = (state, props) => {
  return {
    display: state.settings.get("show_post_message_navigation")
  };
};

@connect(select, null, null, { withRefs: true })
export default class FullPostNav extends React.Component {

  render() {
    if (!this.props.display || self == top) {
      return <div></div>;
    }

    return <div className="lti-bottom-nav-buttons">
        <button className="lti-nav-btn" id="lti-prev"><span className="lti-btn-arrow">&#10094;</span><span className="lti-btn-text">Previous</span></button>
        <button className="lti-nav-btn" id="lti-next"><span className="lti-btn-text">Next</span><span className="lti-btn-arrow">&#10095;</span></button>
        <button className="lti-nav-btn" id="study-plan">Study Plan</button>
      </div>;
  }
};
