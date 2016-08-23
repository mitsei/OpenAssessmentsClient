"use strict";

import React        from "react";
import { connect }  from "react-redux";

import { loadAssessment }         from "../actions/assessment";
import * as CommunicationActions  from "../actions/communications";
import { setLocale }              from "../actions/locale";
import appHistory                 from "../history";
import { availableLocales }       from "../locales/locales";

const select = (state) => {
  return {
    maxAttempts: state.settings.max_attempts,
    userAttempts: state.settings.userAttempts,
    enableStart: state.settings.enable_start
  };
};

export class Index extends React.Component {

  componentWillMount() {

    // Post up the entire chain of parent windows.  This supports our use case
    // of the assessment-player being embedded in dumb content which is then
    // embedded in another controller that can understand this message.
    let parents = new Set();
    let p = parent;
    while(!parents.has(p)) {
      p.postMessage({
        open_assessments_msg: "open_assessments_available_locales",
        available_locales: availableLocales()
      }, "*");
      parents.add(p);
      p = p.parent;
    }

    this.props.loadAssessment();

    if(this.props.userAttempts &&
       this.props.userAttempts >= this.props.maxAttempts) {
      appHistory.push("retries-exceeded");
    } else if(!this.props.enableStart) {
      appHistory.push("assessment");
    }
  }

  componentDidMount() {
    this.props.sendSize();
    this.props.scrollParentToTop();
    window.addEventListener("message", (message) => this.onMessage(message), false);
  }

  componentDidUpdate() {
    this.props.sendSize();
    this.props.scrollParentToTop();
  }

  onMessage(message) {
    const data = message.data;
    const type = data.open_assessments_msg;

    switch(type) {
      case "open_assessments_set_locale":
        this.props.setLocale(data.locale);
        break;
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default connect(select, {loadAssessment, setLocale, ...CommunicationActions}, null, {withRefs: true})(Index);
