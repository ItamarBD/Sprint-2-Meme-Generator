'use strict'

var gMeme = {
    // selectedImgId: 5,
    txts: [
        {
            line: 'I never eat Falafel',
            size: 20, align: 'left',
            color: 'red'
        }
    ],
    imgHeight: 0,    
    imgWidth: 0
}

var gCanvas;
var gCtx;




var imageObj = new Image();
imageObj.onload = function() {
	context.drawImage(imageObj, 0, 0, gCanvas.width, gCanvas.height);
}
function init() {
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
    console.log(gCtx);

    getImgSize();
    ChangeCanvasSize();
    drawImg();
    drawText('Hello!');
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
    console.log('width' ,width);
    console.log('Height' ,height);
}

function drawImg() {
    var img = document.querySelector('img');
    gCtx.drawImage(img, 0, 0, gCanvas.width , gCanvas.height)

}

function drawText(txt) {
    gCtx.beginPath()
    gCtx.font = '30px serif'
    gCtx.fillText(txt, 30, 30);
    gCtx.stroke();
    gCtx.closePath();

}

function changeColor() {

}


