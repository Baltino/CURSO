/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
define(
    function Director(n){
        var name = n;
        var quotes = [];
        return{
            getName: function(){
                return name;
            },
            setQuotes: function(q){
                quotes[quotes.length] = q;
            },
            speak: function(){
                //dialog
                return quotes;
            }
        };
    }
);
