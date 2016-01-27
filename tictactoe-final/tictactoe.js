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

  var hasWon = function() {
    var boxes = Boxes.find().fetch();
    var player = Session.get('player');
    console.log(boxes, player);
    //we have a winner in a row
    if (boxes[0].player == player && boxes[1] == player && boxes[2] == player) return true;
    if (boxes[3].player == player && boxes[4] == player && boxes[5] == player) return true;
    if (boxes[6].player == player && boxes[7] == player && boxes[8] == player) return true;

    //we have a winner in a column
    if (boxes[0].player == player && boxes[3] == player && boxes[6] == player) return true;
    if (boxes[1].player == player && boxes[4] == player && boxes[7] == player) return true;
    if (boxes[2].player == player && boxes[5] == player && boxes[8] == player) return true;

    //we have a winner in diagonal
    if (boxes[0].player == player && boxes[4] == player && boxes[8] == player) return true;
    if (boxes[2].player == player && boxes[4] == player && boxes[6] == player) return true;

    //no winner, no joy
    return false;
  }

  var resetGame = function(){
    //Reset game: make all boxes empty
    var boxes = Boxes.find().fetch();
    for (var i = 0; i < boxes.length; i++){
      //remove player property from all boxes
      Boxes.update({_id: boxes[i]._id}, {$set: {player: null}});
    }
    Session.set('winner', null);
    Session.set('player', 'X');
  };

  Template.gameboard.onRendered(resetGame);

  Template.gameboard.helpers({
    boxes: function () {
      return Boxes.find().fetch();
    },
    player: function() {
      return Session.get('player');
    },
    hasWon: hasWon,
    winner: function() {
      return Session.get('winner');
    }
  });

  Template.gameboard.events({
    'click .reset-game': resetGame
  });

  Template.box.events({
    "click .box": function(){
      //box already filled
      var boxFilled = this.player;
      //if the box is filled or we have a winner, do nothing
      if(boxFilled || Session.get('winner')) { return; }
      // is the box is empty, fill it with current player
      Boxes.update(this._id, { $set: { player: Session.get('player') } });
      console.log(hasWon());
      if(hasWon()) {
        Session.set('winner', Session.get('player'));
      } else {
        setNextPlayer();
      }
    }
  });

  Template.box.helpers({
    disabled: function () {
      //if the cell is filled, we cannot click there anymore
      return this.player;
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Boxes.remove({});
    //fill 9 boxes
    if(Boxes.find().count() === 0) {
      for(var i = 0; i < 9; i++){
        Boxes.insert({});
      }
    }
  });
}
