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
        id: ""
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
    }
  });




    return Twitt;   
    });