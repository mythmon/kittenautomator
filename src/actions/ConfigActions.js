import Dispatcher from '../Dispatcher.js';
import ConfigActionTypes from '../constants/ConfigActionTypes.js';
import ConfigStore from '../stores/ConfigStore.js';

function addConversion(from, to, ingredients={}) {
  Dispatcher.dispatch({
    type: ConfigActionTypes.CONVERSION_ADD,
    from,
    to,
    ingredients,
    active: true,
  });
}

function toggleConversion(from, to) {
  let newState = !ConfigStore.conversionActive(from, to);
  Dispatcher.dispatch({
    type: ConfigActionTypes.CONVERSION_SET_ACTIVE,
    from,
    to,
    active: newState,
  });
}

export default {
  addConversion,
  toggleConversion,
};
