'use strict'

var gMeme = {
    txts: [
        {
            line: '',
            size: 50,
            align: 'left',
            color: '',
            posX: 30,
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

function init() {
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
    getImgSize();
    ChangeCanvasSize();
    drawImg();
    gIdx = 0;
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

function clearGmeme() {
    document.getElementById('text-box').value = '';
    gMeme = {
        txts: [
            {
                line: '',
                size: 50,
                align: 'left',
                color: '',
                posX: 30,
                posY: 50,
                font: 'impact'
            }
        ],
        imgHeight: gCanvas.width,
        imgWidth: gCanvas.height
    }
}

function renderCanvas(txt) {
    drawImg();
    changeColor();
    drawText(txt);
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
    gCtx.shadowBlur = 20;
    gCtx.shadowColor = "black";
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
        gCtx.shadowBlur = 20;
        gCtx.shadowColor = "black";
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
        posX: 30,
        posY: gPosY,
        font: font
    }
    gMeme.txts.push(newObj);
    gIdx = gMeme.txts.length - 1;
    document.getElementById('text-box').value = gMeme.txts[gIdx].line;

    if (gPosY > (gMeme.imgHeight / gMeme.txts[gIdx].size) + (gMeme.txts[gIdx].size * 3)) {
        gPosY -= gMeme.txts[gIdx].size;
    } else gPosY = gMeme.imgHeight - 100;
}

function getTextWidth(txt) {
    gTextWidth = gCtx.measureText(txt).width;
}