Boxes = new Meteor.Collection('boxes');


var setCurrentPlayer = function(player) {
  Session.set({'currentPlayer': player});
};

var getCurrentPlayer = function() {
  return Session.get('currentPlayer');
};

if (Meteor.isClient) {

  Meteor.startup(function(){
    setCurrentPlayer('X');
    console.log('Boce',Boxes.find().fetch());
  });

  Template.body.helpers({
    symbol: getCurrentPlayer()
  });

  Template.gameboard.helpers({
    boxes: function() {
      return Boxes.find({}).fetch();
    }
  });

  Template.box.helpers({
    symbol: function() {
      console.log('In the helper',Boxes.findOne(this._id));
      return Boxes.findOne(this._id).symbol;
    }
  });

  Template.box.events({
    click: function() {
      console.log('LALA');
      Boxes.update(this._id, {$set: {symbol: getCurrentPlayer()}});
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Boxes.remove({});
    //fill 9 cells
    if(Boxes.find().count() === 0) {
      for(var i = 0; i < 9; i++){
        Boxes.insert({cellIndex: i});
      }
    }
  });
}
