define(["underscore","backbone","models/user"],
    function(_, Backbone, User) {
        var Users = Backbone.Collection.extend({
            
            model: User

        })

        return Users;    

    });