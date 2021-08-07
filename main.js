img = "";
status = "";
objects = [];

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded()
{ 
    console.log("Model is Loaded");
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function preload()
{
    img = loadImage('dog_cat.jpg');
}

function draw()
{

    ///Rectangle for dog///

    image(video, 0, 0, 380, 380);
    /**
    fill('#65088e');
    text("dog", 150, 75);
    noFill();
    stroke("#65088e");
    rect(30, 60, 430, 350);

    ///Rectangle for cat///

    fill('#65088e');
    text("cat", 340, 100);
    noFill();
    stroke("#65088e");
    rect(300, 90, 310, 300);

    ///End of making rects///
*/

    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video, gotResult);

        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Object Detected";

            document.getElementById("number_of_object").innerHTML = "Number of Objects Detected are : " + objects.length;

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "% ", objects[i].x + 100, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}