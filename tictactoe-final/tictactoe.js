Cells = new Meteor.Collection('cells');

if (Meteor.isClient) {
  Meteor.startup(function(){
    console.log('started up client');
    Session.set({currentPlayer: 'X'});
  });

  var currentPlayer = function(){
    return Session.get('currentPlayer');
  };

  function setCurrentPlayer(){
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

  function isComboAllTheSame(el, i, arr){
    return Cells.findOne({cellIndex: el}).type === 'X' ||
      Cells.findOne({cellIndex: el}).type === 'O';
  }

  function getWinningCombo(){
    var winning;
    for(var x = 0; x < winningCombos.length; x++){
      var combo = winningCombos[x];
      winning = combo.every(isComboAllTheSame);
    }
    console.log('winning', winning);
    return winning;
  }{{currentPlayer}}

  Template.gameboard.helpers({
    cells: function () {
      var boxes = Cells.find({}).fetch();
      return boxes;
    },
    currentPlayer: function () {
      return currentPlayer();
    },
    getWinningState: function(){
      return getWinningState();
    }
  });

  Template.gameboard.events({
    'click .reset-game': function(){
      //Reset game: make all cells empty
      var cells = Cells.find().fetch();
      console.log(cells);
      cells.forEach(function(cell){
        Cells.update({_id: cell._id}, {$set: {type: null}});
      });
    }
  });

  Template.box.events({
    "click .box": function(event){
      //cell already filled
      var cellFilled = Cells.findOne({_id: this._id}).type;
      console.log(cellFilled);
      //game over
      if(!cellFilled) {
        var player = currentPlayer();
        Cells.update({ _id: this._id }, { $set: { type: player } });
        getWinningCombo();
        setCurrentPlayer();
      }
    }
  });

  Template.box.helpers({
    currentPlayer: function(){
      return currentPlayer();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Cells.remove({});
    //fill 9 cells
    if(Cells.find().count() == 0) {
      for(var i = 0; i < 9; i++){
        Cells.insert({cellIndex: i});
      }
    }
  });
}
