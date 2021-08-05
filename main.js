img = "";
status = "";
objects = [];

function setup()
{
    canvas = createCanvas(640, 420);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded()
{ 
    console.log("Model is Loaded");
    status = true;
    objectDetector.detect(img, gotResult);
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

    image(img, 0, 0, 640, 420);
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
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Object Detected";

            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "% ", objects[i].x + 100, objects[i].y);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}