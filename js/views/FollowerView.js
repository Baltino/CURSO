  define(["underscore","backbone","models/User","collections/FollowersList"], 
    function(_, Backbone, User, FollowersList) { 
  
        var FollowerView = Backbone.View.extend({

            tagName:  "li",

            // Cache the template function for a single item.
            template: _.template($('#follower-template').html()),
            
            events: {
               
            },

            initialize: function() {
                this.model.bind('change', this.render, this);
                this.model.bind('destroy', this.remove, this);
                this.render();
            },

            render: function() {
               this.$el.html(this.template(this.model.toJSON()));
                return this;
            },
            clear: function() {

               
            },
            undo: function() {
               
            },
            del: function() {
                alert("del");
                this.model.clear();
            }
        });

        return FollowerView;    

    });
