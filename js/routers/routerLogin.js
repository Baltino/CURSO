define(["underscore","backbone"],
    function(_, Backbone) {
        var loginRouter = Backbone.Router.extend({
            routes: {
                "loginT": "serviceLogin",
                "inicio": "estasLogueado"
            },
            
            estasLogueado: function() {
              alert("estas loguedo");  
              this.navigate("/login.html",true);
            },
            
            serviceLogin: function() {
              
              alert("creo usuario");
              
              //$(location).attr('href',"apiTwitter/service/RequestToken.php");
              this.navigate("/apiTwitter/service/RequestToken.php",{trigger: true});
              alert("llamo");
            }
        });
       
        return loginRouter;    
});
