import ajax from '../utils/ajax';

const REPORT_URL = '/learning/report';
const ajaxConfig = {
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
  },
};

class Report {
  constructor(name, steps) {
    this.model = name;
    this.maxSteps = steps;
    this.states = [];
    this.currentState = null;
  }

  pushState(state) {
    const { name } = state;
    const maxTime = state.last ? -1 : state.getInactiveTime();
    const spentTime = maxTime;
    const inactive = true;
    const actionsNumber = 0;
    this.states.push({ name, maxTime, inactive, actionsNumber, spentTime });
    this.currentState = this.states[this.states.length - 1];
  }

  increaseActionsNumber() {
    this.currentState.actionsNumber++;
  }

  setSpentTime(time) {
    this.currentState.spentTime = time;
    this.setInactive(false);
  }

  setInactive(value) {
    this.currentState.inactive = value;
  }

  send() {
    if (this.states.length > 1) {
      // remove last state - user can't make any action
      this.states = this.states.slice(0, -1);
    }
    ajaxConfig.data = JSON.stringify({
      model: this.model,
      maxSteps: this.maxSteps,
      states: this.states,
    });
    return ajax(REPORT_URL, ajaxConfig);
  }
}

export default Report;
