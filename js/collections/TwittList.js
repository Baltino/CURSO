define(["underscore","backbone","localStorage", "models/Twitt"],
    function(_, Backbone,localStorage, Twitt) {


        var TwittList = Backbone.Collection.extend({

            model: Twitt,
            url: '../models/Twitt',
            localStorage: new Store("tweetList"),

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