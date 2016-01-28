Router = {
    uri: _.compact(window.location.pathname.split('/')),
    routes: [],

    addRoute: function(route, template){
      var segments =  _.compact(route.split("/"));

      var placeholders = _.reduce(segments, function(currentArr, piece, index) {
          if (piece.substr(0, 1) === ":") {
            currentArr.push(index);
            segments[index] = piece.substr(1);
          }
          return currentArr;
      }, []);

      this.routes.push({
          route: segments,
          template: template,
          placeholderIndexes: placeholders
      });
    },
    getMatchingRoute: function () {
      for (var i in this.routes) {
        var route = this.routes[i];
        var data = {};

         if (route.route.length === this.uri.length) {
          var match = _.every(route.route, function(seg, i){
            if (_.contains(route.placeholderIndexes, i)) {
              data[seg] = this.uri[i];
              return true;
            } else {
              return seg === this.uri[i];
            }
          }, this);

          if (match) {
            return {
              data: data,
              template: route.template
            }
          }
        }
      }
      //no matches (add 404 or default template maybe?)
      return false;
    },
    run: function () {
      var route = this.getMatchingRoute();
      var fragment = function(){
        if (route.template !== undefined) {
          return route.template;
        }
      };
      console.log(fragment());
      if (route) {
        Blaze.render(fragment(), document.querySelector('.current-section'));
      } else {
        //404
      }
    }
};
