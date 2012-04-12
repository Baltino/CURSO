require.config({
    paths: {
        underscore: 'lib/underscore-min',
        backbone: 'lib/backbone-min'
    }
});

require(["backbone","views/HomeView"],
    function(Backbone,HomeView) { 
       $(function() {
            
            var home = new HomeView;
            
       });
    }
);