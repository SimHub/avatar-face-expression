const video = document.getElementById('video');
const avatar = document.querySelector('#avatar');
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
let maleAvatarImg = {
  angry: './img/avatar/png/angry_male.png',
  neutral: './img/avatar/png/neutral_male.png',
  happy: './img/avatar/png/happy_male.png',
  sad: './img/avatar/png/sad_male.png',
  surprised: './img/avatar/png/surprised_male.png',
  disgusted: './img/avatar/png/disgusted_male.png',
  // fearful: './img/avatar/png/fearful_male.png',
};
let femaleAvatarImg = {
  angry: './img/avatar/png/angry_female.png',
  neutral: './img/avatar/png/neutral_female.png',
  happy: './img/avatar/png/happy_female.png',
  sad: './img/avatar/png/sad_female.png',
  surprised: './img/avatar/png/surprised_female.png',
  disgusted: './img/avatar/png/disgusted_female.png',
  // fearful: './img/avatar/png/fearful_female.png',
};

expressionTitle.innerHTML = '<h1>your are..</h1>';
avatar.classList.add('avatar-blur');
status.innerHTML = '<code class="label label-default">loading module...</code>';
avatarLamp.style.backgroundColor = '#8A2BE2';

let getAvatar = (mood, gender) => {
  if (mood[0] > 0.6 || mood[0] >= 1) {
    if (gender === 'male') avatar.src = maleAvatarImg[mood[1]];
    if (gender === 'female') avatar.src = femaleAvatarImg[mood[1]];
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
  navigator.getUserMedia(
    {video: {}},
    stream => (video.srcObject = stream),
    err => console.error(err),
  );
  status.innerHTML =
    '<code class="label label-secondary">start video session...</code>';
}

video.addEventListener('play', () => {
  status.innerHTML =
    '<code class="label label-warning">initialize face  detection</code>';
  avatarLamp.style.backgroundColor = 'orange';
  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender();

    if (detections[0]) {
      // if (scan < 1) {
        gender = detections[0].gender;
        age = detections[0].age.toFixed(0);
        status.style.display = 'none';
        loader.style.display = 'none'; // hide preloader
        avatar.style.filter = 'blur(0px)';
        expressionTxt.innerText = 'You are...';
        avatar.classList.remove('avatar-blur');
        avatarLamp.style.backgroundColor = 'lightgreen';

        // scan++;
      // }
      exp = detections[0].expressions;
      angry = [exp.angry.toFixed(2), 'angry'];
      neutral = [exp.neutral.toFixed(2), 'neutral'];
      happy = [exp.happy.toFixed(2), 'happy'];
      surprised = [exp.surprised.toFixed(2), 'surprised'];
      disgusted = [exp.disgusted.toFixed(2), 'disgusted'];
      // fearful = [exp.fearful.toFixed(2), 'fearful'];
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
