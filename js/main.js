require.config({
    paths: {
        jQuery : 'lib/jquery-1.7.1.min',
        jQueryMobile: 'lib/jquery.mobile-1.1.0-rc.1.min',
        underscore: 'lib/underscore-min',
        backbone: 'lib/backbone-min'
    }
});

require(["backbone"], 
    function(Backbone){
        $(function() {
            //var app = new routerLogin;
            //Backbone.history.start({pushState: true, root: '/'});
           
            $('#loading').show();
            $('#imgLoading').show();
                
            /* Tiene que haber una forma más facil de obtener
             * las variables de sesion sin llamar al php */
        
            url = "apiTwitter/service/UserCredentials.php";
            $.getJSON(url,function(json){
                if (json.user_id){
                    $(location).attr('href',"home.html");
                }
                else{
                    $(location).attr('href',"login.html");
                }
            });
            
            
            
            
            

            
       });
    }
);
   
