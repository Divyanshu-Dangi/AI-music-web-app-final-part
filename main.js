function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelloaded);
    poseNet.on('pose', gotPoses);
}
song="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
scoreleftwrist=0;
scorerightwrist=0;

function preload()
{
    song=loadSound("k.mp3");
}
function draw() {
	image(video, 0, 0, 600, 500);
	fill("#FF0000");
    stroke("#000000");

    if(scoreleftwrist>0.2)
    {
        circle(leftwristx,leftwristy,20);

        innumberleftwristy=Number(leftwristy);
        remove_decimal=floor(innumberleftwristy);
        volume=remove_decimal/500;
        document.getElementById("volume").innerHTML="volume = "+volume;
        song.setVolume(volume);
    }

    if(scorerightwrist>0.2)
    {
        circle(rightwristx,rightwristy,20);
        console.log("hi");
        if(rightwristy>=0&&rightwristy<100)
        {
          document.getElementById("speed").innerHTML="speed=0.5x";
          song.rate(0.5);
        }
        else if(rightwristy>=100&&rightwristy<200)
        {
          document.getElementById("speed").innerHTML="speed=1.0x";
          song.rate(1.0);
        }
        else if(rightwristy>=200&&rightwristy<300)
        {
          document.getElementById("speed").innerHTML="speed=1.5x";
          song.rate(1.5);
        }
        else if(rightwristy>=300&&rightwristy<400)
        {
          document.getElementById("speed").innerHTML="speed=2.0x";
          song.rate(2.0);
        }
        else if(rightwristy>=400&&rightwristy<500)
        {
          document.getElementById("speed").innerHTML="speed=2.5x";
          song.rate(2.5);
        }
    }
}
function playSound()
{
    song.play();    
    song.setVolume(1);
    song.rate(1.0);
}
function modelloaded()
{
    console.log("posenet is initialized");
}
function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);

        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;

        scoreleftwrist=results[0].pose.keypoints[9].score;
        scorerightwrist=results[0].pose.keypoints[10].score;


        console.log("leftwrist x="+leftwristx+", leftwrist y="+leftwristy);
        console.log("rightwrist x="+rightwristx+", rightwrist y="+rightwristy);
    }
}