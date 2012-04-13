require.config({
    paths: {
        underscore: 'lib/underscore-min',
        backbone: 'lib/backbone-min',
        localstorage: 'lib/backbone-localstorage'
    }
});

require(["backbone","localstorage","views/HomeView"], //"routers/routerLogin"],
    function(Backbone, Localstorage, HomeView){  //,routerLogin) { 
        $(function() {
            //var app = new routerLogin;
            //Backbone.history.start({pushState: true, root: '/'});
           
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
   
