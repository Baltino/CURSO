define(["underscore","backbone","models/Movie"],
    function(_, Backbone) {
        var MovieView = Backbone.View.extend({
            tagName: "li",
           
            // Cache the template function for a single item.
            template: _.template($('#item-template').html()),
            
            events: {
                "dblclick span.title": "editTitle",
                "dblclick span.year": "editYear",
                "dblclick span.genre": "editGenre",
                "dblclick div.synopsis": "editSyn",
                "keypress .title-input": "updateOnEnter",
                "keypress .year-input": "updateOnEnter",
                "keypress .genre-input": "updateOnEnter",
                "keypress .synopsis-input": "updateOnEnter",
                "click span.destroy": "clear"
           //     "blur div.movie-view" : "close"
            },
            
            
            initialize: function() {
                this.model.view = this;
                this.model.bind('change', this.render, this);
                this.model.bind('destroy', this.remove, this);
            },
            
            render: function() {
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            },
            
            editTitle: function() {
                $(this.el).addClass('editing');
                this.$('.title-input').focus();
                
            },
            editYear: function() {
                $(this.el).addClass('editing');
                this.$('.year-input').focus();
                
            },
            editGenre: function() {
                $(this.el).addClass('editing');
                this.$('.genre-input').focus();
            },
            editSyn: function() {
                $(this.el).addClass('editing');
                this.$('.synopsis-input').focus();
            },
            
            close: function(){
                this.model.save({title: this.$('.title-input').val(), year: this.$('.year-input').val(),genre: this.$('.genre-input').val(),synopsis: this.$('.synopsis-input').val()});
                console.log("Movie edited: "+this.model.get("title")+' ['+this.model.get("year")+', '+this.model.get("genre")+' ]');
                $(this.el).removeClass('editing');
            },
     
            clear: function(){
                this.model.destroy();
            },
            
            updateOnEnter: function(e) {
                if (e.keyCode == 13) this.close();
            },
            
            remove: function(){
              $(this.el).remove();
            }


            
        })

        return MovieView;    

    });