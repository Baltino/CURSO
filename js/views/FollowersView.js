define(["underscore","backbone","models/User","views/FollowerView","collections/FollowersList"], 
    function(_, Backbone,User, FollowerView, FollowersList ) { 
        
        var followers = new FollowersList;
        var HomeView = Backbone.View.extend({
            el: $("#home"),
            
            credentials: new User,
            
            events: {
                "click #moreFollowers": "seeMore"
            },
            lastID: maxID = -1,// id para traer los siguientes followers
            
            empty: false,
             
            initialize: function() {
                
                          
                //esto para la lsita de followers
                followers.reset();
                followers.bind('add', this.addOne, this); //por si necesitamos el metoto para crearlo
                followers.bind('reset', this.addAll, this);//lo mismo
                followers.bind('all', this.render, this);//para llaamr a render cuando pasa algo

                

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
                 //   $("#tweetStatus").hide("fast");
                    
                    $("#tweetScreenName").html(this.credentials.get("screenName"));
                    $("#tweetCred").show("slow");
                }
                
                $("#followers").show("slow");
                //el tweet panel es comun a todas las paginas. asi que se deja asi
                $("#tweetPanel").show("slow");
                //if (this.empty) {
                //    $("#tweets").html("<span class=\"tweetname\"> No hay tweets </span>");
                //}
               
                
                
                return this;
            },
            
            addOne: function(user) {
                var view = new FollowerView({model: user});
                $("#followersList").append(view.render().el);
            },

            addAll: function() {
                followers.each(this.addOne);
            },
            
            logoutTwitter: function(){
                url = "apiTwitter/service/Logout.php";
                $.ajax(url,function(){
                    $(location).attr('href',"index.html");
                });
            },

            createFollower: function(image_,name_,screen_name_, id_){
                
                followers.create({image: image_ ,name: name_,screen_name: screen_name_,id: id_});
                
            },
            seeMore: function(){
                
                $('#imgMore').show("fast");
                $('#buttonMore').hide("fast");
                
                this.createAll();
            },

            createAll: function() {
                
                var prop = this;
                url = "apiTwitter/service/Followers.php";
                
                
                $.getJSON(url,{cursor: prop.getLastID(), screen_name: this.credentials.get("screen_name")},function(json){
                    var i=0;
                    while (json[i]!=null){
                        prop.createFollower(json[i].user.profile_image_url_https ,json[i].user.name,json[i].user.screen_name,json[i].id_str);
                        ++i;
                    }     
                     if (i<20){                          
                          $("#followers").html("<span class=\"tweetname\"> No more followers </span>");
                    }else{
                        prop.setLastID(json[i-1].id_str)  
                        //obtengo el id del ultimo tweet 
                        $('#imgMore').hide("slow");
                        $('#buttonMore').show("slow");
                    }
                });
                
                
		this.render(); 
               
            }            
            
        });

        return FollowersView;    

    });
