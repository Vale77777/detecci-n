function setup() {
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Estado: detectando objetos.";
}

img = "";
status = "";
objects = [];


function preload(){
    img = loadImage("dog_cat.jpg")
}

function draw(){
    image(video, 0, 0, 380, 380);
    if (status != "")
    {
        r = random(255)
        g = random(255)
        b = random(255)
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.lenght; i++) {
            document.getElementById("status").innerHTML = "Estado: objetos detectados"
            fill(r,g,b)

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b)
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
    
}

function modelLoaded(){
    console.log("¡Modelo cargado!")
    status= true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}