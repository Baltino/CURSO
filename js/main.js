require.config({
    paths: {
        underscore: 'lib/underscore-min',
        backbone: 'lib/backbone-min'
    }
});

require(["backbone","routers/routerLogin","views/LoginView"],
    function(Backbone,routerLogin,LoginView) { 
       $(function() {
            //var app = new routerLogin;
            //en sprint1 va la root :)
            //Backbone.history.start({pushState: true, root: '/'});
            
            var vHome = new LoginView;
            
       });
    }
);
   
