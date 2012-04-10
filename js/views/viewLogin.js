define(["underscore","backbone"],
    function(_, Backbone) {
        var loginView = Backbone.View.extend({
            el: $("#login"),
            
            events: {
                "keypress #user":  "keyUser",
                "click #botonLogin": "verificarCampos"
            },
            
            initialize: function() {
              this.inputU = this.$("#user");
              this.inputP = this.$("#password");
              
              this.errorU = this.$("#errorU");
              this.errorU.hide();
              this.errorP = this.$("#errorP");
               this.errorP.hide();
            },
            
            keyUser: function(e) {
                if (e.keyCode == 13) {
                    verificarCampos();
                }
            },
            
            verificarCampos: function() {
                if (!this.inputU.val()){
                    this.errorU.show("slow");
                    this.errorU.html("<img class=\"imgError\" src=\"css/img/error.png\"/> Usuario o correo vacio.");
                }
                if (!this.inputP.val()){
                    this.errorP.show("slow");
                    this.errorP.html("<img class=\"imgError\" src=\"css/img/error.png\"/> Contraseña vacia.");
                }
            }
           
        })
        return loginView;    
});