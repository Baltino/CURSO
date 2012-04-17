require.config({
    paths: {
        underscore: 'lib/underscore-min',
        backbone: 'lib/backbone-min',
        localstorage: 'lib/backbone-localstorage'
    }
});

require(["backbone"],
    function(Backbone) { 
        $(function() {
            $('#loading').show();
            $('#imgLoading').show();
            url = "apiTwitter/service/UserCredentials.php";
            $.getJSON(url,function(json){
                if (json.user_id){
                    $(location).attr('href',"home.html");
                }
                $('#loading').hide();
                $('#imgLoading').hide();
                $('#linkLogin').show();
            });
            
            
            $('#linkLogin').click(function() {
                $('#loading').show();
                $('#imgLoading').show();
            });
       });
    }
);