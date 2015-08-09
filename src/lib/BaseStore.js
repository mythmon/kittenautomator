import {EventEmitter} from 'events';

export default class BaseStore extends EventEmitter {
  addChangeListener(cb) {
    this.on('change', cb);
  }

  removeChangeListener(cb) {
    this.off('change', cb);
  }

  emitChange() {
    this.emit('change');
  }
}
