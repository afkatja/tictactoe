if (Meteor.isClient) {
  Meteor.startup(function(){
    console.log('started up client');
  });

  Template.gameboard.helpers({
    counter: function () {
      return Session.get('counter');
    },
    boardrows: function () {
      var rows = [];
      var size = 3;
      for(var i = 0; i < size; i++){
        var row = [];
        for(var x = 1; x <= size; x++){
          var index = (i * size) + x;
          row.push({index: index});
        }
        rows.push({row: row});
      }
      return rows;
    }
  });

  Template.box.events({
    "click .box": function(event){
      console.log('clicked cell', event);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
