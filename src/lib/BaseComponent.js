import React from 'react';

export default class BaseComponent extends React.Component {
  constructor(props) {
    super(props);

    for (let name of this.autoBind) {
      this[name] = this[name].bind(this);
    }
  }

  get autoBind() {
    return [];
  }
}
