/**
 * Base URL for models and avatar SVGs.
 * - Local / GitHub Pages: "."
 * - CodePen: "https://simhub.github.io/avatar-face-expression"
 */
const ASSET_BASE_URL = ".";

const MOOD_ICONS = {
  happy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>`,
  neutral: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="8" x2="16" y1="15" y2="15"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>`,
  surprised: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="15.5" r="2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>`,
  sad: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>`,
  angry: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><path d="M7.5 8 10 9"/><path d="m16.5 8-2.5 1"/></svg>`,
  fearful: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M8 16c1-1.5 2-1.5 4 0 2-1.5 3-1.5 4 0"/><line x1="9" x2="9.01" y1="9.5" y2="9.5"/><line x1="15" x2="15.01" y1="9.5" y2="9.5"/></svg>`,
  disgusted: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M8 15c1.5-1 2.5 1 4 0s2.5 1 4 0"/><path d="m8 8 2 2-2 1"/><path d="m16 8-2 2 2 1"/></svg>`,
};

const CAMERA_ICONS = {
  stop: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="12" height="12" x="6" y="6" rx="2" /></svg>`,
  play: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3" /></svg>`,
};

const EXPRESSIONS = [
  { key: "happy", label: "Happy" },
  { key: "neutral", label: "Neutral" },
  { key: "surprised", label: "Surprised" },
  { key: "sad", label: "Sad" },
  { key: "angry", label: "Angry" },
  { key: "fearful", label: "Fearful" },
  { key: "disgusted", label: "Disgusted" },
];

const MOOD_COLORS = {
  neutral: ["#e0f2fe", "#f8fafc", "#0284c7"],
  happy: ["#fef3c7", "#ffedd5", "#d97706"],
  sad: ["#dbeafe", "#e0e7ff", "#2563eb"],
  angry: ["#fee2e2", "#ffedd5", "#dc2626"],
  surprised: ["#cffafe", "#ede9fe", "#7c3aed"],
  fearful: ["#ede9fe", "#fae8ff", "#9333ea"],
  disgusted: ["#dcfce7", "#ecfccb", "#16a34a"],
};

// DOM Elements
const video = document.getElementById("video");
const overlayCanvas = document.getElementById("overlayCanvas");
const statusPill = document.getElementById("statusPill");
const statusText = document.getElementById("statusText");
const progressTrack = document.getElementById("progressTrack");
const progressFill = document.getElementById("progressFill");

const startScreen = document.getElementById("startScreen");
const startAvatarImg = document.getElementById("startAvatarImg");
const startBtn = document.getElementById("startBtn");
const errorBanner = document.getElementById("errorBanner");
const errorMessage = document.getElementById("errorMessage");
const retryBtn = document.getElementById("retryBtn");

const liveStage = document.getElementById("liveStage");
const avatarRing = document.getElementById("avatarRing");
const avatarTiltWrap = document.getElementById("avatarTiltWrap");
const activeAvatarImg = document.getElementById("activeAvatarImg");
const customAvatarWrap = document.getElementById("customAvatarWrap");
const moodBadge = document.getElementById("moodBadge");
const metaBadge = document.getElementById("metaBadge");
const expressionsGrid = document.getElementById("expressionsGrid");

const themeToggleBtn = document.getElementById("themeToggleBtn");
const photoboothBtn = document.getElementById("photoboothBtn");
const toggleChallengeBtn = document.getElementById("toggleChallengeBtn");
const togglePreviewBtn = document.getElementById("togglePreviewBtn");
const snapshotBtn = document.getElementById("snapshotBtn");
const cameraToggleBtn = document.getElementById("cameraToggleBtn");
const webcamPip = document.getElementById("webcamPip");

const photoboothBar = document.getElementById("photoboothBar");
const photoboothPrompt = document.getElementById("photoboothPrompt");
const photoboothCountdown = document.getElementById("photoboothCountdown");
const photoboothResult = document.getElementById("photoboothResult");
const photoboothPreviewImg = document.getElementById("photoboothPreviewImg");
const downloadCollageBtn = document.getElementById("downloadCollageBtn");
const closeCollageBtn = document.getElementById("closeCollageBtn");

const challengeBar = document.getElementById("challengeBar");
const challengePrompt = document.getElementById("challengePrompt");
const challengeTimerEl = document.getElementById("challengeTimer");
const challengeScoreEl = document.getElementById("challengeScore");
const challengeBestEl = document.getElementById("challengeBest");

const packButtons = document.querySelectorAll("[data-pack-mode]");
const customizeToggleBtn = document.getElementById("customizeToggleBtn");
const customizePanel = document.getElementById("customizePanel");
const genderControl = document.getElementById("genderControl");
const genderButtons = document.querySelectorAll("[data-gender-mode]");
const accessoryButtons = document.querySelectorAll("[data-accessory-mode]");
const skinSwatchGroup = document.getElementById("skinSwatchGroup");
const hairSwatchGroup = document.getElementById("hairSwatchGroup");
const skinSwatches = document.getElementById("skinSwatches");
const hairSwatches = document.getElementById("hairSwatches");
const outfitSwatches = document.getElementById("outfitSwatches");

const sessionStats = document.getElementById("sessionStats");
const sessionTopMood = document.getElementById("sessionTopMood");
const sessionBar = document.getElementById("sessionBar");

// App State
let modelsLoaded = false;
let isDetecting = false;
let isCameraActive = false;
let detectionTimer = null;

let currentMood = "neutral";
let currentGender = "male";
let packMode = "classic"; // "classic" | "robot" | "blob"
let genderMode = "auto"; // "auto" | "male" | "female"
let accessoryMode = "none"; // "none" | "glasses" | "sunglasses"
let showPreview = false;
let smoothedTilt = 0;
let smoothedYaw = 0;

let challengeActive = false;
let challengeTarget = "happy";
let challengeScore = 0;
let challengeHoldCount = 0;
let challengeSecondsLeft = 20;
let challengeCountdownTimer = null;
let challengeBest = Number(localStorage.getItem("avatar_mood_highscore") || 0);

