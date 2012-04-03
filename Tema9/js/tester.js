//global worker
var worker;

$(document).ready(function(){
      
    var area = document.getElementById('code');
    
    if(!Modernizr.mq){
        $('body').html("Upgrade your browser next time.");
        alert("Sorry, but media Queries are not supported in your browser.");
        
    }
    
     // place content from previous edit
    if (!area.value) {
    area.value = window.localStorage.getItem('value');
    }
    save = document.querySelector('#save');
    // your content will be saved locally
    save.addEventListener('click', function () {
    window.localStorage.setItem('value', area.value);
    window.localStorage.setItem('timestamp', (new Date()).getTime());
    }, false);
    
    execute = document.querySelector('#execute');
    
    
    execute.addEventListener('click', function () {
        var myFunc = new Function(area.value);
        myFunc();
    }, false);

    updateLog();
    setInterval(updateLog, 5000); // show time every 5 seconds

    
   
    setDropZone();
    yepnope({
        test: Modernizr.filereader,
        nope: 'js/dropfile.js',
        callback: function(url,result,key){
            alert("no filereader, but the script has been downloaded!");
        }
    });
   
   yepnope({
      test: Modernizr.geolocation,
      nope: 'js/geolocation.js',
      callback: function(url, result, key){
          alert("no geolocation, but the script has been downloaded!");
      }
   });
   
    setMap();
    
    
    yepnope({
      test: Modernizr.webworkers,
      nope: 'js/fakeworker-0.1.js',
      callback: function(url, result, key){
          alert("no webworkers, but the script has been downloaded!");
      }
    });
   setWorker();
    
    
    yepnope({
        test: Modernizr.websockets,
        nope: 'js/jquery.socket.js',
        callback: function(url, result, key){
            alert("no websocketsss, but the script has been downloaded!");
        }
    });

    setSocket();

    setCache();
   
});


function updateLog() {
    var delta = 0;
    if (window.localStorage.getItem('value')) {
        delta = ((new Date()).getTime() - (new Date()).setTime(window.localStorage.getItem('timestamp'))) / 1000;
        document.querySelector("#log").innerHTML = 'last saved: ' + delta + 's ago';
    } 
}

function setDropZone(){
    var dropZone = document.querySelector('#dropZone');
    dropZone.addEventListener('dragenter', function(event) {
        if (event.preventDefault) event.preventDefault();
            event.dataTransfer.dropEffect = 'copy';
            this.className = 'hovering';
            return false;
        }, false
    );
    dropZone.addEventListener('dragover', function(event) {
            if (event.preventDefault) event.preventDefault(); // allows us to drop
            event.dataTransfer.dropEffect = 'copy';
            return false;
        }, false
    );
    dropZone.addEventListener('dragleave', function(event) {
            if (event.preventDefault) event.preventDefault(); // allows us to drop
            this.className = '';
            return false;
        }, false
    );
    dropZone.addEventListener('drop', function(event) {
        if (event.preventDefault){
            event.preventDefault();
        }
        var imgPassed = null;
        var dropdata = document.querySelector('#drop-data');
        var types = event.dataTransfer.types;
        document.querySelector('#drop-data').textContent = '';
        this.innerHTML = '';
        for (var i = 0; i < types.length; i++) {
            if (types[i] == 'Files') {
                var files = event.dataTransfer.files;
                for (var j = 0; j < files.length; j++) {
                    dropdata.textContent += 'File Name: '+files[j].fileName;
                    dropdata.textContent += 'File Size: '+files[j].fileSize;
                }
            }
            else {
                if (typeof event.dataTransfer.getData(types[i]) !== 'undefined') {
                    dropdata.innerHTML += '<p><em class="datatypes">'+types[i]+'</em>: <br />'+event.dataTransfer.getData(types[i]).replace(/</g, '&lt;') + '</p>';
                }
            }

            if (types[i] == 'text/uri-list') {
                imgPassed = event.dataTransfer.getData('text/uri-list');
            }
        }
        
        if (imgPassed) {
            var cEl = document.createElement('canvas');
            cEl.width = 200;
            cEl.height = 100;
            var ctx = cEl.getContext('2d');
            var img_buffer = document.createElement('img');
            img_buffer.src = imgPassed;
            img_buffer.style.display = 'none';
            document.body.appendChild(img_buffer); // this line only needed in safari
            img_buffer.onload = function() {ctx.drawImage(img_buffer,0,0,100,100);}
            this.appendChild(cEl);
        } else {
            if (event.dataTransfer.getData('text')) {
                this.innerHTML = event.dataTransfer.getData('text');
            }
            else {
                if (event.dataTransfer.getData('text/plain')) {
                    this.innerHTML = event.dataTransfer.getData('text/plain');
                }
            
        return false;
        }}}, false);
}

