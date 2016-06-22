"use strict";

import React                            from "react";
import { connect }                      from "react-redux";
import * as CommunicationActions        from "../../actions/communications";
import CommHandler                      from "../../utils/communication_handler";

export default class StudyPlanButton extends React.Component {

  render() {
    if (!this.props.display || self == top) {
      return <div></div>;
    }

    return <div>
      <button className="lti-nav-btn" id="study-plan" onClick={()=>{this.props.navigateHome();}}>
        View updated study plan
      </button>
    </div>;
  }
};
