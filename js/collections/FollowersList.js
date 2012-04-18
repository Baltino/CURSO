define(["underscore","backbone","localStorage", "models/Twitt"],
    function(_, Backbone,localStorage, Twitt) {


        var FollowersList = Backbone.Collection.extend({

            model: Twitt,
            url: '../models/User',
            localStorage: new Store("FollowersList"),

            nextOrder: function() {
                if (!this.length) return 1;
                return this.last().get('order') + 1;
            },

            comparator: function(user) {
                return user.get('order');
            }

        })

        return FollowersList;    

});