let photoboothActive = false;
let photoboothTimer = null;
let collageDataUrl = "";

const SKIN_TONES = ["#FFDBB4", "#EDB98A", "#D08B5B", "#AE5D29", "#614335"];
const HAIR_COLORS = ["#2C1B18", "#4A312C", "#B58143", "#C93305", "#E8E1E1"];
const OUTFIT_COLORS = ["#5199E4", "#E11D48", "#10B981", "#8B5CF6", "#334155"];

const savedColors = (() => {
  try {
    return JSON.parse(localStorage.getItem("avatar_mood_colors") || "{}");
  } catch {
    return {};
  }
})();

const customColors = {
  skin: savedColors.skin || "#AE5D29",
  hair: savedColors.hair || "#4A312C",
  outfit: savedColors.outfit || "#5199E4",
};

const sessionCounts = {};
const barElements = new Map();
const classicSvgCache = new Map();

function getAvatarUrl(mood, gender) {
  return `${ASSET_BASE_URL}/img/avatar/svg/${mood}_${gender}.svg`;
}

function setStatus(state, text) {
  statusPill.dataset.state = state;
  statusText.textContent = text;
}

function showError(message) {
  setStatus("error", "Camera error");
  errorMessage.textContent = message;
  errorBanner.hidden = false;
  progressTrack.hidden = true;
  startBtn.disabled = false;
  startBtn.textContent = "Start Camera";
}

function hideError() {
  errorBanner.hidden = true;
}

function buildExpressionBars() {
  expressionsGrid.innerHTML = "";
  EXPRESSIONS.forEach(({ key, label }) => {
    const row = document.createElement("div");
    row.className = "exp-row";
    row.innerHTML = `
      <span class="exp-label">${MOOD_ICONS[key] || ""} ${label}</span>
      <div class="exp-bar-track"><div class="exp-bar-fill"></div></div>
      <span class="exp-pct">0%</span>
    `;
    expressionsGrid.appendChild(row);
    barElements.set(key, {
      row,
      fill: row.querySelector(".exp-bar-fill"),
      pct: row.querySelector(".exp-pct"),
    });
  });
}

function renderGlassesOverlay(pack, mode) {
  if (mode === "none") return "";
  const isShades = mode === "sunglasses";
  const fill = isShades ? "rgba(15, 23, 42, 0.88)" : "rgba(255, 255, 255, 0.16)";
  const stroke = isShades ? "#0f172a" : "#1e293b";

  if (pack === "classic") {
    return `
      <g class="classic-glasses" fill="none" stroke="${stroke}" stroke-width="4" stroke-linecap="round">
        <rect x="85" y="96" width="40" height="28" rx="9" fill="${fill}" />
        <rect x="139" y="96" width="40" height="28" rx="9" fill="${fill}" />
        <path d="M125 107 Q132 103 139 107" />
        <line x1="76" y1="104" x2="85" y2="106" />
        <line x1="179" y1="106" x2="188" y2="104" />
      </g>
    `;
  }

  const cy = pack === "robot" ? 95 : 102;
  const lx = pack === "robot" ? 84 : 86;
  const rx = pack === "robot" ? 136 : 134;
  return `
    <g fill="none" stroke="${stroke}" stroke-width="4.5" stroke-linecap="round">
      <rect x="${lx - 20}" y="${cy - 14}" width="40" height="28" rx="10" fill="${fill}" />
      <rect x="${rx - 20}" y="${cy - 14}" width="40" height="28" rx="10" fill="${fill}" />
      <line x1="${lx + 20}" y1="${cy - 2}" x2="${rx - 20}" y2="${cy - 2}" />
    </g>
  `;
}

function wrapInnerGroup(doc, el, className) {
  if (!el) return;
  const wrapper = doc.createElementNS("http://www.w3.org/2000/svg", "g");
  wrapper.setAttribute("class", className);
  while (el.firstChild) {
    wrapper.appendChild(el.firstChild);
  }
  el.appendChild(wrapper);
}

