// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

    /***************************Model*******************************/

    // Basic Movie model has title, rating, synopsis
    var Movie = Backbone.Model.extend({

        // Default attributes for the todo item.
        defaults: function() {
            return {
                title: "Title default",
                rating: 3,
                synopsis: "Once upon a time..."
            };
        },
        // Ensure that each todo created has `title`.
        initialize: function() {
            if (!this.get("title")) {
            this.set({"title": this.defaults.title});
            }
        },

        /* Example of calling "super" of function set.
        * var Note = Backbone.Model.extend({
        *  set: function(attributes, options) {
            Backbone.Model.prototype.set.call(this, attributes, options);
        * 
        */


        // Remove this Movie from *localStorage* and delete its view.
        remove: function() {
            this.destroy();
        }

    });
  
  /***************************Collection*******************************/
    //
    var MoviesList = Backbone.Collection.extend({
        model: Movie,
        // Save all of the Movie items under the `"movies"` namespace.
        localStorage: new Store("movies-backbone"),
        
        total: function(){
            return 3;//filter count.. see
        }
    });
    
    // Create our global collection of **Movies**.
    var Movies = new MoviesList;
  
  
  /*************************Movies List View*****************************/

    // The DOM element for a Movie item...
    var MovieView = Backbone.View.extend({

        //... is a list tag.
        tagName:  "li",

        // Cache the template function for a single item.
        template: _.template($('#item-template').html()),

        // The DOM events specific to an item.
        events: {
            "click a" : "toDetailsView",
             "click #edit" : "toEditMovie",
            "click #remove": "removeMovie"
        },

        // The MovieView listens for changes to its model, re-rendering. Since there's
        // a one-to-one correspondence between a **Movie** and a **MovieView** in this
        // app, we set a direct reference on the model for convenience.
        initialize: function() {
            this.model.bind('change', this.render, this);
            this.detailView = App.$('#right-bar');
            
         //   this.model.bind('destroy', this.remove, this);
        },
        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },
        toDetailsView: function(){
            alert("to details");
            //the same model is passed to the details view
            //its also important the el element cause is generated dinamically
            this.movieDetails = new MovieDetailsView({model: this.model, el: this.detailView});
            this.movieDetails.render();
        },
        toEditMovie:function(){
            
            this.movieDetails = new MovieEditView({model:this.model, el:this.detailView});
            this.movieDetails.render();
            
        },
       
        removeMovie: function(){
          //  this.model.destroy();
            this.remove();
            this.detailView.html('');
            alert("Removed!");
        }
        
    });
    
    /*************************Movie Details View*****************************/

    // The DOM element for a Movie detail...
    var MovieDetailsView = Backbone.View.extend({

        //....
       
        // Cache the template function for a single item.
        template: _.template($('#details-template').html()),

        initialize: function(){
             this.model.bind('change', this.render, this);
            this.detailDiv = App.$('#right-bar');
          
        },
        
        render: function() {
            
            $(this.detailDiv).html(this.template(this.model.toJSON()));
            return this;
        }
    });
    
    
    /*************************Movie Details View*****************************/

    // The DOM element for a Movie detail...
    var MovieEditView = Backbone.View.extend({

        //....
        
       // id: "right-bar",

        // Cache the template function for a single item.
        template: _.template($('#edit-details-template').html()),

        // The DOM events specific to an item.
        events: {
            "keyup .edit": "saveEnter"
           
        },
        initialize: function(){
            
            this.model.bind('change', this.render, this);
            this.editDiv = App.$('#right-bar');
            
          
        },
        
        render: function() {
            
            $(this.editDiv).html(this.template(this.model.toJSON()));
            return this;
        },
      
        close: function(){
            //the values must be taken here because they were not 
            //on the html before
            var new_title =  App.$('#title').val();
            var new_rating =  App.$('#rating').val();
            var new_synopsis = App.$('#synopsis').val();
            
            
            //trivials checkingsss            
            
            this.model.save({title: new_title, rating:new_rating, synopsis: new_synopsis});
            //this.model.fetch();
            alert("Saved!");
        },
        
        saveEnter: function(e){
            if (e.keyCode == 13) this.close();
        }
        
    });
    /**********************************************************************/
    /*********************Movies Application View**************************/
    /**********************************************************************/

    // Our overall **AppView** is the top-level piece of UI.
    var AppView = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: $("#moviesApp"),

        // Our template for the line of statistics at the bottom of the app.
        statsTemplate: _.template($('#stats-template').html()),

        // Delegated events for creating new items, and clearing completed ones.
        events: {
            "keyup #new-movie":  "createOnEnter"
        },

        // At initialization we bind to the relevant events on the `Todos`
        // collection, when items are added or changed. Kick things off by
        // loading any preexisting todos that might be saved in *localStorage*.
        initialize: function() {

            this.input = this.$("#new-movie");
          //  this.allCheckbox = this.$("#toggle-all")[0];

            Movies.bind('add', this.addOne, this);
            Movies.bind('reset', this.addAll, this);
            Movies.bind('all', this.render, this);

            this.footer = this.$('footer');
            this.main = this.$('#main');
            this.list = this.$('#movies-list');

            
            Movies.fetch();
            
            
        },

        // Re-rendering the App just means refreshing the statistics -- the rest
        // of the app doesn't change.
        render: function() {
           
         
           this.input.focus();
        },

        // Add a single movie item to the list by creating a view for it, and
        // appending its element to the `<ul>`.
        addOne: function(movie) {
            var view = new MovieView({model: movie});
            this.list.append(view.render().el);
            this.input.focus();
        },

        
        // If you hit return in the main input field, create new **Todo** model,
        // persisting it to *localStorage*.
        createOnEnter: function(e) {
            
            if (e.keyCode != 13) return;
            if (!this.input.val()) return;
            
            Movies.create({title: this.input.val()});
             //this.main.append("asdfasdf");
            
            this.input.val('');
        }
    });

    // Finally, we kick things off by creating the **App**.
    var App = new AppView;

});