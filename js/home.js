require.config({
    paths: {
        underscore: 'lib/underscore-min',
        backbone: 'lib/backbone-min'
    }
});

require(["views/HomeView"],
    function(HomeView) { 
       $(function() {
            
            var home = new HomeView;
            
       });
    }
);