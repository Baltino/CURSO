require.config({
    paths: {
        jQuery: 'lib/jquery-1.7.1.min',
        jQueryMobile: 'lib/jquery.mobile-1.1.0-rc.1.min',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone'
       
    }
});

require(["order!jQuery","order!jQueryMobile","views/AppView"],
    function(json2,jquery,AppView) { 
       $(function() {
            var app = new AppView;
       });
    }
);