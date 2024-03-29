  define(["underscore","backbone","models/Twitt","collections/TwittList"], 
    function(_, Backbone, Twitt, TwittList) { 
  
        var TwittView = Backbone.View.extend({

            tagName:  "li",

            // Cache the template function for a single item.
            template: _.template($('#tweet-template').html()),
            
            events: {
                "click a.destroy" : "clear",
                "click a.undo" : "undo"
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

                alert("destroy");
                $("#deleteMsg").css("visibility","visible");
                $("#destroy").css("visibility","hidden");
                mytime=setTimeout('del()',5000); 
            },
            undo: function() {
                alert("undo function");
                $("#deleteMsg").css("visibility","hidden");
                $("#destroy").css("visibility","visible");
                this.model.undoDelete();
            },
            del: function() {
                alert("del");
                this.model.clear();
            }
        });

        return TwittView;    

    });