function prepareClassicSvg(svgText) {
  const doc = new DOMParser().parseFromString(svgText, "image/svg+xml");
  const svg = doc.querySelector("svg");
  if (!svg) return svgText;

  svg.removeAttribute("width");
  svg.removeAttribute("height");
  svg.setAttribute("role", "img");

  const maskedRoot = svg.querySelector('g[mask="url(#mask-4)"]');
  const bodyEl = svg.getElementById("Body");
  const faceEl = svg.getElementById("Face");
  const topEl = svg.getElementById("Top");
  const clothingEl = maskedRoot
    ? maskedRoot.querySelector('[id^="Clothing/"]')
    : null;

  if (maskedRoot && bodyEl && faceEl) {
    // 1. Add clipPath so only the head portion of #Body tilts
    let defs = svg.querySelector("defs");
    if (!defs) {
      defs = doc.createElementNS("http://www.w3.org/2000/svg", "defs");
      svg.insertBefore(defs, svg.firstChild);
    }
    const clipPath = doc.createElementNS("http://www.w3.org/2000/svg", "clipPath");
    clipPath.setAttribute("id", "classic-head-clip");
    const clipRect = doc.createElementNS("http://www.w3.org/2000/svg", "rect");
    clipRect.setAttribute("x", "0");
    clipRect.setAttribute("y", "0");
    clipRect.setAttribute("width", "264");
    clipRect.setAttribute("height", "184");
    clipPath.appendChild(clipRect);
    defs.appendChild(clipPath);

    // 2. Static neck behind clothing & head so no gap appears when tilting
    const skinEl = bodyEl.querySelector('[id^="Skin/"]');
    if (skinEl) skinEl.classList.add("classic-skin-fill");
    const skinColor = (skinEl && skinEl.getAttribute("fill")) || "#edb98a";
    const staticNeck = doc.createElementNS("http://www.w3.org/2000/svg", "rect");
    staticNeck.setAttribute("class", "classic-skin-fill");
    staticNeck.setAttribute("x", "106");
    staticNeck.setAttribute("y", "162");
    staticNeck.setAttribute("width", "52");
    staticNeck.setAttribute("height", "60");
    staticNeck.setAttribute("rx", "16");
    staticNeck.setAttribute("fill", skinColor);

    // Tag hair & outfit fill elements for live customization
    const hairFillEl = topEl && topEl.querySelector('[id^="Skin/"]');
    if (hairFillEl) hairFillEl.classList.add("classic-hair-fill");
    const outfitFillEl =
      clothingEl && clothingEl.querySelector('[id^="Color/Palette/"]');
    if (outfitFillEl) outfitFillEl.classList.add("classic-outfit-fill");

    // 3. Separate head wrapper (no SVG transform attribute on this wrapper!)
    const headGroup = doc.createElementNS("http://www.w3.org/2000/svg", "g");
    headGroup.setAttribute("class", "classic-head-tilt");

    const bodyClipWrap = doc.createElementNS("http://www.w3.org/2000/svg", "g");
    bodyClipWrap.setAttribute("clip-path", "url(#classic-head-clip)");
    bodyClipWrap.appendChild(bodyEl);
    headGroup.appendChild(bodyClipWrap);

    const faceShiftWrap = doc.createElementNS("http://www.w3.org/2000/svg", "g");
    faceShiftWrap.setAttribute("class", "avatar-face-shift");
    faceShiftWrap.appendChild(faceEl);

    const glassesSlot = doc.createElementNS("http://www.w3.org/2000/svg", "g");
    glassesSlot.setAttribute("class", "classic-glasses-slot");
    faceShiftWrap.appendChild(glassesSlot);

    headGroup.appendChild(faceShiftWrap);
    if (topEl) headGroup.appendChild(topEl);

    const eyesEl = faceEl.querySelector('[id^="Eyes/"]');
    const mouthEl = faceEl.querySelector('[id^="Mouth/"]');
    wrapInnerGroup(doc, eyesEl, "avatar-eyes");
    wrapInnerGroup(doc, mouthEl, "avatar-mouth");

    // 4. Rebuild maskedRoot order: staticNeck -> headGroup -> static clothing
    maskedRoot.appendChild(staticNeck);
    maskedRoot.appendChild(headGroup);
    if (clothingEl) maskedRoot.appendChild(clothingEl);
  }

  return svg.outerHTML;
}

async function fetchClassicSvg(mood, gender) {
  const key = `${mood}_${gender}`;
  if (classicSvgCache.has(key)) return classicSvgCache.get(key);

  try {
    const res = await fetch(getAvatarUrl(mood, gender));
    if (!res.ok) return null;
    const raw = await res.text();
    const prepared = prepareClassicSvg(raw);
    classicSvgCache.set(key, prepared);
    return prepared;
  } catch {
    return null;
  }
}

function preloadAvatars() {
  startAvatarImg.src = `${ASSET_BASE_URL}/img/avatar/svg/neutral_start.svg`;
  EXPRESSIONS.forEach(({ key }) => {
    ["male", "female"].forEach((g) => {
      const img = new Image();
      img.src = getAvatarUrl(key, g);
      fetchClassicSvg(key, g);
    });
  });
}

async function loadModels() {
  if (modelsLoaded) return;
  const modelUri = `${ASSET_BASE_URL}/models`;
  const loaders = [
    () => faceapi.nets.tinyFaceDetector.loadFromUri(modelUri),
    () => faceapi.nets.faceLandmark68TinyNet.loadFromUri(modelUri),
    () => faceapi.nets.faceExpressionNet.loadFromUri(modelUri),
    () => faceapi.nets.ageGenderNet.loadFromUri(modelUri),
  ];

  progressTrack.hidden = false;
  progressFill.style.width = "10%";
  setStatus("loading", "Loading AI models...");

  for (let i = 0; i < loaders.length; i += 1) {
    await loaders[i]();
    const pct = Math.round(((i + 1) / loaders.length) * 85);
    progressFill.style.width = `${pct}%`;
  }
  modelsLoaded = true;
}

async function startCamera() {
  hideError();
  startBtn.disabled = true;
  startBtn.textContent = "Loading...";

  try {
    await loadModels();
    setStatus("loading", "Starting camera...");
    progressFill.style.width = "95%";

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
      audio: false,
    });

    video.srcObject = stream;
    await video.play();

    isCameraActive = true;
    progressFill.style.width = "100%";
    setTimeout(() => {
      progressTrack.hidden = true;
    }, 250);

    startScreen.hidden = true;
    liveStage.hidden = false;
    photoboothBtn.hidden = false;
    toggleChallengeBtn.hidden = false;
    togglePreviewBtn.hidden = false;
    snapshotBtn.hidden = false;
    cameraToggleBtn.hidden = false;
    cameraToggleBtn.innerHTML = CAMERA_ICONS.stop;
    cameraToggleBtn.title = "Stop Camera";
    cameraToggleBtn.setAttribute("aria-label", "Stop Camera");

    setStatus("searching", "Looking for your face...");
    startDetectionLoop();
  } catch (err) {
    console.error("Initialization error:", err);
    if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
      showError(
        "Camera access was denied. Please allow camera permissions in your browser and try again."
      );
    } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
      showError("No camera was found on this device.");
    } else {
      showError("Could not start AI models or camera. Check your connection and try again.");
    }
  }
}

function stopCamera() {
  isDetecting = false;
  isCameraActive = false;
  if (detectionTimer) {
    clearTimeout(detectionTimer);
    detectionTimer = null;
  }
  stopChallengeRound();
  stopPhotobooth();

  const stream = video.srcObject;
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
    video.srcObject = null;
  }

  setStatus("idle", "Camera paused");
  cameraToggleBtn.innerHTML = CAMERA_ICONS.play;
  cameraToggleBtn.title = "Resume Camera";
  cameraToggleBtn.setAttribute("aria-label", "Resume Camera");
}

