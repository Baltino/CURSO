define(["underscore","backbone","models/User"], 
    function(_, Backbone,User) { 
        
        var HomeView = Backbone.View.extend({
            el: $("#user"),
            
            credencial: new User,
            
            events: {
                                 
            },
             
            initialize: function() {
                var data;
                url = "apiTwitter/service/UserCredentials.php";
                $.getJSON(url,function(json){
                   data = json; 
                });
                
                this.credencial.set({'screenName': data.screen_name,'twitterId': data.user_id});
                this.render();
            },
            
            
            
            render: function() {
                this.$el.html(this.credencial.get("screenName")+" estas logueado ! ...");
                return this;
            }
            
           
        });

        return HomeView;    

    });

