musicharry = "";
musicsugar = "";

LeftY=0;
LeftX=0;
scoreLeftWrist = 0;

RightY=0;
RightX=0;
X = "";

function setup() {
    canvas = createCanvas(650, 550);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function preload() {
    soundFormats('mp3','ogg');

    musicharry = loadSound('harry_potter_theme.mp3');
    musicsugar = loadSound('sugar-coat.mp3');
}
function draw() {
    image(video, 0, 0, 650, 550);

    musicharry.isPlaying();
    X = musicharry;

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2)
    {
        circle(LeftX,LeftY,20);
        musicsugar.stop();
        if(musicharry = false)
        {
            musicharry.play();
            document.getElementById("song").innerHTML = "Harry Potter Theme Song"
        }
    }
}
function modelLoaded() 
{
    console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        LeftX = results[0].pose.leftWrist.x;
        LeftY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + LeftX +" leftWristY = " + LeftY);

        RightX = results[0].pose.rightWrist.x;
        RightY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + RightX + "rightWristY = " + RightY);

    }
}