function getBestExpression(expressions) {
  let bestKey = currentMood;
  let bestScore = 0;

  for (const { key } of EXPRESSIONS) {
    const score = Number(expressions[key] || 0);
    if (score > bestScore) {
      bestScore = score;
      bestKey = key;
    }
  }

  return bestScore >= 0.35 ? bestKey : currentMood;
}

function renderRobotAvatar(mood) {
  const [, , accent] = MOOD_COLORS[mood] || MOOD_COLORS.neutral;
  const eyesByMood = {
    happy: `<path d="M72 95 Q84 82 96 95" fill="none" stroke="${accent}" stroke-width="6" stroke-linecap="round"/><path d="M124 95 Q136 82 148 95" fill="none" stroke="${accent}" stroke-width="6" stroke-linecap="round"/>`,
    neutral: `<circle cx="84" cy="95" r="8" fill="${accent}"/><circle cx="136" cy="95" r="8" fill="${accent}"/>`,
    surprised: `<circle cx="84" cy="94" r="12" fill="none" stroke="${accent}" stroke-width="5"/><circle cx="84" cy="94" r="4" fill="${accent}"/><circle cx="136" cy="94" r="12" fill="none" stroke="${accent}" stroke-width="5"/><circle cx="136" cy="94" r="4" fill="${accent}"/>`,
    sad: `<line x1="72" y1="98" x2="96" y2="92" stroke="${accent}" stroke-width="5" stroke-linecap="round"/><line x1="124" y1="92" x2="148" y2="98" stroke="${accent}" stroke-width="5" stroke-linecap="round"/><circle cx="84" cy="102" r="5" fill="${accent}"/><circle cx="136" cy="102" r="5" fill="${accent}"/>`,
    angry: `<line x1="72" y1="86" x2="98" y2="96" stroke="${accent}" stroke-width="6" stroke-linecap="round"/><line x1="148" y1="86" x2="122" y2="96" stroke="${accent}" stroke-width="6" stroke-linecap="round"/><circle cx="86" cy="102" r="6" fill="${accent}"/><circle cx="134" cy="102" r="6" fill="${accent}"/>`,
    fearful: `<circle cx="84" cy="95" r="11" fill="none" stroke="${accent}" stroke-width="4"/><circle cx="84" cy="95" r="3.5" fill="${accent}"/><circle cx="136" cy="95" r="11" fill="none" stroke="${accent}" stroke-width="4"/><circle cx="136" cy="95" r="3.5" fill="${accent}"/>`,
    disgusted: `<path d="M74 90 L94 98 L74 104" fill="none" stroke="${accent}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M146 90 L126 98 L146 104" fill="none" stroke="${accent}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`,
  };
  const mouthByMood = {
    happy: `<path d="M78 132 Q110 156 142 132" fill="none" stroke="${accent}" stroke-width="6" stroke-linecap="round"/>`,
    neutral: `<line x1="84" y1="136" x2="136" y2="136" stroke="${accent}" stroke-width="6" stroke-linecap="round"/>`,
    surprised: `<ellipse cx="110" cy="138" rx="14" ry="18" fill="${accent}"/>`,
    sad: `<path d="M80 144 Q110 124 140 144" fill="none" stroke="${accent}" stroke-width="6" stroke-linecap="round"/>`,
    angry: `<path d="M80 142 L95 134 L110 142 L125 134 L140 142" fill="none" stroke="${accent}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`,
    fearful: `<path d="M82 138 Q96 128 110 138 Q124 148 138 138" fill="none" stroke="${accent}" stroke-width="5" stroke-linecap="round"/>`,
    disgusted: `<path d="M80 138 Q95 148 110 136 Q125 124 140 138" fill="none" stroke="${accent}" stroke-width="5" stroke-linecap="round"/>`,
  };

  return `
    <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Robo-Bot ${mood} avatar">
      <rect x="86" y="180" width="48" height="18" rx="8" fill="#475569"/>
      <g class="head-tilt-group">
        <line x1="110" y1="22" x2="110" y2="46" stroke="#475569" stroke-width="6" stroke-linecap="round"/>
        <circle cx="110" cy="18" r="10" fill="${accent}"/>
        <rect x="24" y="92" width="16" height="44" rx="8" fill="#64748b"/>
        <rect x="180" y="92" width="16" height="44" rx="8" fill="#64748b"/>
        <rect x="40" y="46" width="140" height="132" rx="34" fill="${customColors.outfit}"/>
        <rect x="54" y="64" width="112" height="96" rx="22" fill="#0f172a"/>
        <g class="avatar-face-shift">
          <g class="avatar-eyes">${eyesByMood[mood] || eyesByMood.neutral}</g>
          <g class="avatar-mouth">${mouthByMood[mood] || mouthByMood.neutral}</g>
          ${renderGlassesOverlay("robot", accessoryMode)}
        </g>
      </g>
    </svg>
  `;
}

