define(["underscore","backbone"], 
    function(_, Backbone) {
        var User = Backbone.Model.extend({
          
            defaults: function() {
                return {
                    twitterId: '',
                    name: 'Natalia Natalia',
                    screenName: '',
                    profileImg: ''
                };
            },


            initialize: function() {
                if (!this.get("twitterId")) {
                    this.set({"twitterId": this.defaults.title});
                }
                if (!this.get("name")) {
                    this.set({"name": this.defaults.title});
                }
                if (!this.get("screenName")) {
                    this.set({"screenName": this.defaults.title});
                }
                if (!this.get("profileImg")) {
                    this.set({"profileImg": this.defaults.title});
                }
                
            },
            
            render: function() {
              //$("#user").html(this.get("screenName")+" estas logueado ! ...");
            },
            
            clear: function() {
                this.destroy();
            }          
            
            
        })

        return User;    
    
    });