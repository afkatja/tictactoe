Boxes = new Meteor.Collection('boxes');

if (Meteor.isClient) {
  Meteor.startup(function(){
    console.log('started up client');
  });

  Template.gameboard.events({
    click: function() {
      console.log('Clicked the gameboard');
    }
  });

  Template.gameboard.helpers({
    boxes: function(){
      return Boxes.find({});
    }
  });

  Template.box.events({
    click: function() {
      console.log('Clicked box nr',this);
    }
  });
}

if (Meteor.isServer) {

  // executed on startup of the server
  Meteor.startup(function () {
    //just to be sure, we want to begin with a new (empty) collection
    Boxes.remove({});
    //and fill it with 9 boxes
    if(Boxes.find().count() === 0) {
      for(var i = 0; i < 9; i++){
        Boxes.insert({boxIndex: i});
        console.log('inserted box with index', i);
      }
    }
  });
}
