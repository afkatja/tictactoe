Boxes = new Meteor.Collection('boxes');

if (Meteor.isClient) {
  Session.set('player', 'X');

  var setNextPlayer = function(){
    if (Session.get('player') == 'X') {
      Session.set('player', 'O');
    } else {
      Session.set('player', 'X');
    }
  };

  Template.gameboard.helpers({
    boxes: function(){
      return Boxes.find({});
    }
  });

  Template.gameboard.events({
    click: function() {
    }
  });

  Template.box.events({
    click: function(){
      var sessionPlayer = Session.get('player');
      Boxes.update(this._id, { $set: { player: sessionPlayer } });
      setNextPlayer();
    }
  });

  Template.box.helpers({
    player: function(){
      return this.player;
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    //just to be sure, we want to begin with a new collection
    Boxes.remove({});
    //and fill it with 9 boxes
    if(Boxes.find().count() === 0) {
      for(var i = 0; i < 9; i++){
        Boxes.insert({});
      }
    }
  });
}