function renderBlobAvatar(mood) {
  const [c1] = MOOD_COLORS[mood] || MOOD_COLORS.neutral;
  const blobColor = customColors.outfit || "#5199E4";
  const eyesByMood = {
    happy: `<path d="M74 102 Q86 88 98 102" fill="none" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/><path d="M122 102 Q134 88 146 102" fill="none" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>`,
    neutral: `<circle cx="86" cy="102" r="8" fill="#0f172a"/><circle cx="134" cy="102" r="8" fill="#0f172a"/><circle cx="89" cy="99" r="2.5" fill="#fff"/><circle cx="137" cy="99" r="2.5" fill="#fff"/>`,
    surprised: `<circle cx="86" cy="100" r="11" fill="#fff" stroke="#0f172a" stroke-width="4"/><circle cx="86" cy="100" r="4.5" fill="#0f172a"/><circle cx="134" cy="100" r="11" fill="#fff" stroke="#0f172a" stroke-width="4"/><circle cx="134" cy="100" r="4.5" fill="#0f172a"/>`,
    sad: `<circle cx="86" cy="106" r="7" fill="#0f172a"/><circle cx="134" cy="106" r="7" fill="#0f172a"/><path d="M74 92 L96 86" stroke="#0f172a" stroke-width="4" stroke-linecap="round"/><path d="M146 92 L124 86" stroke="#0f172a" stroke-width="4" stroke-linecap="round"/>`,
    angry: `<circle cx="86" cy="106" r="7" fill="#0f172a"/><circle cx="134" cy="106" r="7" fill="#0f172a"/><path d="M72 86 L98 96" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/><path d="M148 86 L122 96" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>`,
    fearful: `<circle cx="86" cy="102" r="10" fill="#fff" stroke="#0f172a" stroke-width="4"/><circle cx="86" cy="104" r="4" fill="#0f172a"/><circle cx="134" cy="102" r="10" fill="#fff" stroke="#0f172a" stroke-width="4"/><circle cx="134" cy="104" r="4" fill="#0f172a"/>`,
    disgusted: `<path d="M76 96 L94 104 L76 110" fill="none" stroke="#0f172a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M144 96 L126 104 L144 110" fill="none" stroke="#0f172a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`,
  };
  const mouthByMood = {
    happy: `<path d="M84 132 Q110 156 136 132 Z" fill="#0f172a"/>`,
    neutral: `<line x1="92" y1="136" x2="128" y2="136" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>`,
    surprised: `<ellipse cx="110" cy="138" rx="11" ry="15" fill="#0f172a"/>`,
    sad: `<path d="M88 144 Q110 126 132 144" fill="none" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>`,
    angry: `<path d="M86 142 Q110 128 134 142" fill="none" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>`,
    fearful: `<ellipse cx="110" cy="138" rx="14" ry="9" fill="#0f172a"/>`,
    disgusted: `<path d="M86 138 Q98 148 110 136 Q122 124 134 138" fill="none" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>`,
  };

  return `
    <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mood Blob ${mood} avatar">
      <g class="head-tilt-group">
        <path d="M110 26 C164 26 192 68 192 124 C192 174 156 194 110 194 C64 194 28 174 28 124 C28 68 56 26 110 26 Z" fill="${blobColor}" fill-opacity="0.22" stroke="${blobColor}" stroke-width="6"/>
        <path d="M110 38 C156 38 180 74 180 124 C180 166 148 182 110 182 C72 182 40 166 40 124 C40 74 64 38 110 38 Z" fill="${c1}"/>
        <ellipse cx="68" cy="122" rx="11" ry="6" fill="${blobColor}" fill-opacity="0.32"/>
        <ellipse cx="152" cy="122" rx="11" ry="6" fill="${blobColor}" fill-opacity="0.32"/>
        <g class="avatar-face-shift">
          <g class="avatar-eyes">${eyesByMood[mood] || eyesByMood.neutral}</g>
          <g class="avatar-mouth">${mouthByMood[mood] || mouthByMood.neutral}</g>
          ${renderGlassesOverlay("blob", accessoryMode)}
        </g>
      </g>
    </svg>
  `;
}

function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function getEyeAspectRatio(pts) {
  if (!pts || pts.length < 6) return 0.3;
  return (dist(pts[1], pts[5]) + dist(pts[2], pts[4])) / (2 * dist(pts[0], pts[3]));
}

function updateFaceDynamics(landmarks) {
  if (!landmarks) return;
  const leftEye = landmarks.getLeftEye();
  const rightEye = landmarks.getRightEye();
  const nose = landmarks.getNose();
  const mouth = landmarks.getMouth();
  if (!leftEye.length || !rightEye.length) return;

  const avg = (pts) =>
    pts.reduce(
      (acc, p) => ({ x: acc.x + p.x / pts.length, y: acc.y + p.y / pts.length }),
      { x: 0, y: 0 }
    );

  const l = avg(leftEye);
  const r = avg(rightEye);

  // 1. Head Tilt (roll)
  const rawDeg = -(Math.atan2(r.y - l.y, r.x - l.x) * 180) / Math.PI;
  const clampedTilt = Math.max(-18, Math.min(18, rawDeg));
  smoothedTilt = smoothedTilt * 0.6 + clampedTilt * 0.4;
  avatarTiltWrap.style.setProperty("--head-tilt", `${smoothedTilt.toFixed(1)}deg`);

  // 2. Head Yaw (look left / right)
  const eyeDist = Math.max(1, dist(l, r));
  if (nose && nose.length > 3) {
    const eyeMidX = (l.x + r.x) / 2;
    const rawYaw = -((nose[3].x - eyeMidX) / eyeDist) * 18;
    const clampedYaw = Math.max(-8, Math.min(8, rawYaw));
    smoothedYaw = smoothedYaw * 0.6 + clampedYaw * 0.4;
    avatarTiltWrap.style.setProperty("--face-shift-x", `${smoothedYaw.toFixed(1)}px`);
  }

  // 3. Blink Detection (Eye Aspect Ratio)
  const leftEar = getEyeAspectRatio(leftEye);
  const rightEar = getEyeAspectRatio(rightEye);
  const isBlinking = leftEar < 0.21 && rightEar < 0.21;
  avatarTiltWrap.style.setProperty("--eyes-scale", isBlinking ? "0.15" : "1");

  // 4. Mouth Openness (Mouth Aspect Ratio)
  if (mouth && mouth.length >= 19) {
    const mouthWidth = Math.max(1, dist(mouth[0], mouth[6]));
    const innerHeight = dist(mouth[14], mouth[18]);
    const mar = innerHeight / mouthWidth;
    const mouthScaleY = mar > 0.18 ? Math.min(1.55, 1 + (mar - 0.18) * 1.4) : 1;
    avatarTiltWrap.style.setProperty("--mouth-scale-y", mouthScaleY.toFixed(2));
  }
}

function playChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.22);
  } catch {
    // Ignore audio errors when blocked
  }
}

