require.config({
    paths: {
        underscore: 'lib/underscore-min',
        moment: 'lib/moment-min',
        backbone: 'lib/backbone-min',
	localStorage: 'lib/backbone-localstorage'
    }
});

require(["backbone","views/HomeView"],
    function(Backbone,HomeView) { 
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
                    var view = new HomeView;
		}
            });
            
       });
    }
);