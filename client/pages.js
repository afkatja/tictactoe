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
  'click .step': function(e){
    console.log('click step', this.toString());
    currentStep.set(this);
  },
  'click .prev': function () {
    var currentPage = currentStep.get().toString();
    var currentIndex = steps.indexOf(currentPage);
    var prev = steps[currentIndex - 1 || 0];
    currentStep.set(prev);
  },
  'click .next': function () {
    var currentPage = currentStep.get().toString();
    var currentIndex = steps.indexOf(currentPage);
    var next = steps[currentIndex + 1 || steps.length];
    currentStep.set(next);
  }
});

Template.index.helpers({
  tab: function () {
    return currentStep.get();
  }
});
