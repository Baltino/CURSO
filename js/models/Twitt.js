define(["underscore","backbone"],
    function(_, Backbone) {

  var Twitt = Backbone.Model.extend({

    defaults: function() {
      return {
        retweeted: "false",
        image: "",
        name: "",
        screen_name: "",
        text: "",
        created_at: "",
        id: "",
        observer: "default",
        date: "",
        toDelete: "false"
      };
    },

    initialize: function() {
      if (!this.get("retweeted")) {
        this.set({"retweeted": this.defaults.retweeted});
      }
      if (!this.get("image")) {
        this.set({"image": this.defaults.image});
      }
      if (!this.get("name")) {
        this.set({"name": this.defaults.name});
      }
      if (!this.get("screen_name")) {
        this.set({"screen_name": this.defaults.screen_name});
      }
      if (!this.get("text")) {
        this.set({"text": this.defaults.text});
      }
      if (!this.get("created_at")) {
        this.set({"created_at": this.defaults.created_at});
      }
      if (!this.get("id")) {
        this.set({"id": this.defaults.id});
      }
      if (!this.get("observer")) {
        this.set({"observer": this.defaults.observer});
      }
      if (!this.get("toDelete")) {
        this.set({"toDelete": this.defaults.toDelete});
      }
      if (!this.get("date")) {
        this.set({"date": this.defaults.date});
      }
      
    },
    clear: function() {
        if(this.toDelete==true){
            alert("model. clear ya casi borra");
            url = "/apiTwitter/service/Destroy.php?ID="+this.id;
            $(location).attr('href',url);
        }
    },
    undoDelete: function() {
        alert("undo delete");
        this.toDelete = "false";
        $(deleteMsg).hide();      
    }


  });




    return Twitt;   
    });