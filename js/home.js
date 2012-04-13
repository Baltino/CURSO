require.config({
    paths: {
        underscore: 'lib/underscore-min',
        backbone: 'lib/backbone-min'
    }
});

require(["backbone","views/HomeView"],
    function(Backbone,HomeView) { 
       $(function() {
           
              url = "apiTwitter/service/UserCredentials.php";
          
           
           
            $.getJSON(url,function(json){
                if (!json.user_id){
                    $(location).attr('href',"login.html");
                }
            });
            var view = new HomeView;
       });
    }
);