define(["underscore","backbone", "models/Twitt"],
    function(_, Backbone, Twitt) {


  var TwittList = Backbone.Collection.extend({

    model: Twitt,

    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    comparator: function(twitt) {
      return twitt.get('order');
    }

     })

        return TwittList;    

    });