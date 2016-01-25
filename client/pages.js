var routes = ['slides', 'start', 'step1', 'step2', 'step3', 'step4', 'step5', 'step6', 'step7'];
var currentStep = new ReactiveVar('start');

Template.mainnav.helpers({
  routes: function(){
    return routes;
  }
});

Template.mainnav.events({
  'click button': function () {
    //`this` is the value of the dynamic template
    currentStep.set(this);
  }
});

Template.navItem.helpers({
  activeClass: function () {
    if(this == currentStep.get()){
      return 'active';
    }
  }
});

Template.index.helpers({
  tab: function () {
    return currentStep.get();
  }
});
