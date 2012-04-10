define(["underscore","backbone"],
    function(_, Backbone) {
        var Credential = Backbone.Model.extend({
            defaults: function() {
                return {
                    userName: '',
                    pwd: '',
                    twitterConsumerKey: '',
                    twitterConsumerSecret: ''
                };
            },

            initialize: function() {
                if (!this.get("userName")) {
                    this.set({"userName": this.defaults.title});
                }
                if (!this.get("pwd")) {
                    this.set({"pwd": this.defaults.title});
                }
                if (!this.get("twitterConsumerKey")) {
                    this.set({"twitterConsumerKey": this.defaults.title});
                }
                if (!this.get("twitterConsumerSecret")) {
                    this.set({"twitterConsumerSecret": this.defaults.title});
                }
            },
            
            clear: function() {
                this.destroy();
            } 

        })

        return Credential;    

    });