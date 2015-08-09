import Immutable from 'immutable';
import Dispatcher from '../Dispatcher.js';
import BaseStore from '../lib/BaseStore.js';
import ConfigActionTypes from '../constants/ConfigActionTypes.js';

let storeData = new Immutable.Map()
  .set('conversions', new Immutable.OrderedMap());

function conversionKey(from, to) {
  return `${from}:${to}`;
}

class ConfigStore extends BaseStore {
  getConversions() {
    return storeData.get('conversions').toList();
  }

  conversionActive(from, to) {
    const key = conversionKey(from, to);
    return storeData.getIn(['conversions', key, 'active'], false);
  }
}

const configStore = new ConfigStore();
export default configStore;

const actionHandlers = {
  [ConfigActionTypes.CONVERSION_ADD](action) {
    const key = conversionKey(action.from, action.to);
    storeData = storeData.setIn(['conversions', key], Immutable.fromJS({
      active: action.active,
      from: action.from,
      to: action.to,
      ingredients: action.ingredients,
    }));
    configStore.emitChange();
  },

  [ConfigActionTypes.CONVERSION_SET_ACTIVE](action) {
    const key = conversionKey(action.from, action.to);
    if (!storeData.get('conversions').has(key)) {
      throw new Error(`Automator::ConfigStore: Unknown conversion pair (${action.from}, ${action.to})`);
    }
    storeData = storeData.setIn(['conversions', key, 'active'], action.active);
    configStore.emitChange();
  },
};

Dispatcher.register(action => {
  const handler = actionHandlers[action.type] || (() => {});
  handler(action);
});
