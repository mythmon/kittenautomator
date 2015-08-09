import React from 'react';
import ControllerComponent from '../lib/ControllerComponent.js';
import ConfigStore from '../stores/ConfigStore.js';
import ConfigActions from '../actions/ConfigActions.js';

export default class Options extends ControllerComponent {
  get autoBind() {
    return super.autoBind.concat(['handleToggleConversion']);
  }

  get stores() {
    return super.stores.concat([ConfigStore]);
  }

  handleToggleConversion({target}) {
    const from = target.dataset.from;
    const to = target.dataset.to;
    ConfigActions.toggleConversion(from, to);
  }

  render() {
    return (
      <div>
        <h3>Automator</h3>
        <div>
          {this.state.conversions.map(conv => {
            return (<div key={`conversion-${conv.get('from')}-${conv.get('to')}`}>
              <input type="checkbox"
                     data-from={conv.get('from')}
                     data-to={conv.get('to')}
                     checked={conv.get('active')}
                     onChange={this.handleToggleConversion}>
                <label>{conv.get('from')} → {conv.get('to')}</label>
              </input>
            </div>);

          }).toList()}
        </div>
      </div>
    );
  }

  getStoreState() {
    return {
      conversions: ConfigStore.getConversions(),
    };
  }
}
