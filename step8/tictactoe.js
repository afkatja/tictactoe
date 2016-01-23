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

  var winningCombos = [ // patterns for winning line-ups
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  var hasWon = function(currentPlayerSymbol) {
    for(var x = 0; x < winningCombos.length; x++){
      var combo = winningCombos[x];
      var symbols = combo.map(getSymbolInBox);
      if(match(symbols, currentPlayerSymbol)) {
        return true;
      }
    }
    // no combo matched means no winner (yet)
    return false;
  };

  var getSymbolInBox = function(index) {
    var matchingBox = CollectionBoxes.findOne({boxIndex: index});
    if(matchingBox) {
      return matchingBox.player;
    }
  };

  var match = function(symbols, currentPlayerSymbol) {
    for(var x = 0; x < symbols.length; x++){
      if (symbols[x] != currentPlayerSymbol )
        // if one symbol is not the same there is no match, though return false
        return false;
    }
    // everything is matching, there is a winner
    return true;
  };

  var setCurrentWinner = function() {
    Session.set('winner', currentPlayer());
  };

  var getCurrentWinner = function() {
    return Session.get('winner');
  };

  Template.gameboard.events({

  });

  Template.gameboard.helpers({
    boxes: function(){
      return CollectionBoxes.find({});
    },
    currentPlayer: currentPlayer,
    currentWinner: getCurrentWinner,
    isWinning: function() {
      console.log('kaka');
      return hasWon(currentPlayer());
    }
  });

  Template.box.events({
    click: function() {
      var cellFilled = this.player;
      if (cellFilled|| getCurrentWinner()) {
        return;
      }
      var player = currentPlayer();
      CollectionBoxes.update(this._id, { $set: { player: player } });
      if(hasWon(player)) {
        console.log('THERE IS A WINNER');
        setCurrentWinner();
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
