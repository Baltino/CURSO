define(["underscore","backbone"],
    function(_, Backbone) {
        var loginRouter = Backbone.Router.extend({
            routes: {
                "loginT": "serviceLogin"
            },
            
            serviceLogin: function() {
              alert("Servicio login");
            }
        });
       
        return loginRouter;    
});
