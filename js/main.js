'use strict'

var gMeme = {
    // selectedImgId: 5,
    txts: [
        {
            line: '',
            size: 50,
            align: 'left',
            color: '',
            posX: 50,
            posY: 70,
            font: 'impact'
        }
    ],
    imgHeight: 0,
    imgWidth: 0
}

var gCanvas;
var gCtx;
var gIdx = 0;
var gPosY = 500;
var gTextWidth;
var gEvent;
var isDown = false;
var gDragIdx;

var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
// var canvas = document.getElementById('imageCanvas');
// var ctx = canvas.getContext('2d');


var imageObj = new Image();
imageObj.onload = function () {
    context.drawImage(imageObj, 0, 0, gCanvas.width, gCanvas.height);
}

function init() {
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
    console.log(gCtx);

    getImgSize();
    ChangeCanvasSize();
    drawImg();
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') {
        document.body.classList.add('rtl')
    } else {
        document.body.classList.remove('rtl')
    }
    doTrans();
}

function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            gCanvas.width = img.width;
            gCanvas.height = img.height;
            gCtx.drawImage(img,0,0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}

function ChangeCanvasSize() {
    // let elContainer = document.querySelector('.canvas-container');
    let elCanvas = document.querySelector('canvas');

    elCanvas.style.width = gMeme.imgWidth
    elCanvas.style.height = gCanvas.heigh;
}

function getImgSize() {
    var width = document.querySelector('img').naturalWidth;
    var height = document.querySelector('img').naturalHeight;

    gCanvas.width = width;
    gCanvas.height = height;
    gMeme.imgWidth = width;
    gMeme.imgHeight = height;
}

function renderCanvas(txt) {
    drawImg();
    changeColor();
    drawText(txt);
}

console.log(gMeme);

function drawImg() {
    var img = document.querySelector('img');
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)

}

function addText() {
    // gIdx = gMeme.txts.length;
    var txt = document.getElementById('text-box').value;
    console.log(txt);
    gMeme.txts[gIdx].line = txt;
    renderCanvas(txt);
    SaveText();
    console.log('gidx', gIdx);
}

function drawText(txt) {

    var text = txt;
    var size = gMeme.txts[gIdx].size;
    var font = gMeme.txts[gIdx].font;
    var x = gMeme.txts[gIdx].posX;
    var y = gMeme.txts[gIdx].posY;

    gCtx.beginPath();
    gCtx.font = size + 'px ' + font;
    gCtx.strokeText(text, x, y);
    gCtx.fillStyle = gMeme.txts[gIdx].color;
    gCtx.fillText(txt, x, y);
    getTextWidth(text);
    gCtx.closePath();

    for (let i = 0; i < gMeme.txts.length - 1; i++) {
        let text = gMeme.txts[i].line;
        let font = gMeme.txts[i].font
        let size = gMeme.txts[i].size;
        var x = gMeme.txts[i].posX;
        var y = gMeme.txts[i].posY;

        gCtx.beginPath();
        gCtx.font = size + 'px ' + font;
        gCtx.strokeText(text, x, y);
        gCtx.fillStyle = gMeme.txts[i].color;
        gCtx.fillText(text, x, y);
        gCtx.closePath();
    }

}

function SaveText() {
    var font = gMeme.txts[gIdx].font

    if (gIdx === 1) gPosY = (gMeme.imgHeight / 2);
    var newObj = {
        line: '',
        size: gMeme.txts[gIdx].size,
        align: 'left',
        color: '',
        posX: 50,
        posY: gPosY,
        font: font
    }
    gMeme.txts.push(newObj);
    gIdx = gMeme.txts.length - 1;
    document.getElementById('text-box').value = gMeme.txts[gIdx].line;
    console.log(gMeme);
    console.log('gposy',gPosY);
    if (gPosY > 120) {
        gPosY -= 40;
    }   else gPosY = gMeme.imgHeight - 100;
}

function clearText() {
    if (gIdx > 0) {
        console.log('gidx', gIdx)
        gMeme.txts[gIdx - 1].line = '';
        renderCanvas('');
        gIdx--;
    }
}

