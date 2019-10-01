const video = document.getElementById('video');
const avatarFaces = document.querySelector('#avatarFaces');
const avatarMale = document.querySelector('#avatarMale');
const avatarFemale = document.querySelector('#avatarFemale');
const avatarLamp = document.querySelector('.avatar-lamp');
const expressionTxt = document.querySelector('#expression-txt');
const expressionTitle = document.querySelector('#expression-title');
const loader = document.querySelector('.loading');
const status = document.querySelector('#status');
const panel = document.querySelector('.panel');

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
// let avatarImg = {
  // angry: './img/avatar/png/angry.png',
  // neutral: './img/avatar/png/neutral.png',
  // happy: './img/avatar/png/happy.png',
  // sad: './img/avatar/png/sad.png',
  // surprised: './img/avatar/png/surprised.png',
  // disgusted: './img/avatar/png/disgusted.png',
  // fearful: './img/avatar/png/fearful.png',
// };
// let femaleAvatarImg = {
  // angry: './img/avatar/png/angry_female.png',
  // neutral: './img/avatar/png/neutral_female.png',
  // happy: './img/avatar/png/happy_female.png',
  // sad: './img/avatar/png/sad_female.png',
  // surprised: './img/avatar/png/surprised_female.png',
  // disgusted: './img/avatar/png/disgusted_female.png',
  // fearful: './img/avatar/png/fearful_female.png',
// };

// console.log([panel])
expressionTitle.innerHTML="<h1>your are..</h1>";
// avatarFemale.style.display="block";
// avatarFemale.classList.add('avatar-blur');
status.innerHTML = '<code class="label label-default">loading module...</code>';
avatarLamp.style.backgroundColor = '#ccc';

let getAvatar = (mood, gender) => {
  if (mood[0] > 0.6 || mood[0] >= 1) {
    if (gender === 'male') {
      avatarFaces.classList.remove('female');
      avatarFaces.classList.add('male');
      avatarFemale.style.display = "none";
      avatarMale.style.display = "block";
    } 
    if (gender === 'female') {
      avatarFaces.classList.remove('male');
      avatarFaces.classList.add('female');
      avatarMale.style.display = "none";
      avatarFemale.style.display = "block";
    }
    avatarFaces.src = avatarImg[mood[1]];
    expressionTxt.innerText = mood[1];
  }
};

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
  console.log('start video session...');
  status.innerHTML =
    '<code class="label label-secondary">start video session...</code>';
}

video.addEventListener('play', () => {
  status.innerHTML =
    '<code class="label label-warning">initialize  detection..</code>';
  avatarLamp.style.backgroundColor = 'orange';
  // console.log('prepare face detection..');
  // const canvas = faceapi.createCanvasFromMedia(video);
  // document.body.append(canvas);
  // const displaySize = {width: video.width, height: video.height};
  // const displaySize = {width: '400', height: '500'};
  // const displaySize = {width: panel.offsetWidth, height: panel.offsetHeight};
  // faceapi.matchDimensions(canvas, displaySize);
  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender();
    // const resizedDetections = faceapi.resizeResults(detections, displaySize);
    // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    // faceapi.draw.drawDetections(canvas, resizedDetections);
    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    // faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

    // console.log(detections[0].landmarks.shift._x.toFixed(2))
    if (detections[0]) {
      if (scan < 1) {
        // console.log(detections);
        gender = detections[0].gender;
        age = detections[0].age.toFixed(0);

        status.style.display = 'none';
        loader.style.display = 'none'; // hide preloader
        avatarFemale.style.filter = 'blur(0px)';
        avatarMale.style.filter = 'blur(0px)';
        avatarFemale.classList.remove('avatar-blur');
        avatarMale.classList.remove('avatar-blur');
        avatarLamp.style.backgroundColor = 'lightgreen';
        expressionTxt.innerText = 'You are...';

        scan++;
      }
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
  }, 100);
});
