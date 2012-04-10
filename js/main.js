require.config({
    paths: {
        jQuery: 'js/jquery-1.7.1.min',
        jQueryMobile: 'js/jquery.mobile',
        underscore: 'js/underscore',
        backbone: 'js/backbone'
    }
});


require(["order!jQuery","order!jQueryMobile"],
    function(jquery) { 
       $(function() {
            //var app = new AppView;
       });
    }
);
