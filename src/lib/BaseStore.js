import {EventEmitter} from 'events';

export default class BaseStore extends EventEmitter {
  addChangeListener(cb) {
    this.addListener('change', cb);
  }

  removeChangeListener(cb) {
    this.removeListener('change', cb);
  }

  emitChange() {
    this.emit('change');
  }
}
