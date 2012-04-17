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
            del: function() {
                alert("del");
                this.model.clear();
            },
            clear: function() {

                alert("destroy");
                var prop = this;
                $("#deleteMsg").css("visibility","visible");
                $("#destroy").css("visibility","hidden");
                mytime=setTimeout("prop.del()",5000); 
                alert("despues de 5 seg?");
            },
            undo: function() {
                alert("undo function");
                $("#deleteMsg").css("visibility","hidden");
                $("#destroy").css("visibility","visible");
                this.model.undoDelete();
            }
        });

        return TwittView;    

    });