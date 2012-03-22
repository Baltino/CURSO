require(["scripts/Movie.js","scripts/Director.js"], 
        function(Movie,Director) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    
        alert("loaded");
       var x = new Movie('2','ttt','3');
       x.play();
       console.log(x.getId());
       console.log(x.getRating());
       
       var d = new Director('ddd');
       d.setQuotes(['holaa1','holaa22','holaaa3','holaaaa4']);
       x.setDirector(d);
       console.log('Director esss '+x.getDirector().getName());
       console.log('Director speaks: '+x.getDirector().speak());
       console.log('Director speaks: '+x.getDirector().speak());
       console.log('Director speaks: '+x.getDirector().speak());
        
});

