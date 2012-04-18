require.config({
    paths: {
        underscore: 'lib/underscore-min',
        backbone: 'lib/backbone-min',
	localStorage: 'lib/backbone-localstorage'
    }
});

require(["backbone","views/FollowersView"],
    function(Backbone,FollowersView) { 
        $(function() {
            $('#loading').show();
            $('#imgLoading').show();
            url = "apiTwitter/service/UserCredentials.php";
            $.getJSON(url,function(json){
                if (!json.user_id){
                   $(location).attr('href',"login.html");
                }
		else
		{
                    $('#loading').hide();
                    $('#imgLoading').hide();
                    var view = new FollowersView;
		}
            });
            
       });
    }
);