Cells = new Meteor.Collection('cells');

if (Meteor.isClient) {
  Session.set({currentPlayer: 'X'});

  var currentPlayer = function(){
    return Session.get('currentPlayer');
  };

  function setNextPlayer(){
    if(currentPlayer() == 'X') Session.set({currentPlayer: 'O'});
    else Session.set({currentPlayer: 'X'});
  }

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

  var winningEndTimeout,
      weHaveAWinner = false;

  function getSymbolInCell(cellIndex){
    var matchingCell = Cells.findOne({cellIndex: cellIndex});
    if(matchingCell) {
      return matchingCell.player;
    }
  }

  function match(symbols, currentPlayerSymbol) {
    for(var x = 0; x < symbols.length; x++){
      if (symbols[x] != currentPlayerSymbol )
        return false;
    }

    return true;
  }

  function hasWon(currentPlayerSymbol){
    for(var x = 0; x < winningCombos.length; x++){
      var combo = winningCombos[x];
      var symbols = combo.map(getSymbolInCell);
      if(match(symbols, currentPlayerSymbol)) {
        return true;
      }
    }
    // no combo matched means no winner (yet)
    return false;
  }

  function resetGame(){
    //Reset game: make all cells empty
    var cells = Cells.find().fetch();
    for(var i = 0; i < cells.length; i++){
      //remove player property from all cells
      Cells.update({_id: cells[i]._id}, {$set: {player: null}});
    }
    Session.set('winner', null);
    clearTimeout(winningEndTimeout);
  }

  function setCurrentWinner() {
    Session.set('winner', currentPlayer());
    resetGameTimeout();
  }

  function getCurrentWinner(){
    return Session.get('winner');
  }

  function resetGameTimeout () {
    if(getCurrentWinner()) {
      winningEndTimeout = setTimeout(function(){
        resetGame();
      }, 5000);
    }
  }

  Template.gameboard.onRendered(resetGame);

  Template.gameboard.helpers({
    cells: function () {
      var boxes = Cells.find({}).fetch();
      return boxes;
    },
    currentPlayer: currentPlayer,
    isWinning: function(){
      return hasWon(currentPlayer());
    },
    currentWinner: getCurrentWinner
  });

  Template.gameboard.events({
    'click .reset-game': resetGame
  });

  Template.box.events({
    "click .box": function(){
      //cell already filled
      var cellFilled = this.player;
      //if the cell is filled or we have a winner, do nothing
      if(cellFilled || getCurrentWinner()) { return; }
      // is the cell is empty, fill it with current player (symbol)
      var player = currentPlayer();
      Cells.update(this._id, { $set: { player: player } });
      if(hasWon(player)) {
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
  Meteor.startup(function () {
    Cells.remove({});
    //fill 9 cells
    if(Cells.find().count() === 0) {
      for(var i = 0; i < 9; i++){
        Cells.insert({cellIndex: i});
      }
    }
  });
}