function nextLine() {
    if (gIdx < gMeme.txts.length - 1) {
        gIdx++;
        var text = gMeme.txts[gIdx].line;
        document.getElementById('text-box').value = text;
        // gMeme.txts[gIdx].line = '';
        gMeme.txts[gIdx].line = text;
        console.log(text)
        renderCanvas(document.getElementById('text-box').value);
        console.log('gidx', gIdx);
    }
}

function prevLine() {
    if (gIdx > 0) {
        gIdx--;
        var text = gMeme.txts[gIdx].line;
        document.getElementById('text-box').value = text;
        var color = gMeme.txts[gIdx].color;
        document.getElementById('color-changer').value = color;
        // gMeme.txts[gIdx].color = color;
        gMeme.txts[gIdx].line = text;
        renderCanvas(document.getElementById('text-box').value)
        console.log(text)
        // if (text === document.getElementById('text-box').value) {
        //     gMeme.txts[gIdx].line = text;
        //     renderCanvas(text)

        // } else {
        // gMeme.txts[gIdx].line = '';
        // renderCanvas(document.getElementById('text-box').value)

        // }
        console.log('gidx', gIdx);
    }
}

function changeColor() {
    var color = document.getElementById('color-changer').value;
    gMeme.txts[gIdx].color = color;
}

function moveTextUp() {
    gMeme.txts[gIdx].posY--;
    renderCanvas(document.getElementById('text-box').value);
}

function moveTextDown() {
    gMeme.txts[gIdx].posY++;
    renderCanvas(document.getElementById('text-box').value);
}

function moveTextLeft() {
    --gMeme.txts[gIdx].posX;
    renderCanvas(document.getElementById('text-box').value);
}

function moveTextRight() {
    ++gMeme.txts[gIdx].posX;
    renderCanvas(document.getElementById('text-box').value);
}

function decreaseFont() {
    --gMeme.txts[gIdx].size;
    renderCanvas(document.getElementById('text-box').value);
}

function increaseFont() {
    ++gMeme.txts[gIdx].size;
    renderCanvas(document.getElementById('text-box').value);
}

function downloadCanvas(elLink) {
    elLink.href = gCanvas.toDataURL();
    elLink.download = 'canvas.jpg';
}

function changFont() {
    var font = document.getElementById('font').value;
    console.log(font);
    gMeme.txts[gIdx].font = font;
    renderCanvas(document.getElementById('text-box').value);
    console.log(gMeme)
}

function getTextWidth(txt) {
    gTextWidth = gCtx.measureText(txt).width;
}

function txtAlignLeft() {
    gMeme.txts[gIdx].posX = 50;
    renderCanvas(document.getElementById('text-box').value)
}

function txtAlignCenter() {
    gMeme.txts[gIdx].posX = (gMeme.imgWidth / 2) - (gTextWidth / 2)
    renderCanvas(document.getElementById('text-box').value)
}

function txtAlignRight() {
    gMeme.txts[gIdx].posX = gMeme.imgWidth - gTextWidth - 50;
    renderCanvas(document.getElementById('text-box').value)
}

function drag(ev) {
    isDown = true;
}

function move(ev) {
    if (!isDown) return;
    gMeme.txts[gDragIdx].posX = ev.offsetX;
    gMeme.txts[gDragIdx].posY = ev.offsetY;
    renderCanvas(document.getElementById('text-box').value);

}

function stopDrag(ev) {
    isDown = false;
}

function canvasClicked(ev) {

    for (var i = 0; i < gMeme.txts.length; i++) {
        var txt = gMeme.txts[i].line;
        var width = gCtx.measureText(txt).width;
        if (txt === '') width = 300;
        if (
            ev.offsetX > gMeme.txts[i].posX &&
            ev.offsetX < gMeme.txts[i].posX + width &&
            ev.offsetY > gMeme.txts[i].posY - 50 &&
            ev.offsetY < gMeme.txts[i].posY + 50
        ) {
            gDragIdx = i;
            console.log('gdrag', gDragIdx)
            console.log('text',txt)
            drag(ev);
        }
    }
}