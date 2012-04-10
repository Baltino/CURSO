require.config({
    paths: {
        underscore: 'lib/underscore-min',
        backbone: 'lib/backbone-min'
    }
});

require(["views/viewLogin"],
    function(viewLogin) { 
         
       $(function() {
            var app = new viewLogin;
       });
    }
);
   
