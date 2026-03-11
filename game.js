let data;
let currentScene;
let lineIndex = 0;
let typing = false;

const bg = document.getElementById("background");
const char = document.getElementById("character");
const nameEl = document.getElementById("name");
const textEl = document.getElementById("text");
const nextBtn = document.getElementById("next");
const choicesEl = document.getElementById("choices");
const fade = document.getElementById("fade");
const bgm = document.getElementById("bgm");

fetch("scenes.json")
    .then(r => r.json())
    .then(json => {
        data = json;
        startScene("intro");
    });

function startScene(id) {
    fade.style.opacity = 1;

    setTimeout(() => {
        currentScene = data.scenes.find(s => s.id === id);
        lineIndex = 0;

        bg.style.backgroundImage = `url(assets/bg/${currentScene.bg})`;

        if (currentScene.music.startsWith("http")) {
            bgm.src = currentScene.music;
        } else {
            bgm.src = "assets/audio/" + currentScene.music;
        }

        showLine();

        fade.style.opacity = 0;
    }, 500);
}

function typeText(text) {
    typing = true;
    textEl.textContent = "";
    let i = 0;

    let interval = setInterval(() => {
        textEl.textContent += text[i];
        i++;

        if (i >= text.length) {
            clearInterval(interval);
            typing = false;
        }
    }, 30);
}

function showLine() {
    choicesEl.innerHTML = "";

    const line = currentScene.lines[lineIndex];

    nameEl.textContent = line.actor || "";

    if (line.sprite) {
        char.src = "assets/chars/" + line.sprite;
    }

    typeText(line.text);

    if (line.choices) {
        nextBtn.style.display = "none";

        line.choices.forEach(c => {
            const btn = document.createElement("button");
            btn.textContent = c.text;
            btn.onclick = () => startScene(c.goto);
            choicesEl.appendChild(btn);
        });
    } else {
        nextBtn.style.display = "block";
    }
}

nextBtn.onclick = () => {
    if (typing) {
        return;
    }

    lineIndex++;

    if (lineIndex >= currentScene.lines.length) {
        return;
    }

    showLine();
};
