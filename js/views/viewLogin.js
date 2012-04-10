define(["underscore","backbone"],
    function(_, Backbone) {
        var loginView = Backbone.View.extend({
            el: $("#login"),
            
            events: {
                "keypress #user": "keyUser",
                "keypress #password": "keyPass",
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
            
            keyUser: function() {
              this.errorU.hide();
            },
            
            keyPass: function() {
              this.errorP.hide();
            },
            
            verificarCampos: function() {
                if (this.inputU.val().match(/@/)) {
                    this.valUs = this.verificarMail(this.inputU.val());
                }
                else {
                    this.valUs = this.verificarUsuario(this.inputU.val());
                }

                this.valPass = this.verificarPass(this.inputP.val());

                if (this.valUs && this.valPass) {
                    alert("Usuario valido");
                }
                else {
                    alert("Usuario invalido");
                }
                
            },
            
            verificarUsuario: function(us) {
                if (!us){
                    this.errorU.show("slow");
                    this.errorU.html("<img class=\"imgError\" src=\"css/img/error.png\"/> Usuario o correo vacio.");
                    return = false;
                }
                else {
                    if (!us.match(/^[a-zA-Z0-9_]+$/)){
                        this.errorU.show("slow");
                        this.errorU.html("<img class=\"imgError\" src=\"css/img/error.png\"/> El nombre de usuario contiene caracteres invalidos.");
                        return false;
                    }
                    else {
                        this.errorU.hide();
                        return true;
                    }
                }
            },
            
            verificarMail: function(us) {
                if (!this.inputP.val()){
                    this.errorP.show("slow");
                    this.errorP.html("<img class=\"imgError\" src=\"css/img/error.png\"/> Contraseña vacia.");
                    this.valP = false;
                }
                else {   
                    if (!us.match(/^[a-zA-Z0-9_.@]+$/)){
                        this.errorU.show("slow");
                        this.errorU.html("<img class=\"imgError\" src=\"css/img/error.png\"/> El nombre de usuario contiene caracteres invalidos.");
                        return false;
                    }
                    else {
                        if (us.match(/[.]/) && (us.match(/[a-z]/) || us.match(/[A-Z]/) || us.match(/[0-9]/))) {
                            this.errorU.hide();
                            return true;
                        }
                        else {
                            this.errorU.show("slow");
                            this.errorU.html("<img class=\"imgError\" src=\"css/img/error.png\"/> El correo electronico esta mal formado.");
                            return false;
                        }
                    }
                }
            },
            
            verificarPass: function(us) {
                if (!us.match(/^[a-zA-Z0-9.]+$/)){
                    this.errorP.show("slow");
                    this.errorP.html("<img class=\"imgError\" src=\"css/img/error.png\"/> El password contiene caracteres invalidos.");
                    return false;
                }
                else {
                    this.errorP.hide();
                    return true;
                }
            }
           
        })
        return loginView;    
});