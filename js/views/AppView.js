define(["underscore","backbone","collections/MoviesList","views/MovieView"], 
    function(_, Backbone,MovieList,MovieView) { 
        var movies = new MovieList; 
        
        var AppView = Backbone.View.extend({
            el: $("#moviesapp"),
            
            events: {
                "keypress .new":  "createOnEnter"
                 
            },
            
            initialize: function() {
              this.input = this.$("#new");
              
              movies.bind('add', this.addOne, this); 
              movies.bind('reset', this.addAll, this);
              
              movies.fetch(); 
            },
            
            addOne: function(movie) {
                var view = new MovieView({model: movie});
                this.$("#movies-list").append(view.render().el);
            },
            
            addAll: function() {
                movies.each(this.addOne);
            },
            
            createOnEnter: function(e) {
                if (e.keyCode != 13) return;

                movies.create({title: this.$('#new-title').val(), year: this.$('#new-year').val(),genre: this.$('#new-genre').val(),synopsis: this.$('#new-synopsis').val()});
                this.$('#new-title').val('');
                this.$('#new-year').val('');
                this.$('#new-genre').val('');
                this.$('#new-synopsis').val('');
            }
            
           
        })

        return AppView;    

    });


