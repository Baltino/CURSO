require.config({
    paths: {
        underscore: 'lib/underscore-min',
        backbone: 'lib/backbone-min'
    }
});

require(["models/user"],
    function(user) { 
       $(function() {
            url = "apiTwitter/service/UserCredentials.php";
            $.getJSON(url,
                function(data) {
                    var credencial = new user({screenName: data.screen_name,twitterId: data.user_id});
                }
            );
            
       });
    }
);