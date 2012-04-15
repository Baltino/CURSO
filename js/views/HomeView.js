define(["underscore","backbone","models/User","views/TwittView","collections/TwittList"], 
    function(_, Backbone,User,TwittView,TwittList ) { 
        
        var twitts = new TwittList;
        
        var HomeView = Backbone.View.extend({
            el: $("#home"),
            
            credentials: new User,
            
            events: {
                "#logout": "logoutTwitter"
            },
            
             
            initialize: function() {
                
                          
                //esto para la lsita de twitts
                
                twitts.bind('add', this.addOne, this); //por si necesitamos el metoto para crearlo
                twitts.bind('reset', this.addAll, this);//lo mismo
                twitts.bind('all', this.render, this);//para llaamr a render cuando pasa algo
                
                twitts.fetch();
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
            
            updateCredentials: function(name,id){
                this.credentials.set({'screenName': name,'twitterId': id});
                this.render(); 
            },

            render: function() {            
                if (this.credentials.get("screenName")) {
                    $("#tweetStatus").hide();
                    $("#tweetUser").html(this.credentials.get("screenName"));
                    $("#tweetScreenName").html(this.credentials.get("twitterId"));
                    $("#tweetCred").show("slow");
                }
                
                $("#tweets").show();
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
                twitts.create({retweeted: retweeted_,image: image_ ,name: name_,screen_name: screen_name_,text: text_,created_at: created_at_, id: "<a id='delete' href='apiTwitter/service/Destroy.php?ID="+id_+"' rel='external'class='delete' data-theme='A' data-role='button'> Delete </a>"});  //aca deberia ir el id nomas  
            },

            createAll: function() {
                var prop = this;
                url = "apiTwitter/service/HomeTimeline.php";
                $.getJSON(url,function(json){
                    var i=0;
                    while (json[i]!=null){
                        prop.createTwitt(json[i].retweeted,json[i].user.profile_image_url_https ,json[i].user.name,json[i].user.screen_name,json[i].text,json[i].created_at,json[i].id);
                        ++i;
                    }                   
                });
				this.render();  
            }
        });

        return HomeView;    

    });
