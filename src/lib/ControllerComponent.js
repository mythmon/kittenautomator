import BaseComponent from './BaseComponent.js';

export default class ControllerComponent extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = this.getStoreState();
  }

  get autoBind() {
    return super.autoBind.concat(['onChange', 'getStoreState']);
  }

  get stores() {
    return [];
  }

  onChange() {
    this.setState(this.getStoreState());
  }

  getStoreState() {
    return {};
  }

  componentDidMount() {
    for (let store of this.stores) {
      store.addChangeListener(this.onChange);
    }
  }

  componentWillUnmount() {
    for (let store of this.stores) {
      store.removeChangeListener(this.onChange);
    }
  }
}
