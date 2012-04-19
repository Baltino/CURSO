define(["underscore","backbone","moment","models/User","views/TwittView","collections/TwittList"], 
    function(_, Backbone,Moment,User,TwittView,TwittList ) { 
        
        var twitts = new TwittList;
        var maxID = 0;
        var HomeView = Backbone.View.extend({
            el: $("#home"),
            
            credentials: new User,
            
            events: {
                "click #moreTweets": "seeMore"
            },
            lastID: maxID = 0,//significa que todavia no se hizo "ver mas"
            
            empty: false,
             
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
                 //   $("#tweetStatus").hide("fast");
                    
                    $("#tweetScreenName").html(this.credentials.get("screenName"));
                    $("#tweetCred").show("slow");
                }
                
                $("#tweets").show("slow");
                $("#tweetPanel").show("slow");
                //if (this.empty) {
                //    $("#tweets").html("<span class=\"tweetname\"> No hay tweets </span>");
                //}
               
                
                
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
                //var time = moment(created_at_).fromNow();
                var time = moment(created_at_).format('DD/MM/YY, HH:mm:ss');
                
                twitts.create({retweeted: retweeted_,image: image_ ,name: name_,screen_name: screen_name_,text: text_,created_at: created_at_, id: id_, observer: obs, date: time, observer: obs});
                
            },
            seeMore: function(){
                
                $('#imgMore').show("fast");
                $('#buttonMore').hide("fast");
                
                this.createAll();
            },

            createAll: function() {
                
                var prop = this;
                url = "apiTwitter/service/HomeTimeline.php";
                
                
                $.getJSON(url,{max_id: prop.getLastID()},function(json){
                    var i=0;
                    while (json[i]!=null){
                        if(i < 20){
                            prop.createTwitt(json[i].retweeted,json[i].user.profile_image_url_https ,json[i].user.name,json[i].user.screen_name,json[i].text,json[i].created_at,json[i].id_str);
                        }
                        ++i;
                    }     
                     if (i<=20){                           
                          $("#tweets").append("<span class=\"tweetname\"> No more tweets </span>");
                          $('#imgMore').hide("slow");
                        $('#buttonMore').css({visibility: 'none'});
                    }else{
                        //tengo que restarle 1 al siguiente del n°19 que es el numero 22-2
                        //esta resta es para evitar redundancias
                       // alert( (parseInt(json[i-2].id_str) >> 32) & 0xffffffff + '  '+ parseInt(json[i-2].id_str) & 0xffffffff);
                        
                        prop.setLastID(json[i-1].id_str);  
                        //obtengo el id del ultimo tweet 
                        $('#imgMore').hide("slow");
                        $('#buttonMore').show("slow");
                    }
                });
                
                
		this.render(); 
               
            }            
            
        });

        return HomeView;    

    });
