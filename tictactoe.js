if (Meteor.isClient) {
  Meteor.startup(function(){
    console.log('started up client');
    Session.set({rows: []});
  });

  Template.gameboard.helpers({
    counter: function () {
      return Session.get('counter');
    },
    boardrows: function () {
      var size = 3;
      var rows = [];
      for(var i = 0; i < size; i++){
        var row = [];
        for(var x = 0; x < size; x++){
          var index = (i * size) + x;
          row.push({index: index, colIndex: i, rowIndex: x});
        }
        rows.push({row: row});
      }
      Session.set({
        rows: rows
      });
      console.log('clicked cell', Session.get('rows'));
      return rows;
    }
  });

  Template.box.events({
    "click .box": function(event){
      console.log('clicked cell', Session.get('rows'));
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
