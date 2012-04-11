require.config({
    paths: {
        underscore: 'lib/underscore-min',
        backbone: 'lib/backbone-min'
    }
});

require(["routers/routerLogin","backbone", "views/viewHome"],
    function(routerLogin,Backbone) { 
       $(function() {
            var app = new routerLogin;
            Backbone.history.start({pushState: true, root: '/'});
            
            var vHome = new loginView;
            
       });
    }
);
   
