/* globals gamePage:false, $:false */
import React from 'react';
import OptionsTab from './OptionsTab.js';
import ConfigActions from './actions/ConfigActions.js';
import ConfigStore from './stores/ConfigStore.js';

const tickRate = 10;

// Percentages at which extra resource should be used
const dumpThreshholds = {
  'culture': .95,
  'science': .95,
};


ConfigActions.addConversion('catnip', 'wood');
ConfigActions.addConversion('wood', 'beam');
ConfigActions.addConversion('minerals', 'slab');
ConfigActions.addConversion('coal', 'steel');
ConfigActions.addConversion('iron', 'plate');
ConfigActions.addConversion('titanium', 'alloy');
ConfigActions.addConversion('culture', 'manuscript', {
  parchment: 25,
  science: 10000,
});
ConfigActions.addConversion('science', 'compedium', { // yes, this is mispelled
  manuscript: 50,
  culture: 400,
});

function tick() {
  tickWorkshop();
  tickHunt();
  tickStars();
  tickBooks();
}

function tickBooks() {
  var culture = gamePage.resPool.get('culture');
  var science = gamePage.resPool.get('science');
  if (culture.value / culture.maxValue > dumpThreshholds.culture) {
    if (gamePage.workshop.getCraft('manuscript').unlocked &&
        gamePage.resPool.get('parchment').value >= 25) {
      gamePage.craft('manuscript', 1);
    }
  }
  if (science.value / science.maxValue > dumpThreshholds.science) {
    if (gamePage.workshop.getCraft('manuscript').unlocked &&
        gamePage.resPool.get('manuscript').value >= 50) {
      // Yes, "compendium" is misspelled in the source.
      gamePage.craft('compedium', 1);
    }
  }
}


function tickWorkshop() {
  for (let conv of ConfigStore.getConversions()) {
    if (!conv.get('active')) {
      continue;
    }

    const fromRes = gamePage.resPool.get(conv.get('from'));

    const toGo = fromRes.maxValue - fromRes.value;
    const ratePerTick = fromRes.perTickUI * tickRate;
    const enabled = gamePage.workshop.getCraft(conv.get('to')).unlocked;

    let enoughIngredients = true;
    conv.get('ingredients').forEach((amount, name) => {
      if (gamePage.resPool.get(name).value < amount) {
        enoughIngredients = false;
      }
    });

    if (enoughIngredients && toGo <= ratePerTick * 2 && enabled) {
      gamePage.craft(conv.get('to'), 1);
    }
  }
}

function tickHunt() {
  var catpower = gamePage.resPool.get('manpower');
  if (catpower.value / catpower.maxValue > 0.95) {
    $("a:contains('Send hunters')").click();
    if (gamePage.workshop.getCraft('parchment').unlocked) {
      gamePage.craftAll('parchment');
    }
  }
}

function tickStars() {
  $('#gameLog input').click();
}

function makeUi() {
  let tab = new OptionsTab();
  gamePage.addTab(tab);
  gamePage.render();
}

console.log('%cSetting up Kitten Automator...', 'color: #12e');
makeUi();
setTimeout(() => {
  gamePage.timer.addEvent(tick, tickRate); // Every two seconds
  console.log('%cKitten Automator active.', 'color: #12e');
}, 3000);
