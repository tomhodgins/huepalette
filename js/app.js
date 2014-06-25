  // Create variables
  var view, tags, modules, items, matches, firstRun;

// View Router
onload = onhashchange = function() {
  // Select view based on requested pathname
  if(localStorage.firstRun != 'completed') { view = 'firstRun'; localStorage.firstRun = 'completed'; }
  else if(location.hash) { view = location.hash.slice(1); }
  else { view = 'bulbs'; }
  if(!appData.views[view]) view = 'bulbs';
  if(!appData.views[view]) die;
  refreshModules();
  refreshView();
  switchTemplate();
  highlightCurrentLink();
};

// Helper Functions
function clearFirstRun() {
  // Reset the first-run wizard and reload the view
  localStorage.removeItem('firstRun');
  view = 'firstRun';
  window.location.hash = '';
  refreshView();
}

function refreshView() {
  // Load view contents from app data
  for(items in appData.views[view]) {
    tags = document.querySelectorAll('.'+items);
    for(matches in tags) {
      tags[matches].innerHTML = appData.views[view][items];
    }
  }
  initTapZap();
}

function refreshModules() {
  // Load modules from app data
  for(items in appData.modules) {
    modules = document.querySelectorAll('.'+items);
    for(matches in modules){
      modules[matches].innerHTML = appData.modules[items];
    }
  }
}

function switchTemplate() {
  // Activate view layouts
  for (matches=0; matches < document.querySelectorAll('.template').length; matches++) {
    document.querySelectorAll('.template')[matches].style.display = 'none';
    document.getElementById(appData.views[view].layout).style.display = 'inherit';
    document.body.className = document.getElementsByName('apple-mobile-web-app-title')[0].content = appData.views[view].title;
  }
}

function highlightCurrentLink() {
  // Highlight active link
  for (matches=0; matches < document.querySelectorAll('[href="#'+view+'"]').length; matches++) {
    document.querySelectorAll('[href="#'+view+'"]')[matches].classList.add('active');
  }
}