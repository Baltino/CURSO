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
        created_at: ""
      };
    },

    initialize: function() {
      if (!this.get("retweeted")) {
        this.set({"retweeted": this.defaults.title});
      }
      if (!this.get("image")) {
        this.set({"image": this.defaults.synopsis});
      }
      if (!this.get("name")) {
        this.set({"name": this.defaults.year});
      }
      if (!this.get("screen_name")) {
        this.set({"screen_name": this.defaults.year});
      }
      if (!this.get("text")) {
        this.set({"text": this.defaults.year});
      }
      if (!this.get("created_at")) {
        this.set({"created_at": this.defaults.year});
      }
    }

  });




    return Twitt;   
    });