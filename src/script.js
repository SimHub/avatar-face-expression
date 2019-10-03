const video = document.getElementById('video');
const stopStreaming = document.querySelector('#stopStreaming');
const avatarImgs = document.querySelectorAll('.img-avatar');
const avatarImgStart = document.querySelector('.img-avatar-start');
const avatarLamp = document.querySelector('.avatar-lamp');
const panelBox = document.querySelector('#panelBox');
const expressionTxt = document.querySelector('#expression-txt');
const expressionTitle = document.querySelector('#expression-title');
const loader = document.querySelector('.loading');
const status = document.querySelector('#status');
const statusCode = document.querySelector('#statusCode');
const panel = document.querySelector('.panel');
const dateTime = document.querySelector('#date');
let gender = '';
let age = '';
let exp = '';
let angry = '';
let neutral = '';
let happy = '';
let surprised = '';
let disgusted = '';
let fearful = '';
let sad = '';
let d = new Date();
let nD = d.toString();
let sD = nD.split(' ').splice(0, 5);

dateTime.innerText = `${sD[0]} ${sD[1]} ${sD[2]} ${sD[3]} ${sD[4]}`;
statusCode.innerHTML = 'loading module...';

let getAvatar = (mood, gender) => {
  if (mood[0] > 0.6 || mood[0] >= 1) {
    if (gender === 'male') {
      avatarImgs.forEach(i => {
        if (i.classList[1] === `${mood[1]}-male`) {
          i.style.display = 'block';
        } else {
          i.style.display = 'none';
        }
      });
    }
    if (gender === 'female') {
      avatarImgs.forEach(i => {
        if (i.classList[1] === `${mood[1]}-female`) {
          i.style.display = 'block';
        } else {
          i.style.display = 'none';
        }
      });
    }
    expressionTxt.innerText = mood[1];
  }
};

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models'),
  faceapi.nets.ageGenderNet.loadFromUri('/models'),
]).then(startVideo);

function startVideo() {
  navigator.mediaDevices
    .getUserMedia({video: {facingMode: 'user'}})
    .then(function(stream) {
      /* use the stream */
      video.srcObject = stream;
    })
    .catch(function(err) {
      /* handle the error */
      console.error(err);
    });
  statusCode.innerHTML = 'start video session...';
}
function stopStreamedVideo(videoElem) {
  let stream = videoElem.srcObject;
  let tracks = stream.getTracks();
  // console.log(stream,tracks)
  tracks.forEach(function(track) {
    track.stop();
  });
  videoElem.srcObject = null;
}
video.addEventListener('play', () => {
  statusCode.innerHTML = 'initialize detection..';
  panel.style.height = '400px';
  avatarImgStart.style.display = 'block';
  expressionTxt.innerText = '...';

  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender();
    if (detections[0]) {
      gender = detections[0].gender;
      // status.innerHTML= "";
      status.style.visibility = 'hidden';
      status.style.dislay = 'none';
      statusCode.innerHTML = '';
      loader.style.display = 'none'; // hide preloader
      avatarImgStart.style.display = 'none';
      avatarLamp.style.backgroundColor = 'lightgreen';
      exp = detections[0].expressions;
      angry = [exp.angry.toFixed(2), 'angry'];
      neutral = [exp.neutral.toFixed(2), 'neutral'];
      happy = [exp.happy.toFixed(2), 'happy'];
      surprised = [exp.surprised.toFixed(2), 'surprised'];
      disgusted = [exp.disgusted.toFixed(2), 'disgusted'];
      fearful = [exp.fearful.toFixed(2), 'fearful'];
      sad = [exp.sad.toFixed(2), 'sad'];

      getAvatar(angry, gender);
      getAvatar(neutral, gender);
      getAvatar(happy, gender);
      getAvatar(surprised, gender);
      getAvatar(disgusted, gender);
      getAvatar(sad, gender);
    }
  }, 800);

  stopStreaming.style.display = 'block';

  stopStreaming.addEventListener('click', e => {
    let el = e.target;
    let elClass = e.target.classList[1];
    // console.log(elClass);
    if (elClass === 'icon-cross') {
      el.classList.remove('icon-cross');
      el.classList.add('icon-refresh');
      stopStreamedVideo(video);
    }
    if (elClass === 'icon-refresh') {
      el.classList.remove('icon-refresh');
      el.classList.add('icon-cross');
      location.reload();
    }
  });
});
