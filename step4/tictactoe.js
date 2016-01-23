CollectionBoxes = new Meteor.Collection('boxes');

if (Meteor.isClient) {
  Session.set({currentPlayer: 'X'});

  var currentPlayer = function(){
    return Session.get('currentPlayer');
  };

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
    },
    currentPlayer: currentPlayer
  });

  Template.box.events({
    click: function() {
      console.log('Clicked box nr',this);
      var player = currentPlayer();
      CollectionBoxes.update(this._id, { $set: { player: player } });
      console.log('The box after updating the Collection', CollectionBoxes.findOne(this._id));
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
