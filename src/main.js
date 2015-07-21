
/* globals gamePage:false, $:false */

const tickRate = 10;

// Percentages at which extra resource should be used
const dumpThreshholds = {
  'culture': .95,
  'science': .95,
};

const workshopInstructions = [
  {from: 'catnip', to: 'wood', amount: 30},
  {from: 'wood', to: 'beam', amount: 1},
  {from: 'minerals', to: 'slab', amount: 1},
  {from: 'coal', to: 'steel', amount: 1},
  {from: 'iron', to: 'plate', amount: 1},
  {from: 'titanium', to: 'alloy', amount: 1},
];

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
  for (var i = 0; i < workshopInstructions.length; i++) {
    const fromRes = gamePage.resPool.get(workshopInstructions[i].from);

    const toGo = fromRes.maxValue - fromRes.value;
    const ratePerTick = fromRes.perTickUI * tickRate;
    const enabled = gamePage.workshop.getCraft(workshopInstructions[i].to).unlocked;

    if (toGo <= ratePerTick * 2 && enabled) {
      gamePage.craft(workshopInstructions[i].to, workshopInstructions[i].amount);
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

console.log('%cSetting up Kitten Automator...', 'color: #12e');
setTimeout(() => {
  gamePage.timer.addEvent(tick, tickRate); // Every two seconds
console.log('%cKitten Automator active.', 'color: #12e');
}, 3000);
