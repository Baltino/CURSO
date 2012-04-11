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
            alert("lalala 1");
            Backbone.History.start();
            alert("lalala2");
       });
    }
);
   
