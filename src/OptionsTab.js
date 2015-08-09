/* globals gamePage */
import React from 'react';
import OptionsUi from './components/OptionsUi.js';

export default class OptionsTab {
  constructor() {
    // This.domNode is the element that will be displayed in the tabbar.
    this.domNode = document.createElement('a');
    this.domNode.classList.add('tab');
    this.domNode.textContent = 'Kitten Automator';

    // this.buttons = [];
    this.tabId = 'Automator_OptionsTab';
    this.tabName = 'Automator';
    this.visible = true;

    this._component = React.createElement(OptionsUi);
    this._lastTarget = null;
  }

  /**
   * Called every game tick.
   */
  update() {
  }

  /**
   * Called when the active tab changes.
   */
  updateTab() {
    if (gamePage.activeTabId !== this.tabId && this._lastTarget) {
      React.unmountComponentAtNode(this._lastTarget);
      this._lastTarget = null;
    }
  }

  /**
   * Called when this tab needs to be re-rendered (according to Kittens).
   * @param  {DomNode} target The DOM node to render into.
   */
  render(target) {
    this._lastTarget = target;
    React.render(this._component, target);
  }
}
