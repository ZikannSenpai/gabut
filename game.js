let data
let currentScene
let lineIndex = 0

const bg = document.getElementById("background")
const char = document.getElementById("character")
const nameEl = document.getElementById("name")
const textEl = document.getElementById("text")
const nextBtn = document.getElementById("next")
const choicesEl = document.getElementById("choices")

fetch("scenes.json")
.then(r=>r.json())
.then(json=>{
data = json
startScene("intro")
})

function startScene(id){
currentScene = data.scenes.find(s=>s.id===id)
lineIndex = 0
bg.style.backgroundImage = `url(assets/bg/${currentScene.bg})`
showLine()
}

function showLine(){

choicesEl.innerHTML=""

const line = currentScene.lines[lineIndex]

nameEl.textContent = line.actor
textEl.textContent = line.text

if(line.sprite){
char.src = "assets/chars/"+line.sprite
}

if(line.choices){
nextBtn.style.display="none"

line.choices.forEach(c=>{
const btn = document.createElement("button")
btn.textContent = c.text
btn.onclick = ()=>{
startScene(c.goto)
}
choicesEl.appendChild(btn)
})

}else{
nextBtn.style.display="block"
}

}

nextBtn.onclick = ()=>{
lineIndex++

if(lineIndex >= currentScene.lines.length){
return
}

showLine()
}
