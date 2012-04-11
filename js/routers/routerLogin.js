define(["underscore","backbone"],
    function(_, Backbone) {
        var loginRouter = Backbone.Router.extend({
            routes: {
                "loginT": "serviceLogin",
                "inicio": "estasLogueado"
            },
            
            estasLogueado: function() {
              alert("estas loguedo");  
            },
            
            serviceLogin: function() {
              alert("creo usuario");
              this.navigate("apiTwitter/service/RequesToken.php",true);
              alert("llamo");
            }
        });
       
        return loginRouter;    
});
