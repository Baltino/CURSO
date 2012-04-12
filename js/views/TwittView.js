  define(["underscore","backbone","models/Twitt","collections/TwittList"], 
    function(_, Backbone, Twitt, TwittList) { 
  
        var TwittView = Backbone.View.extend({

            tagName:  "li",

            // Cache the template function for a single item.
            template: _.template($('#item-template').html()),

            initialize: function() {
                this.model.bind('change', this.render, this);
                this.render();
            },

            render: function() {
               
            this.$el.html(this.template(this.model.toJSON()));
            return this;
            }

        });

        return TwittView;    

    });