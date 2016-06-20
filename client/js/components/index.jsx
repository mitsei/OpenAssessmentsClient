"use strict";

import React                  from "react";
import { connect }            from "react-redux";
import { loadAssessment }     from "../actions/assessment";
import * as CommActions       from "../actions/communications";
import LocalizedStrings       from 'react-localization';
import locales                from '../locales/locales';
import appHistory             from "../history";

const select = (state) => {
  return {
    maxAttempts: state.settings.get("max_attempts"),
    userAttempts: state.settings.get("userAttempts"),
    enableStart: state.settings.get("enableStart")
  }
}

export class Index extends React.Component {
  componentWillMount(){
    // Load the assessment
    this.props.loadAssessment();
    this.props.initCommHandler();

    if(this.props.userAttempts &&
      this.props.userAttempts >= this.props.maxAttempts) {
      appHistory.push("retries-exceeded");
    } else if(!this.props.enableStart) {
      appHistory.push("assessment");
    }
  }

  componentDidMount(){
    this.props.postSize();
    this.props.scrollParentToTop();
  }

  componentDidUpdate(){
    this.props.postSize();
    this.props.scrollParentToTop();
  }

  render(){
    let strings = new LocalizedStrings(locales());
    return <div>
      <p>{strings.assessments.new}</p>
      {this.props.children}
    </div>;
  }

}

export default connect(select, { loadAssessment, ...CommActions }, null, { withRefs: true })(Index);
