var routes = ['slides', 'start', 'step1', 'step2', 'step3', 'step4', 'step5', 'step6', 'step7', 'step8', 'step9'];
var steps = ['step1', 'step2', 'step3', 'step4', 'step5', 'step6', 'step7', 'step8', 'step9'];
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
  }
});

Template.navItem.helpers({
  activeClass: function () {
    if(this.toString() == currentStep.get()){
      return 'active';
    }
  }
});

Template.pagination.helpers({
  steps: function(){
    return steps;
  },
  activeClass: function () {
    if(this.toString() == currentStep.get().toString()){
      return 'active';
    }
  }/*,
  page: function () {
    console.log(this, this.index);
    if(this == steps[0]) {
      return 'start';
    }
    return 'step ' + steps[this.index];
  }*/
});

Template.pagination.events({
  'click li button': function(e){
    console.log(this.toString());
    currentStep.set(this);
  }
});

Template.index.helpers({
  tab: function () {
    return currentStep.get();
  }
});
