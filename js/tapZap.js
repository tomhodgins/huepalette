// Fast button Clicking for mobile
function tapZap(element, handler) {
  this.element = element;
  this.handler = handler;
  element.addEventListener('touchstart', this, false);
};

tapZap.prototype.handleEvent = function(event) {
  switch (event.type) {
    case 'touchstart': this.onTouchStart(event); break;
    case 'touchmove': this.onTouchMove(event); break;
    case 'touchend': this.onClick(event); break;
    case 'click': this.onClick(event); break;
  }
};

tapZap.prototype.onTouchStart = function(event) {
  event.stopPropagation();
  event.preventDefault();
  this.element.addEventListener('touchend', this, false);
  document.body.addEventListener('touchmove', this, false);
  this.startX = event.touches[0].clientX;
  this.startY = event.touches[0].clientY;
  isMoving = false;
};

tapZap.prototype.onTouchMove = function(event) {
  if (Math.abs(event.touches[0].clientX - this.startX) > 10 ||
      Math.abs(event.touches[0].clientY - this.startY) > 10) {
    this.reset();
  }
};

tapZap.prototype.onClick = function(event) {
  this.reset();
  this.handler(event);
  if (event.type == 'touchend') {
    preventGhostClick(this.startX, this.startY);
  }
};

tapZap.prototype.reset = function() {
  this.element.removeEventListener('touchend', this, false);
  document.body.removeEventListener('touchmove', this, false);
};

function preventGhostClick(x, y) {
  coordinates.push(x, y);
  window.setTimeout(ghostPop, 2500);
};

function ghostPop() {
  coordinates.splice(0, 2);
};

function ghostClick(event) {
  for (var i = 0; i < coordinates.length; i += 2) {
    var x = coordinates[i];
    var y = coordinates[i + 1];
    if (Math.abs(event.clientX - x) < 25 && Math.abs(event.clientY - y) < 25) {
      event.stopPropagation();
      event.preventDefault();
    }
  }
};

document.addEventListener('click', ghostClick.onClick, true);
var coordinates = [];
function initTapZap() {
  new tapZap(document.getElementById('tapZap'), goSomewhere);
}

function goSomewhere() {
  var theTarget = document.elementFromPoint(this.startX, this.startY);
  if (theTarget.nodeType == 3) theTarget = theTarget.parentNode;

  var theEvent = document.createEvent('MouseEvents');
  theEvent.initEvent('click', true, true);
  theTarget.dispatchEvent(theEvent);
};