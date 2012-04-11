define(["underscore","backbone"],
    function(_, Backbone) {
        var loginView = Backbone.View.extend({
            el: $("#login"),
            
            events: {
                "click #linkLogin": "irLogin"
            },
            
            initialize: function() {
              
            },
            
            irLogin: function(){
                alert("hola pepe");
                
            }
    });
    return loginView;
});
