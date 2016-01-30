Boxes = new Meteor.Collection('boxes');

if (Meteor.isClient) {
  //set initial player
  Session.set({player: 'X'});

  //do the switch of player
  var setNextPlayer = function(){
    var player = Session.get('player');
    if(player == 'X') {
      Session.set({player: 'O'});
    } else {
      Session.set({player: 'X'});
    }
  };

  Template.gameboard.helpers({
    boxes: function(){
      return Boxes.find({});
    },
    player: function(){
      return Session.get('player');
    }
  });

  Template.box.events({
    click: function() {
      var player = Session.get('player');
      Boxes.update(this._id, { $set: { player: player } });
      setNextPlayer();
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