function setMap(){
var map = null;
            var geolog = document.querySelector('#geo-log');
            var geoMap = document.querySelector('#geo-map');

            function showPosition(position) {
              geolog.textContent = "You're within " + position.coords.accuracy +
                  " meters of (" + position.coords.latitude + ", " +
                  position.coords.longitude + ")";
              var latLng = new google.maps.LatLng(
                  position.coords.latitude, position.coords.longitude);
              var marker = new google.maps.Marker({
                position: latLng,
                map: map
              });
              map.setCenter(latLng);
              map.setZoom(15);
            }

            function handlePositionError(evt) {
              geolog.textContent = evt.message;
            }

            function successPositionHandler(evt) {
              // Load map if it doesn't already exist and when user clicks the button.
              if (!map) {
                map = new google.maps.Map(geoMap, {
                  zoom: 3,
                  center: new google.maps.LatLng(37.4419, -94.1419), // United States
                  mapTypeId: google.maps.MapTypeId.ROADMAP
                });
                map.getDiv().style.border =  '1px solid #ccc';
              }

              if (navigator.geolocation) {
                geolog.style.visibility = 'visible';
                geolog.textContent = 'Looking for location...';
                navigator.geolocation.getCurrentPosition(showPosition, handlePositionError);
                // Also monitor position as it changes.
                //navigator.geolocation.watchPosition(showPosition, handlePositionError);
              } else {
                geolog.textContent = 'Oops! Your browser does not support geolocation.';
              }
            }

            document.querySelector('#see-position').addEventListener('click', successPositionHandler, false);
            geoMap.addEventListener('click', successPositionHandler, false);
}

function setWorker(){
    worker = new Worker('js/task.js');
    worker.onmessage = function(event) {alert(event.data);};
    window.setInterval("worker.postMessage('Sixty seconds')",60000);
    
}

function setSocket(){
    var socket = new WebSocket('ws://html5rocks.websocket.org/echo');
    var inputMessage = document.querySelector('#inputMessage');
    socket.onopen = function(event) {
        socket.send('Hello, WebSocket');
    };
    socket.onmessage = function(event) {alert(event.data);}
    socket.onclose = function(event) {alert('Socket closed');}
    
    document.querySelector('#sendMessage').addEventListener('click', function(){
        
        socket.send(inputMessage.value);
    }, false);
}

    
function setCache(){
    
    window.applicationCache.addEventListener('updateready', function(e) {
        alert("first");
        if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
            window.applicationCache.swapCache();
            alert("second");
            if (confirm('A new version of this site is available. Load it?')) {
                window.location.reload();
            }
        }
    }, false);
}

function setDropZoneNope(){
    var holder = document.getElementById('dropZone');
    holder.ondragover = function () {return false;};
    holder.ondragenter = function () {return false;};
    holder.ondrop = function (e) {
        e = e || window.event;

        // Read from e.files, as well as e.dataTransfer
        var files = (e.files || e.dataTransfer.files);

        var s = "";
        for (var i = 0; i < files.length; i++) {
            (function (i) {
                var reader = new FileReader();
                reader.onload = function (event) {
                    holder.innerHTML = "<li><img src='" + event.target.result + "' /> " + (files[i].name) + "</li>" + holder.innerHTML;
                };
                reader.readAsDataURL(files[i]);
            })(i);
        }

        return false;
    };
}