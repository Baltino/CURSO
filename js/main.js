require.config({
    paths: {
        underscore: 'lib/underscore-min',
        backbone: 'lib/backbone-min'
    }
});

require(["backbone","views/HomeView"], //"routers/routerLogin"],
    function(Backbone, HomeView){  //,routerLogin) { 
        $(function() {
            //var app = new routerLogin;
            //Backbone.history.start({pushState: true, root: '/'});
           
            /* Tiene que haber una forma más facil de obtener
             * las variables de sesion sin llamar al php */
            url = "apiTwitter/service/UserCredentials.php";
           
            
            //hay que tener un sesion storage
            $.getJSON(url,function(json){
                if (json.user_id)
                    $(location).attr('href',"home.html");
                else
                    $(location).attr('href',"login.html");
            });
            
            
            
            

            
       });
    }
);
   
