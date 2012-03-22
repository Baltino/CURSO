/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


//Movie class with Module pattern improved
define(['scripts/Director.js'],function(Director){
   function Movie (_id,_title,_rating) {
        //Private variables
        var id = _id;
        var rating = _rating;
        var title = _title;
        var director;
        var cast;
        //Privileged methods (setters and getters)
        this.setId = function(_id){
            id = _id;
        }
        this.getId = function(){
            return id;
        }
        this.setRating = function(_rating){
            rating = _rating;
        }
        this.getRating = function(){
            return rating;
        }
        this.setTitle = function(_title){
            title = _title;
        }
        this.getTitle = function(){
            return title;
        }
        this.getDirector = function(){
            return director;
        }
        this.setDirector = function(_director){
            director = _director;
        }
        
    //punto 14 adding
        this.setCast = function(cast){
            movie_cast = cast;
        }

        //me pareció mejor tener un arreglo de Objetos Actor antes que los strings
        //con el nombre, como muestra el ejemplo. No es tan acotado.            
        this.getCast = function(){
            var toR = [];
            for(var i=0,len=movie_cast.length; i<len; i++){
                toR[i] = movie_cast[i].getName();
            }
            return toR;
        }
        
    }
    // Public methods
    

        //current movie object is passed
        Movie.prototype.play = function(){
            $('#inicial').trigger('playEvent',this);
            console.log('PlayEvent triggered.');
        }
        //current movie object is passed
        Movie.prototype.stop = function(){
            $('#inicial').trigger('StopEvent',this);
            console.log('StopEvent triggered');
        }
    return (Movie);
    
    
});
    
     