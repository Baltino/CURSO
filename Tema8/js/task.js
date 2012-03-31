self.onmessage = function(event) {
  // Do some work.
  self.postMessage("received: " + event.data);
};