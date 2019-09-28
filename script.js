const video = document.getElementById('video');
const avatar = document.querySelector('#avatar');
const avatarLamp = document.querySelector('.avatar-lamp');
const expressionTxt = document.querySelector('#expression-txt');
const expressionPending = document.querySelector('#expression-pending');
const expressionTitle = document.querySelector('#expression-title');
const loader = document.querySelector('.loading');
const genderChip = document.querySelector('.gender-chip');
const ageChip = document.querySelector('.age-chip');

let gender;
let age;
let exp;
let angry;
let neutral;
let happy;
let surprised;
let disgusted;
let fearful;
let sad;

let scan = 0;
let maleAvatarImg = {
  angry: './img/avatar/svg/angry_male.svg',
  neutral: './img/avatar/svg/neutral_male.svg',
  happy: './img/avatar/svg/happy_male.svg',
  sad: './img/avatar/svg/sad_male.svg',
  surprised: './img/avatar/svg/surprised_male.svg',
  disgusted: './img/avatar/svg/disgusted_male.svg',
  fearful: './img/avatar/svg/fearful_male.svg',
};
let femaleAvatarImg = {
  angry: './img/avatar/svg/angry_female.svg',
  neutral: './img/avatar/svg/neutral_female.svg',
  happy: './img/avatar/svg/happy_female.svg',
  sad: './img/avatar/svg/sad_female.svg',
  surprised: './img/avatar/svg/surprised_female.svg',
  disgusted: './img/avatar/svg/disgusted_female.svg',
  fearful: './img/avatar/svg/fearful_female.svg',
};

// expressionPending.innerHTML = 'Please Wait! - <br/> i need to FOCUS!';
avatar.classList.add('avatar-blur');
document.querySelectorAll('.tooltip')[2].focus()
console.log(document.querySelectorAll('.tooltip')[1])

let getAvatar = (mood, gender) => {
  if (mood[0] > 0.6 || mood[0] >= 1) {
    if (gender === 'male') avatar.src = maleAvatarImg[mood[1]];
    if (gender === 'female') avatar.src = femaleAvatarImg[mood[1]];
    expressionTxt.innerText = mood[1];
  }
};

console.log('Loading module...')
avatarLamp.innerText="Loading module...";

// Promise.all([
  // faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  // faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  // faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  // faceapi.nets.faceExpressionNet.loadFromUri('/models'),
  // faceapi.nets.ageGenderNet.loadFromUri('/models'),
// ]).then(startVideo);

function startVideo() {
  navigator.getUserMedia(
    {video: {}},
    stream => (video.srcObject = stream),
    err => console.error(err),
  );
console.log('start video session...')
avatarLamp.innerText="start video session...";
}

video.addEventListener('play', () => {

avatarLamp.innerText="prepare face detection..";
console.log('prepare face detection..')
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);
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

    console.log(detections[0]);
console.log('initialize  detection..')
    // console.log(gender)
    if (detections[0]) {
avatarLamp.innerText="";
      if (scan < 1) {
        // console.log(detections);
        gender = detections[0].gender;
        age = detections[0].age.toFixed(0);

        ageChip.innerText = age;
        genderChip.innerText = gender;
        // expressionPending.innerText = 'GREAT!';
        loader.style.display = 'none'; // hide preloader
        avatar.style.filter = 'blur(0px)';
        expressionTxt.innerText = 'You are...';
        avatar.classList.remove('avatar-blur');
        avatarLamp.style.backgroundColor = 'lightgreen';

        scan++;
      }
      exp = detections[0].expressions;
      angry = [exp.angry.toFixed(2), 'angry'];
      neutral = [exp.neutral.toFixed(2), 'neutral'];
      happy = [exp.happy.toFixed(2), 'happy'];
      surprised = [exp.surprised.toFixed(2), 'surprised'];
      disgusted = [exp.disgusted.toFixed(2), 'disgusted'];
      fearful =[exp.fearful.toFixed(2),'fearful'];
      sad = [exp.sad.toFixed(2), 'sad'];

      getAvatar(angry, gender);
      getAvatar(neutral, gender);
      getAvatar(happy, gender);
      getAvatar(surprised, gender);
      getAvatar(disgusted, gender);
      getAvatar(sad, gender);
    }

    console.log(scan);
  }, 100);
});
