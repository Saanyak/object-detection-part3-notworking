status = "";
clock_image = "";
objects = [];

function preload() {
    clock_image = loadImage("clock.jpg");
}

function setup() {
    canvas = createCanvas(350,550);
    canvas.center();
    object_detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    object_detector.Detect(clock_image,gotResults);
}

function gotResults(results,error) {
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(clock_image,0,0,350,550);
    if(status != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill("#ba53ed");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x, objects[i].y);
            noFill();
            stroke("#ba53ed");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}