define(["underscore","backbone","models/User","views/TwittView","collections/TwittList"], 
    function(_, Backbone,User,TwittView,TwittList ) { 
        
        var twitts = new TwittList;
        var maxID = 0;
        var HomeView = Backbone.View.extend({
            el: $("#home"),
            
            credentials: new User,
            
            events: {
                "#logout": "logoutTwitter",
                "click #moreTweets": "createAll"
            },
            lastID: maxID = 0,//significa que todavia no se hizo "ver mas"
             
            initialize: function() {
                
                          
                //esto para la lsita de twitts
                twitts.reset();
                twitts.bind('add', this.addOne, this); //por si necesitamos el metoto para crearlo
                twitts.bind('reset', this.addAll, this);//lo mismo
                twitts.bind('all', this.render, this);//para llaamr a render cuando pasa algo

                

                //hasta aca
               // alert("homeview");
                _.bindAll(this, "render","updateCredentials");
                var cred = this;
                
                url = "apiTwitter/service/UserCredentials.php";
                $.getJSON(url,function(json){
                    cred.updateCredentials(json.screen_name,json.user_id)
                });
                
                //cred.updateCredentials("joaco","pepe");
                
                this.createAll();
                             
            },
            setLastID: function(val){
                this.lastID = val;
            },
            
            getLastID: function(){
                return this.lastID;
            },
            
            
            updateCredentials: function(name,id){
                this.credentials.set({'screenName': name,'twitterId': id});
                this.render(); 
            },

            render: function() {            
                if (this.credentials.get("screenName")) {
                    $("#tweetStatus").hide("fast");
                    $("#tweetUser").html(this.credentials.get("screenName"));
                    $("#tweetScreenName").html(this.credentials.get("twitterId"));
                    $("#tweetCred").show("slow");
                }
                
                $("#tweets").show("slow");
                $("#tweetPanel").show("slow");
                if (!twitts.length) {
					//$("#tweetList").html("<li><span class=\"tweetname\"> No hay tweets </span></li>");
                }
               
                return this;
            },
            
            addOne: function(Twitt) {
                var view = new TwittView({model: Twitt});
                $("#tweetList").append(view.render().el);
            },

            addAll: function() {
                twitts.each(this.addOne);
            },
            
            logoutTwitter: function(){
                url = "apiTwitter/service/Logout.php";
                $.ajax(url,function(){
                    $(location).attr('href',"index.html");
                });
            },

            createTwitt: function(retweeted_,image_,name_,screen_name_,text_,created_at_, id_){
                var obs = this.credentials.get("screenName");
                twitts.create({retweeted: retweeted_,image: image_ ,name: name_,screen_name: screen_name_,text: text_,created_at: created_at_, id: id_, observer: obs});
            },

            createAll: function() {
                
                var prop = this;
                url = "apiTwitter/service/HomeTimeline.php";
                
                
                $.getJSON(url,{max_id: prop.getLastID()},function(json){
                    var i=0;
                    while (json[i]!=null){
                        prop.createTwitt(json[i].retweeted,json[i].user.profile_image_url_https ,json[i].user.name,json[i].user.screen_name,json[i].text,json[i].created_at,json[i].id_str);
                        ++i;
                    }     
                    //obtengo el id del ultimo tweet
                    prop.setLastID(json[i-1].id_str);

                });
              
		this.render();  
            }            
            
        });

        return HomeView;    

    });
