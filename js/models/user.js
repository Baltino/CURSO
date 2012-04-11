define(["underscore","backbone"],
    function(_, Backbone) {
        var User = Backbone.Model.extend({
            url:"./apiTwitter/servicex/Prueba.php",
            
            options:{
                success:function(data) {
                    alert("pepe");
                },
                error:function() {
                    alert("error");
                }
            },
            
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
            
            clear: function() {
                this.destroy();
            },
            
            
            
        })

        return User;    

    });