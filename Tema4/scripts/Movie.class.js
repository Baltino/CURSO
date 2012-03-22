/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


//Movie class with Module pattern improved
define(['scripts/Director.class.js'],
    function Movie(){
        
        
        Movie.getId = function(){
            return this.movie_id;
        }
        Movie.getTitle = function(){
            return this.movie_title;
        }
        Movie.getRating = function(){
            return this.movie_rating;
        }

        Movie.setId = function(id){
            this.movie_id = id;
        }
        Movie.setTitle = function(title){
            this.movie_title = title 
        }
        Movie.setRating = function(rating){
            this.movie_rating = rating;
        }

        //punto 14 adding
        Movie.setCast = function(cast){
            this.movie_cast = cast;
        }

        //me pareció mejor tener un arreglo de Objetos Actor antes que los strings
        //con el nombre, como muestra el ejemplo. No es tan acotado.            
        Movie.getCast = function(){
            var toR = [];
            for(var i=0,len=this.movie_cast.length; i<len; i++){
                toR[i] = this.movie_cast[i].getName();
            }
            return toR;
        }

        //current movie object is passed
        Movie.play = function(){
            $('#inicial').trigger('playEvent',this);
            console.log('PlayEvent triggered.');
        }
        //current movie object is passed
        Movie.stop = function(){
            $('#inicial').trigger('StopEvent',this);
            console.log('StopEvent triggered');
        }

        Movie.setDirector = function(D){
            this.director = D;
        }
        
    }
);