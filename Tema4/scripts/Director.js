/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
define(
    function(){
        function Director(n){
            //private variables
            var name = n;
            var quotes = [];
            //privileged
            this.getName = function (){
                return name;
            }
            //all quotes in the array
            this.setQuotes = function(_quotes){
                quotes = _quotes;
            }
            this.getQuotes = function(){
                return quotes;
            }
        }
        Director.prototype.speak = function(){
            return this.getQuotes()[Math.floor(Math.random()*this.getQuotes().length)];
        }
         
        
        return (Director);
    }
);
