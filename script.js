const video = document.getElementById('video');
const avatar = document.querySelector('#avatar');
const avatarLamp = document.querySelector('.avatar-lamp');
const expressionTxt = document.querySelector('#expression-txt');
const expressionPending = document.querySelector('#expression-pending');
const expressionTitle = document.querySelector('#expression-title');
const loader = document.querySelector('.loading');
const genderChip = document.querySelector('.gender-chip');
const ageChip = document.querySelector('.age-chip');

let maleAvatarImg = {
  angry: './img/avatar/angry_male.png',
  neutral: './img/avatar/neutral_male.png',
  happy: './img/avatar/happy_male.png',
  sad: './img/avatar/sad_male.png',
  surprised: './img/avatar/surprised_male.png',
  disgusted: './img/avatar/disgusted_male.png',
};

expressionPending.innerHTML = 'Please Wait! - <br/> i need to FOCUS!';
avatar.classList.add('avatar-blur');

let getMaleAvatar = mood => {
  // console.log(mood);
  if (mood[0] > 0.9 || mood[0] >= 1) {
    avatar.src = maleAvatarImg[mood[1]];
    expressionTxt.innerText = mood[1];
  }
  // if (neutral > 0.9 || neutral >= 1) {
  // avatar.src = './img/superneutral.png';
  // expressionTxt.innerText = 'neutral';
  // }
  // if (happy > 0.9 || happy >= 1) {
  // avatar.src = './img/superhappy.png';
  // expressionTxt.innerText = 'happy';
  // }
  // if (surprised > 0.9 || surprised >= 1) {
  // avatar.src = './img/surprised.png';
  // expressionTxt.innerText = 'surprised';
  // }
  // if (disgusted > 0.9 || disgusted >= 1) {
  // avatar.src = './img/disgusted.png';
  // expressionTxt.innerText = 'disgusted';
  // }
  // if (sad > 0.9 || sad >= 1) {
  // avatar.src = './img/sad.png';
  // expressionTxt.innerText = 'sad';
  // }
};

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models'),
  faceapi.nets.ageGenderNet.loadFromUri('/models'),
]).then(startVideo);

function startVideo() {
  navigator.getUserMedia(
    {video: {}},
    stream => (video.srcObject = stream),
    err => console.error(err),
  );
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas)
  // const displaySize = {width: video.width, height: video.height};
   const displaySize = {width: '400', height: '500'};
   faceapi.matchDimensions(canvas, displaySize);
  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    let exp = detections[0].expressions;
    // console.log(detections);
    let gender = detections[0].gender;
    let age = detections[0].age.toFixed(0);

    let angry = [exp.angry.toFixed(2), 'angry'];
    let neutral = [exp.neutral.toFixed(2), 'neutral'];
    let happy = [exp.happy.toFixed(2), 'happy'];
    let surprised = [exp.surprised.toFixed(2), 'surprised'];
    let disgusted = [exp.disgusted.toFixed(2), 'disgusted'];
    // let fearful =[exp.fearful.toFixed(2),'fearful'];
    let sad = [exp.sad.toFixed(2), 'sad'];

    // console.log(age)
    // console.log(gender)
    if (detections[0]) {
      ageChip.innerText = age;
      genderChip.innerText = gender;
      expressionPending.innerText = 'GREAT!';
      loader.style.display = 'none'; // hide preloader
      avatar.style.filter = 'blur(0px)';
      expressionTxt.innerText = 'You are...';
      avatar.classList.remove('avatar-blur');
      avatarLamp.style.backgroundColor = 'green';

      if (gender === 'male') {
        getMaleAvatar(angry);
        getMaleAvatar(neutral);
        getMaleAvatar(happy);
        getMaleAvatar(surprised);
        getMaleAvatar(disgusted);
        getMaleAvatar(sad);
      }
    }
  }, 100);
});
