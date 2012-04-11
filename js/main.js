require.config({
    paths: {
        underscore: 'lib/underscore-min',
        backbone: 'lib/backbone-min'
    }
});

require(["routers/routerLogin","backbone", "views/viewHome"],
    function(routerLogin,Backbone,loginView) { 
       $(function() {
            var app = new routerLogin;
            //en sprint1 va la root :)
            Backbone.history.start({pushState: true, root: '/'});
            
            var vHome = new loginView;
            
       });
    }
);
   
