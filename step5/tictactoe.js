CollectionBoxes = new Meteor.Collection('boxes');

if (Meteor.isClient) {
  Session.set({currentPlayer: 'X'});

  var currentPlayer = function(){
    return Session.get('currentPlayer');
  };

  var setNextPlayer = function(){
    if(currentPlayer() == 'X') Session.set({currentPlayer: 'O'});
    else Session.set({currentPlayer: 'X'});
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
      var cellFilled = this.player;
      if (cellFilled) {
        return;
      }
      var player = currentPlayer();
      CollectionBoxes.update(this._id, { $set: { player: player } });
      setNextPlayer();
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
