CollectionBoxes = new Meteor.Collection('boxes');

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
      return CollectionBoxes.find({});
    }
  });
}

if (Meteor.isServer) {

  // executed on startup of the server
  Meteor.startup(function () {
    //remove eventually collections
    CollectionBoxes.remove({});
    //fill 9 cells
    if(CollectionBoxes.find().count() === 0) {
      for(var i = 0; i < 9; i++){
        CollectionBoxes.insert({boxIndex: i});
        console.log('insert i',i);
      }
    }
  });
}
