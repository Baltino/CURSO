define(["underscore","backbone"],
    function(_, Backbone) {
        var LoginView = Backbone.View.extend({
            el: $("#login"),
            
            events: {
                "click #linkLogin": "irLogin"
            },
            
            initialize: function() {
              
            },
            
            irLogin: function(){

                $(location).attr('href',"apiTwitter/service/RequestToken.php");
                
            }
    });
    return LoginView;
});