function updateSessionStats(mood) {
  sessionCounts[mood] = (sessionCounts[mood] || 0) + 1;
  const total = Object.values(sessionCounts).reduce((a, b) => a + b, 0);
  if (total < 3) return;

  sessionStats.hidden = false;
  const sorted = Object.entries(sessionCounts).sort((a, b) => b[1] - a[1]);
  const [topKey, topCount] = sorted[0];
  const topPct = Math.round((topCount / total) * 100);
  const topMeta = EXPRESSIONS.find((e) => e.key === topKey);
  sessionTopMood.textContent = `Top: ${topMeta ? topMeta.label : topKey} (${topPct}%)`;

  sessionBar.innerHTML = sorted
    .map(([key, count]) => {
      const pct = ((count / total) * 100).toFixed(1);
      const [, , accent] = MOOD_COLORS[key] || MOOD_COLORS.neutral;
      return `<div class="session-segment" style="width:${pct}%;background:${accent}" title="${key}: ${pct}%"></div>`;
    })
    .join("");
}

function mountClassicSvg(svgMarkup) {
  activeAvatarImg.hidden = true;
  customAvatarWrap.hidden = false;
  customAvatarWrap.innerHTML = svgMarkup;

  customAvatarWrap
    .querySelectorAll(".classic-skin-fill")
    .forEach((el) => el.setAttribute("fill", customColors.skin));
  customAvatarWrap
    .querySelectorAll(".classic-hair-fill")
    .forEach((el) => el.setAttribute("fill", customColors.hair));
  customAvatarWrap
    .querySelectorAll(".classic-outfit-fill")
    .forEach((el) => el.setAttribute("fill", customColors.outfit));

  if (accessoryMode !== "none") {
    const glassesSlot = customAvatarWrap.querySelector(".classic-glasses-slot");
    if (glassesSlot) {
      glassesSlot.innerHTML = renderGlassesOverlay("classic", accessoryMode);
    }
  }
}

function renderActiveAvatar(mood, gender) {
  if (packMode === "classic") {
    const cached = classicSvgCache.get(`${mood}_${gender}`);
    if (cached) {
      mountClassicSvg(cached);
    } else {
      activeAvatarImg.hidden = false;
      customAvatarWrap.hidden = true;
      activeAvatarImg.src = getAvatarUrl(mood, gender);
      fetchClassicSvg(mood, gender).then((svgMarkup) => {
        if (
          svgMarkup &&
          packMode === "classic" &&
          currentMood === mood &&
          currentGender === gender
        ) {
          mountClassicSvg(svgMarkup);
        }
      });
    }
  } else {
    activeAvatarImg.hidden = true;
    customAvatarWrap.hidden = false;
    customAvatarWrap.innerHTML =
      packMode === "robot" ? renderRobotAvatar(mood) : renderBlobAvatar(mood);
  }
}

function updateAvatarDisplay(mood, gender, age) {
  const resolvedGender = genderMode === "auto" ? gender : genderMode;
  const moodChanged = mood !== currentMood;
  const genderChanged = resolvedGender !== currentGender;

  currentMood = mood;
  currentGender = resolvedGender;

  if (moodChanged || genderChanged) {
    renderActiveAvatar(mood, resolvedGender);
    document.body.dataset.mood = mood;

    if (moodChanged) {
      avatarRing.classList.remove("pop");
      void avatarRing.offsetWidth;
      avatarRing.classList.add("pop");
    }
  }

  const expMeta = EXPRESSIONS.find((e) => e.key === mood) || EXPRESSIONS[1];
  moodBadge.innerHTML = `${MOOD_ICONS[expMeta.key] || ""} <span>${expMeta.label}</span>`;

  if (typeof age === "number" && !Number.isNaN(age)) {
    metaBadge.hidden = false;
    metaBadge.textContent = `~${Math.round(age)} yrs · ${resolvedGender}`;
  }
}

function updateConfidenceBars(expressions, topMood) {
  EXPRESSIONS.forEach(({ key }) => {
    const el = barElements.get(key);
    if (!el) return;
    const pct = Math.round(Number(expressions[key] || 0) * 100);
    el.fill.style.width = `${pct}%`;
    el.pct.textContent = `${pct}%`;
    el.row.classList.toggle("is-top", key === topMood);
  });
}

function pickNextChallengeTarget() {
  const pool = EXPRESSIONS.filter((e) => e.key !== challengeTarget);
  const next = pool[Math.floor(Math.random() * pool.length)];
  challengeTarget = next.key;
  challengePrompt.innerHTML = `Show: ${MOOD_ICONS[next.key] || ""} <strong>${next.label}</strong>`;
  challengeHoldCount = 0;
}

function startChallengeRound() {
  challengeScore = 0;
  challengeSecondsLeft = 20;
  challengeScoreEl.textContent = "0";
  challengeBestEl.textContent = String(challengeBest);
  challengeTimerEl.textContent = "20s";
  pickNextChallengeTarget();

  if (challengeCountdownTimer) clearInterval(challengeCountdownTimer);
  challengeCountdownTimer = setInterval(() => {
    challengeSecondsLeft -= 1;
    challengeTimerEl.textContent = `${challengeSecondsLeft}s`;
    if (challengeSecondsLeft <= 0) {
      clearInterval(challengeCountdownTimer);
      challengeCountdownTimer = null;
      challengePrompt.innerHTML = `Time's up! Final: <strong>${challengeScore}</strong>`;
      setTimeout(() => {
        if (challengeActive) startChallengeRound();
      }, 2200);
    }
  }, 1000);
}

function stopChallengeRound() {
  if (challengeCountdownTimer) {
    clearInterval(challengeCountdownTimer);
    challengeCountdownTimer = null;
  }
}

function updateChallenge(detectedMood) {
  if (!challengeActive || challengeSecondsLeft <= 0) return;

  if (detectedMood === challengeTarget) {
    challengeHoldCount += 1;
    if (challengeHoldCount >= 3) {
      challengeScore += 1;
      challengeScoreEl.textContent = String(challengeScore);
      if (challengeScore > challengeBest) {
        challengeBest = challengeScore;
        challengeBestEl.textContent = String(challengeBest);
        localStorage.setItem("avatar_mood_highscore", String(challengeBest));
      }
      playChime();
      challengeBar.classList.add("success");
      setTimeout(() => challengeBar.classList.remove("success"), 450);
      pickNextChallengeTarget();
    }
  } else {
    challengeHoldCount = 0;
  }
}

