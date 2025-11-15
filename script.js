// MATRIX EFFECT
const canvas=document.getElementById("matrix");
const ctx=canvas.getContext("2d");

function resize(){
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
}
resize();
window.onresize=resize;

const letters="01カｱｻ龍影暗光0101";
const font=16;
let cols=Math.floor(canvas.width/font);
let drops=Array(cols).fill(1);

function draw(){
  ctx.fillStyle="rgba(0,0,0,0.05)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="#00ff41";
  ctx.font=font+"px monospace";

  for(let i=0;i<cols;i++){
    let char=letters[Math.floor(Math.random()*letters.length)];
    ctx.fillText(char,i*font,drops[i]*font);

    if(drops[i]*font>canvas.height && Math.random()>0.95) drops[i]=0;
    drops[i]++;
  }
}
setInterval(draw,40);

// TERMINAL
const linesEl=document.getElementById("lines");
const finalEl=document.getElementById("final");
const restart=document.getElementById("restart");

const seq=[
  "[SYS] Iniciando módulos núcleo...",
  "[OK] Kernel modificado cargado.",
  "[SCAN] Analizando red...",
  "[OK] Brecha detectada.",
  "[RUN] Activando exploit verde ultra...",
  "root@hack:~$ echo 'Cargando mensaje secreto...' ",
  "[DONE] Procesando..."
];

function type(arr,i=0){
  if(i>=arr.length){ showFinal(); return; }
  let text=arr[i]+"\n";
  let idx=0;

  let timer=setInterval(()=>{
    linesEl.textContent+=text[idx++]||"";
    linesEl.scrollTop=linesEl.scrollHeight;

    if(idx>=text.length){
      clearInterval(timer);
      setTimeout(()=>type(arr,i+1),300+Math.random()*500);
    }
  },25);
}

function showFinal(){
  setTimeout(()=>{
    linesEl.textContent+="\n[ACCESS GRANTED]\n\n";
    finalEl.classList.remove("hidden");
  },500);
}

type(seq);

restart.onclick=()=>{
  linesEl.textContent="";
  finalEl.classList.add("hidden");
  type(seq);
};
