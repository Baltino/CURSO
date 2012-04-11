define(["underscore","backbone","models/user"],
    function(_, Backbone,User) {
        var loginRouter = Backbone.Router.extend({
            routes: {
                "loginT": "serviceLogin"
            },
            
            serviceLogin: function() {
              alert("creo usuario");
              this.usuario= new User;
              Backbone.sync("create",this.usuario,this.usuario.options);
              alert("llamo");
            }
        });
       
        return loginRouter;    
});
