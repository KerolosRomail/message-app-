document.addEventListener('keydown', function(event) {
    // Check if the Control key is pressed and the 'h' key is pressed
    if (event.altKey && event.key === 'h') {
        
        window.location.replace('/home');
    }
    if (event.altKey && event.key === 's') {
        
        window.location.replace('/submit');
    }
  
});