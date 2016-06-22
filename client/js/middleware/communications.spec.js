import { default as communication, communicationHandler }               from "./communications";
import { Constants as CommunicationConstants }  from "../actions/communications";

describe('iframe communication middleware', () => {
  beforeEach(() => {
    spyOn(communicationHandler, 'sendSize');
    spyOn(communicationHandler, 'scrollParentToTop');
  });

  it('implements Redux middleware interface', () => {
    const store = { getState: () => {} };
    const middleware = communication(store);
    const nextHandler = () => {};
    const actionHandler = middleware(nextHandler);

    expect(communication.length).toBe(1);                     // api middleware takes one arg
    expect(typeof middleware).toBe("function");     // api middleware must return a function to handle next
    expect(middleware.length).toBe(1);              // next handler returned by api middleware must take one argument
    expect(typeof actionHandler).toBe("function");  // next handler must return a function to handle action
    expect(actionHandler.length).toBe(1);           // action handler must take one argument
  });

  it('passes action on to next middleware', () => {
    const store = { getState: () => {} };
    const action = {
      type: "TEST"
    };
    const nextHandler = communication(store);
    const next = (actionPassed) => {
      expect(actionPassed).toBe(action);
    };
    const actionHandler = nextHandler(next);
    actionHandler(action);
  });

  it('calls comm handler sendsize when it recieves SEND_SIZE', () => {
    const store = { getState: () => {} };
    const action = {
      type: CommunicationConstants.SEND_SIZE
    };

    const middleware = communication(store);
    const nextHandler = () => {};
    const actionHandler = middleware(nextHandler);
    actionHandler(action);

    expect(communicationHandler.sendSize).toHaveBeenCalled();
  });

  it('calls comm handler scrollParentToTop when it recieves SCROLL_PARENT_TO_TOP', () => {
    const store = { getState: () => {} };
    const action = {
      type: CommunicationConstants.SCROLL_PARENT_TO_TOP
    };

    const middleware = communication(store);
    const nextHandler = () => {};
    const actionHandler = middleware(nextHandler);
    actionHandler(action);

    expect(communicationHandler.scrollParentToTop).toHaveBeenCalled();
  });
});