function drawPreviewOverlay(detection) {
  if (!showPreview || !video.videoWidth) return;
  const dims = { width: video.videoWidth, height: video.videoHeight };
  if (
    overlayCanvas.width !== dims.width ||
    overlayCanvas.height !== dims.height
  ) {
    overlayCanvas.width = dims.width;
    overlayCanvas.height = dims.height;
  }
  const ctx = overlayCanvas.getContext("2d");
  ctx.clearRect(0, 0, dims.width, dims.height);

  if (detection) {
    const resized = faceapi.resizeResults(detection, dims);
    faceapi.draw.drawDetections(overlayCanvas, resized);
    faceapi.draw.drawFaceLandmarks(overlayCanvas, resized);
  }
}

function startDetectionLoop() {
  if (isDetecting) return;
  isDetecting = true;

  const tick = async () => {
    if (!isDetecting || !isCameraActive) return;

    try {
      const detection = await faceapi
        .detectSingleFace(
          video,
          new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.45 })
        )
        .withFaceLandmarks(true)
        .withFaceExpressions()
        .withAgeAndGender();

      if (!isDetecting) return;

      if (detection) {
        setStatus("active", "Live tracking");
        const bestMood = getBestExpression(detection.expressions);
        updateFaceDynamics(detection.landmarks);
        updateAvatarDisplay(bestMood, detection.gender, detection.age);
        updateConfidenceBars(detection.expressions, bestMood);
        updateSessionStats(bestMood);
        updateChallenge(bestMood);
        drawPreviewOverlay(detection);
      } else {
        setStatus("searching", "Can't see your face...");
        drawPreviewOverlay(null);
      }
    } catch (err) {
      console.error("Detection error:", err);
    }

    if (isDetecting) {
      detectionTimer = setTimeout(tick, 140);
    }
  };

  tick();
}

