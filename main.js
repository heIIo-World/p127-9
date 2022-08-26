petersong = "";
harrysong = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY=0;
scoreLeftWrist = 0;
status = 0;

function preload(){
    petersong = loadSound("music.mp3");
    harrysong = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(700, 500);
   canvas.position(200, 250);
    video = createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function  modelLoaded(){
    console.log('Posenet Is Initialized');
}

function draw(){
    image(video, 0, 0, 700, 500);
    status = petersong.isPlaying()
    
    fill("#FF0000");
    stroke("#FF0000");
    
 if(scoreLeftWrist>0.2) {
    circle(leftWristX, leftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    harrysong.stop();
    
    if(status=false){
        petersong.play();
        console.error("SONG IS PLAYING");
        document.getElementById("song").innerHTML = "Song playing is the Peter Pan Song";
    }
  }
}

function gotPoses(results){
if(results.length>0){
        console.log(results);
    leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+ leftWristX + ", leftWristY = "+leftWristY);
        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+ rightWristX + ", rightWristY = "+rightWristY);
    
    scoreLeftWrist=results[0].pose.keypoints[9].score;
}}