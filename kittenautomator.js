function makeSorting() {
  let workshopRows = document.querySelectorAll('#craftContainer .resourceRow');

  for (let workshopRow of workshopRows) {
  addUi(workshopRow);
  }
}

function makeEl(s, text='', {style: style={}, attr: attr={}, events: events={}}={}) {
  let a = s.split('.');
  let tag = a.shift();
  let el = document.createElement(tag);
  el.className = a.join(' ');
  el.textContent = text;
  for (let k in style) {
  el.style[k] = style[k];
  }
  for (let k in attr) {
  el.setAttribute(k, attr[k]);
  }
  for (let k in events) {
  el.addEventListener(k, events[k]);
  }
  return el;
}

function addUi(row) {
  for (let toRemove of row.querySelectorAll('.__kitten_ui')) {
  toRemove.parentElement.removeChild(toRemove);
  }

  let td = makeEl('td.__kitten_ui');

  td.appendChild(makeEl('span', '^', {
  style: {cursor: 'pointer'},
  events: {click: moveRowUp},
  }));

  td.appendChild(makeEl('span', 'v', {
  style: {cursor: 'pointer'},
  events: {click: moveRowDown},
  }));

  row.appendChild(td);
}

function moveRowUp(el) {
  let row = findRow(el.target);
  if (row.previousElementSibling === null) {
  return;
  }
  row.parentElement.insertBefore(row, row.previousElementSibling);
}

function moveRowDown(el) {
  let row = findRow(el.target);
  if (row.nextElementSibling === null) {
  return;
  }
  row.parentElement.insertBefore(row.nextElementSibling, row);
}

function findRow(el) {
  while (!el.matches('html')) {
  if (el.matches('.resourceRow')) {
    return el;
  }
  el = el.parentElement;
  }
  throw 'No row found';
}


/* legacy */

function auto() {

    console.log('gamePage', window.gamePage, window);

    var gamePage= window.gamePage;
    var gamePage= 5;

    console.log('autoHunt');
    autoHunt = setInterval(function() {
      var catpower = gamePage.resPool.get('manpower');
      if (catpower.value / catpower.maxValue > 0.95) {
        $("a:contains('Send hunters')").click();
        if (gamePage.workshop.getCraft('parchment').unlocked)  { gamePage.craftAll('parchment');  }
        if (gamePage.workshop.getCraft('manuscript').unlocked) { gamePage.craftAll('manuscript'); }
      }
    }, 5 * 1000);

    console.log('starClick');
    starClick = setInterval(function() { $("#gameLog").find("input").click(); }, 2 * 1000);

    console.log('autoCraft');
    autoCraft = setInterval(function() {
      var resources = [
        {from: "catnip", to: "wood", amount: 20},
        {from: "wood", to: "beam" , amount: 1},
        {from: "minerals", to: "slab" , amount: 1},
        {from: "coal", to: "steel", amount: 1},
        {from: "iron", to: "plate", amount: 1},
        {from: "titanium", to: "alloy", amount: 1},
      ];

      for (var i = 0; i < resources.length; i++) {
        var fromRes = gamePage.resPool.get(resources[i].from);
        var toRes = gamePage.resPool.get(resources[i].to);
        if (fromRes.value / fromRes.maxValue > 0.95 &&
            fromRes.perTickUI > 0 &&
            gamePage.workshop.getCraft(resources[i].to).unlocked) {
          gamePage.craft(resources[i].to, resources[i].amount);
        }
      }
    }, 1000);

}

console.log('setting up auto in 3.. 2.. 1..');
setTimeout(auto, 3000);
