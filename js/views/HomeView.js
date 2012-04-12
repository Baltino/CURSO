define(["underscore","backbone","models/User","colections/TwittList"], 
    function(_, Backbone,User,TwittList ) { 
        
        var HomeView = Backbone.View.extend({
            el: $("#user"),
            
            credentials: new User,
            Twitts: new TwittList,
            
            events: {
                                 
            },
            
             
            initialize: function() {
                
                //esto para la lsita de twitts
                Twitts.bind('add', this.addOne, this); //por si necesitamos el metoto para crearlo
                Twitts.bind('reset', this.addAll, this);//lo mismo
                Twitts.bind('all', this.render, this);//para llaamr a render cuando pasa algo

                this.main = $('#main'); //main es el div de la lista, para ocultarlo si no hay twitts, lo sacamos si quieren

                Twitts.fetch();
                //hasta aca
                
                _.bindAll(this, "render","updateCredentials");
                var cred = this;
                url = "apiTwitter/service/UserCredentials.php";
                $.getJSON(url,function(json){
                    cred.updateCredentials(json.screen_name,json.user_id)
                });
        
            },
            
            updateCredentials: function(name,id){
                this.credentials.set({'screenName': name,'twitterId': id});
                this.render(); 
            },
            
            render: function() {
                if (this.credentials.get("screenName")) {
                    this.$elName.html(this.credentials.get("screenName"));
                }
                else {
                    this.$el.html("No estás logueado");
                }
                
                if (Twitts.length) {//para ocultar el div si no hay twitts
                    this.main.show();
                } else {
                    this.main.hide();
                }
      
                return this;
            },
            
            addOne: function(Twitt) {
            var view = new Twitt({model: Twitt});
            this.$("#twitt-list").append(view.render().el);
            },

            addAll: function() {
            Twitts.each(this.addOne);
            },

            createAll: function() {
            //aca creariamos toda la lsita con el Json =)
            Twitt.create({title: "josee"});
            }
            
           
        });

        return HomeView;    

    });

