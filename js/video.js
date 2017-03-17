//Video

//Variables
var videofile = document.querySelector("#myVideo");
var controldiv = document.querySelector(".controls");
var playpause = document.querySelector(".pPause");
var downbtn = document.querySelector("#volDown");
var upbtn = document.querySelector("#volUp");
var mutebtn = document.querySelector("#volMute");
var srcbtns = document.querySelectorAll(".vidLoader");
console.log(mutebtn);
//Functions
videofile.controls = false;
//controldiv.style.display = "block";
controldiv.classList.remove("hideMe");
videofile.volume = 1;
console.log("100% Volume");

function playPauseVideo()
{
  if(videofile.paused)
  {
    console.log("pause");
    videofile.play();
    //playpause.value = "Pause";
    playpause.style.backgroundImage = "url('img/pause.png')";
    //document.getElementById("pPause").innerHTML = '<img src="img/pause.png"  alt="pause"  />';
    //ppbtn
  }

  else
  {
     console.log("play");
    videofile.pause();
   // playpause.value = "Play";
    playpause.style.backgroundImage = "url('img/play.png')";
    // document.getElementById("pPause").innerHTML = '<img src="img/play.png"  alt="play"  />';
  }
}

function volumeDown()
{
  if(videofile.volume > 0)
  {
    videofile.volume -= .2;
    console.log('volume is '+(videofile.volume*100)+'%');
  }
}

function volumeUp()
{
  if(videofile.volume < 1)
  {
    videofile.volume += .2;
    console.log('volume is '+(videofile.volume*100)+'%');
  }
}

function muteVideo()
{
  videofile.volume = 0;
}

function swapVideo(e)
{
  console.log(e.target.id);
  videofile.src = "assets/"+e.target.id+".mp4";
}


//Event Listeners
playpause.addEventListener('click', playPauseVideo, false);
downbtn.addEventListener('click', volumeDown, false);
upbtn.addEventListener('click', volumeUp, false);
mutebtn.addEventListener('click', muteVideo, false);

for(var i = 0; i < srcbtns.length; i++)
{
  srcbtns[i].addEventListener('click', swapVideo, false);
}