async function downloadSnapshot() {
  const size = 600;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  const [c1, c2, accent] = MOOD_COLORS[currentMood] || MOOD_COLORS.neutral;
  const grad = ctx.createLinearGradient(0, 0, size, size);
  grad.addColorStop(0, c1);
  grad.addColorStop(1, c2);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // White avatar circle
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(size / 2, size / 2 - 25, 190, 0, Math.PI * 2);
  ctx.fill();

  const img = new Image();
  let revokeUrl = null;
  const inlineSvg = !customAvatarWrap.hidden
    ? customAvatarWrap.querySelector("svg")
    : null;

  if (inlineSvg) {
    const clone = inlineSvg.cloneNode(true);
    clone.setAttribute("width", "330");
    clone.setAttribute("height", "330");
    const svgMarkup = new XMLSerializer().serializeToString(clone);
    const blob = new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" });
    revokeUrl = URL.createObjectURL(blob);
    img.src = revokeUrl;
  } else {
    img.crossOrigin = "anonymous";
    img.src = getAvatarUrl(currentMood, currentGender);
  }

  img.onload = () => {
    ctx.drawImage(img, size / 2 - 165, size / 2 - 190, 330, 330);
    if (revokeUrl) URL.revokeObjectURL(revokeUrl);

    // Mood pill at bottom
    const expMeta =
      EXPRESSIONS.find((e) => e.key === currentMood) || EXPRESSIONS[1];
    const label = expMeta.label.toUpperCase();
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.roundRect(size / 2 - 110, size - 95, 220, 48, 24);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "600 24px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, size / 2, size - 70);

    const link = document.createElement("a");
    link.download = `avatar-${packMode}-${currentMood}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };
}

// Event Listeners
startBtn.addEventListener("click", startCamera);
retryBtn.addEventListener("click", startCamera);

cameraToggleBtn.addEventListener("click", () => {
  if (isCameraActive) {
    stopCamera();
  } else {
    startCamera();
  }
});

togglePreviewBtn.addEventListener("click", () => {
  showPreview = !showPreview;
  webcamPip.hidden = !showPreview;
  togglePreviewBtn.setAttribute("aria-pressed", String(showPreview));
});

toggleChallengeBtn.addEventListener("click", () => {
  challengeActive = !challengeActive;
  challengeBar.hidden = !challengeActive;
  toggleChallengeBtn.setAttribute("aria-pressed", String(challengeActive));
  if (challengeActive) {
    startChallengeRound();
  } else {
    stopChallengeRound();
  }
});

snapshotBtn.addEventListener("click", downloadSnapshot);

packButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    packButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    packMode = btn.dataset.packMode;
    const isClassic = packMode === "classic";
    genderControl.hidden = !isClassic;
    skinSwatchGroup.hidden = !isClassic;
    hairSwatchGroup.hidden = !isClassic;
    renderActiveAvatar(currentMood, currentGender);
  });
});

genderButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    genderButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    genderMode = btn.dataset.genderMode;
    updateAvatarDisplay(currentMood, currentGender);
  });
});

accessoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    accessoryButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    accessoryMode = btn.dataset.accessoryMode;
    renderActiveAvatar(currentMood, currentGender);
  });
});

const THEME_ICONS = {
  moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
  sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
};

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.dataset.theme = isDark ? "dark" : "light";
  themeToggleBtn.innerHTML = isDark ? THEME_ICONS.sun : THEME_ICONS.moon;
  themeToggleBtn.setAttribute("aria-pressed", String(isDark));
  themeToggleBtn.title = isDark ? "Switch to Light Mode" : "Switch to Dark Mode";
}

function initTheme() {
  const saved = localStorage.getItem("avatar_mood_theme");
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));
}

function loadCurrentAvatarAsImage() {
  return new Promise((resolve) => {
    const img = new Image();
    let revokeUrl = null;
    const inlineSvg = !customAvatarWrap.hidden
      ? customAvatarWrap.querySelector("svg")
      : null;

    if (inlineSvg) {
      const clone = inlineSvg.cloneNode(true);
      clone.setAttribute("width", "330");
      clone.setAttribute("height", "330");
      const svgMarkup = new XMLSerializer().serializeToString(clone);
      const blob = new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" });
      revokeUrl = URL.createObjectURL(blob);
      img.src = revokeUrl;
    } else {
      img.crossOrigin = "anonymous";
      img.src = getAvatarUrl(currentMood, currentGender);
    }

    img.onload = () => {
      if (revokeUrl) URL.revokeObjectURL(revokeUrl);
      resolve(img);
    };
    img.onerror = () => {
      if (revokeUrl) URL.revokeObjectURL(revokeUrl);
      resolve(null);
    };
  });
}

async function renderPhotoboothCollage(frames) {
  const width = 960;
  const height = 1040;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  const isDark = document.body.dataset.theme === "dark";
  ctx.fillStyle = isDark ? "#0f172a" : "#f8fafc";
  ctx.fillRect(0, 0, width, height);

  // Header
  ctx.fillStyle = isDark ? "#f8fafc" : "#0f172a";
  ctx.font = "700 28px Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("AVATAR MOOD BOOTH", width / 2, 50);

  const pad = 32;
  const gap = 24;
  const topOffset = 84;
  const tileW = (width - pad * 2 - gap) / 2;
  const tileH = (height - topOffset - pad - gap) / 2;

  frames.forEach((frame, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = pad + col * (tileW + gap);
    const y = topOffset + row * (tileH + gap);

    const [c1, c2, accent] = MOOD_COLORS[frame.mood] || MOOD_COLORS.neutral;
    const grad = ctx.createLinearGradient(x, y, x + tileW, y + tileH);
    grad.addColorStop(0, c1);
    grad.addColorStop(1, c2);

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(x, y, tileW, tileH, 24);
    ctx.fill();

    // White avatar circle
    const cx = x + tileW / 2;
    const cy = y + tileH / 2 - 22;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(cx, cy, 130, 0, Math.PI * 2);
    ctx.fill();

    if (frame.img) {
      ctx.drawImage(frame.img, cx - 115, cy - 115, 230, 230);
    }

    const expMeta =
      EXPRESSIONS.find((e) => e.key === frame.mood) || EXPRESSIONS[1];
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.roundRect(cx - 90, y + tileH - 64, 180, 40, 20);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "600 18px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(expMeta.label.toUpperCase(), cx, y + tileH - 43);
  });

  collageDataUrl = canvas.toDataURL("image/png");
  photoboothPreviewImg.src = collageDataUrl;
  photoboothResult.hidden = false;
}

function stopPhotobooth() {
  photoboothActive = false;
  if (photoboothTimer) {
    clearTimeout(photoboothTimer);
    photoboothTimer = null;
  }
  photoboothBar.hidden = true;
  photoboothBtn.setAttribute("aria-pressed", "false");
}

function startPhotobooth() {
  if (photoboothActive) {
    stopPhotobooth();
    return;
  }

  photoboothActive = true;
  photoboothResult.hidden = true;
  photoboothBar.hidden = false;
  photoboothBtn.setAttribute("aria-pressed", "true");

  const prompts = ["happy", "surprised", "angry", "sad"];
  const captured = [];
  let poseIdx = 0;
  let count = 3;

  const step = async () => {
    if (!photoboothActive) return;
    const targetKey = prompts[poseIdx];
    const targetMeta = EXPRESSIONS.find((e) => e.key === targetKey);
    photoboothPrompt.innerHTML = `Pose ${poseIdx + 1}/4: <strong>${targetMeta ? targetMeta.label : targetKey}</strong>`;

    if (count > 0) {
      photoboothCountdown.textContent = String(count);
      count -= 1;
      photoboothTimer = setTimeout(step, 900);
      return;
    }

    photoboothCountdown.textContent = "SNAP!";
    playChime();
    avatarRing.classList.add("flash");
    setTimeout(() => avatarRing.classList.remove("flash"), 240);

    const img = await loadCurrentAvatarAsImage();
    captured.push({ mood: currentMood, img });

    poseIdx += 1;
    if (poseIdx >= prompts.length) {
      stopPhotobooth();
      await renderPhotoboothCollage(captured);
      return;
    }

    count = 3;
    photoboothTimer = setTimeout(step, 700);
  };

  step();
}

themeToggleBtn.addEventListener("click", () => {
  const next = document.body.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("avatar_mood_theme", next);
  applyTheme(next);
});

photoboothBtn.addEventListener("click", startPhotobooth);

downloadCollageBtn.addEventListener("click", () => {
  if (!collageDataUrl) return;
  const link = document.createElement("a");
  link.download = `avatar-photobooth-${packMode}.png`;
  link.href = collageDataUrl;
  link.click();
});

closeCollageBtn.addEventListener("click", () => {
  photoboothResult.hidden = true;
});

customizeToggleBtn.addEventListener("click", () => {
  const isOpen = customizePanel.hidden;
  customizePanel.hidden = !isOpen;
  customizeToggleBtn.setAttribute("aria-expanded", String(isOpen));
});

function buildColorSwatches() {
  const groups = [
    { container: skinSwatches, colors: SKIN_TONES, key: "skin" },
    { container: hairSwatches, colors: HAIR_COLORS, key: "hair" },
    { container: outfitSwatches, colors: OUTFIT_COLORS, key: "outfit" },
  ];

  groups.forEach(({ container, colors, key }) => {
    container.innerHTML = "";
    colors.forEach((hex) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "swatch-btn";
      if (customColors[key].toUpperCase() === hex.toUpperCase()) {
        btn.classList.add("active");
      }
      btn.style.backgroundColor = hex;
      btn.setAttribute("aria-label", `Select ${key} color ${hex}`);
      btn.addEventListener("click", () => {
        customColors[key] = hex;
        localStorage.setItem("avatar_mood_colors", JSON.stringify(customColors));
        container
          .querySelectorAll(".swatch-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderActiveAvatar(currentMood, currentGender);
      });
      container.appendChild(btn);
    });
  });
}

// Initialize
initTheme();
buildColorSwatches();
buildExpressionBars();
preloadAvatars();
