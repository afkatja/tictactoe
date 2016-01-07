GameMatrix = new Mongo.Collection('matrix');

if (Meteor.isClient) {
  Meteor.startup(function(){
    console.log('started up client');
  });
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.gameboard.helpers({
    counter: function () {
      return Session.get('counter');
    },
    boarditems: function(){
      var matrix = [];
      var size = 3; //3 boxes per row/col
      var rows = [];
      var cols = [];
      //while (){}
      return matrix;
    }
  });

  Template.gameboard.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Template.box.helpers({
    index: function () {
      return
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
