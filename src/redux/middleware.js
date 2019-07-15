import diff from 'deep-diff';

const key = "app:state";
export const hydrate = state => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    return null;
  }
}

export const hybernate = ({ getState }) => 
  next => action => {

    const returnValue = next(action);
    const state = getState();

    localStorage.setItem(key, JSON.stringify(state));

    return returnValue;
  }

const getDiff = ({ kind, path, lhs, rhs }) => {
  let returnValue = `${path.join('.')}: \n\t`;
  if (lhs) {
    switch (kind) {
      case 'N': returnValue += '+';
      case 'D':
      case 'A':
      case 'E': returnValue += '-';
      default:
        returnValue += ` ${JSON.stringify(lhs)}`;
    }
  }
  if (rhs) {
    returnValue += `\n\t+ ${JSON.stringify(rhs)}`;
  }
  returnValue += '\n';

  return returnValue;
}
export const logger = ({ getState }) => 
  next => action => {

    const initState = getState();
    const returnValue = next(action);
    const finalState = getState();

    const stateDiff = diff(initState, finalState);
    const stringDiff = stateDiff.map(getDiff).join('\n');
    console.log(`ACTION: ${action.type}:\n\n${stringDiff}`);

    return returnValue
  }