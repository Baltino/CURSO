require.config({
    paths: {
        underscore: 'lib/underscore-min',
        backbone: 'lib/backbone-min'
    }
});

require(["routers/routerLogin","backbone"],
    function(routerLogin,Backbone) { 
       $(function() {
            var app = new routerLogin;
            Backbone.history.start({pushState: true, root: '/sprint1/'});
            app.navigate('/login.html',{trigger: true});
       });
    }
);
   
