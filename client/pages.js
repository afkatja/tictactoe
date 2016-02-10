var routes = ['slides', 'start', 'step1', 'step2', 'step3', 'step4', 'step5', 'step6', 'step7', 'step8', 'step9', 'step10'];
var steps = ['step1', 'step2', 'step3', 'step4', 'step5', 'step6', 'step7', 'step8', 'step9', 'step10'];
var currentStep = new ReactiveVar('start');

UI.registerHelper('addOne', function(value) {
  return value + 1;
});

Template.mainnav.helpers({
  routes: function(){
    return routes;
  }
});

Template.mainnav.events({
  'click button': function () {
    //`this` is the value of the dynamic template
    currentStep.set(this);
    //scroll back to top when coming from pagination links in the footer
    document.body.scrollTop = 0;
  }
});

Template.navItem.helpers({
  activeClass: function () {
    if(this.toString() == currentStep.get()){
      return 'active';
    }
  }
});

var currentIndex = function () {
  if(currentStep.get()) {
    return routes.indexOf(currentStep.get().toString());
  }
  return -1;
};

Template.pagination.helpers({
  disabledClassPrev: function(){
    if(currentIndex() == 0) {
      return 'disabled';
    }
  },
  disabledClassNext: function(){
    if(currentIndex() == routes.length) {
      return 'disabled';
    }
  }
});

Template.pagination.events({
  'click .prev': function () {
    var prev = routes[currentIndex() - 1];
    currentStep.set(prev);
  },
  'click .next': function () {
    var next = routes[currentIndex() + 1];
    currentStep.set(next);
  }
});

Template.index.helpers({
  tab: function () {
    return currentStep.get();
  }
});
