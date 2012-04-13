define(["underscore","backbone","models/User","views/TwittView","collections/TwittList"], 
    function(_, Backbone,User,TwittView,TwittList ) { 
        var Twitts = new TwittList;
        var HomeView = Backbone.View.extend({
            el: $("#user"),
            
            credentials: new User,
            //Twitts: new TwittList,
            
            events: {
                "#logout": "logoutTwitter"
            },
            
             
            initialize: function() {
                
                url = "apiTwitter/service/Prueba.php";
                 $.getJSON(url,function(json){
                    //crear las vistas con sus modelos
                   
                   alert("faaaa");
                });
          
              //  this.createAll();
                //esto para la lsita de twitts
                Twitts.bind('add', this.addOne, this); //por si necesitamos el metoto para crearlo
                Twitts.bind('reset', this.addAll, this);//lo mismo
                Twitts.bind('all', this.render, this);//para llaamr a render cuando pasa algo

                this.main = $('#main'); //main es el div de la lista, para ocultarlo si no hay twitts, lo sacamos si quieren
                
               // Twitts.fetch();
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
            
            createTwitt: function(retweeted_,image_,name_,screen_name_,text_,created_at_){
                Twitts.create({retweeted: retweeted_,image: image_ ,name: name_,screen_name: screen_name_,text: text_,created_at: created_at_});    
            },
            render: function() {
                if (this.credentials.get("screenName")) {
                    this.$el.prepend('<h3><span>'+this.credentials.get("screenName")+ '</span> you are now logged!</h3>');
                }
                else {
                    this.$el.html("No estás logueado");
                }
                
              //  if (Twitts.length) {//para ocultar el div si no hay twitts
              //      this.main.show();
            //    } else {
              //      this.main.hide();
             //  }
      
                return this;
            },
            
            addOne: function(Twitt) {
            var view = new Twitt({model: Twitt});
            this.$("#twitt-list").append(view.render().el);
            },

            addAll: function() {
            Twitts.each(this.addOne);
            },
            
            logoutTwitter: function(){
                url = "apiTwitter/service/Logout.php";
                $.ajax(url,function(){
                    $(location).attr('href',"index.html");
                });
            },

            createAll: function() {
                var prop = this;
                url = "apiTwitter/service/HomeTimeline.php";
                $.getJSON(url,function(json){
                    var i=0;
                    while (json[i]!=null){
                        prop.createTwitt(json[i].retweeted,json[i].user.profile_image_url_https ,json[i].user.name,json[i].user.screen_name,json[i].text,json[i].created_at);
                        ++i;
                    }                   
                });
            }
        });

        return HomeView;    

    });
