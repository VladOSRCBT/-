function setup () {
    createCanvas(windowWidth, windowHeight);
    }
    
    function draw () {
    background(100);
    ellipse(mouseX, mouseY, 21, 21);
    }
    
    function windowResized() {
        resizeCanvas(windowWidth, windowHeight);
    }