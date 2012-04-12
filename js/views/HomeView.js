define(["underscore","backbone","models/User"], 
    function(_, Backbone,User) { 
        
        var HomeView = Backbone.View.extend({
            el: $("#user"),
            
            credentials: new User,
            
            events: {
                                 
            },
            
             
            initialize: function() {
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
                if (this.credentials.get("screenName"))
                    this.$el.html(this.credentials.get("screenName")+" estas logueado ! ...");
                else
                    this.$el.html("No estás logueado");
                return this;
            }
            
           
        });

        return HomeView;    

    });

