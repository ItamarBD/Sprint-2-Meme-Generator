var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);

function handleImage(e) {
    clearGmeme();

    console.log('imgHeight 1', gMeme.imgHeight)
    var imageObj = new Image();
    imageObj.onload = function () {
        context.drawImage(imageObj, 0, 0, gCanvas.width, gCanvas.height);
    }
    var reader = new FileReader();

    reader.onload = function (event) {
        var img = document.querySelector('img');
        img.onload = function () {
            gCanvas.width = img.width;
            gCanvas.height = img.height;
            gMeme.imgWidth = document.querySelector('img').naturalWidth;
            gMeme.imgHeight = document.querySelector('img').naturalHeight;
            gPosY = gMeme.imgHeight - gMeme.txts[gIdx].size;
            gCtx.drawImage(img, 0, 0);
        }
        img.src = event.target.result;
    }
    init();
    console.log('imgHeight 2', gMeme.imgHeight)
    gPosY = gCanvas.height - 20;
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

function drawImg() {
    var img = document.querySelector('img');
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)

}

function addText() {
    var txt = document.getElementById('text-box').value;
    console.log(txt);
    gMeme.txts[gIdx].line = txt;
    renderCanvas(txt);
    SaveText();
}
function clearText() {
    if (gIdx > 0) {
        gMeme.txts[gIdx - 1].line = '';
        renderCanvas('');
        gIdx--;
    }
    if (gIdx === 0) {
        gMeme.txts[gIdx - 1].line = '';
        renderCanvas('');
    }
}

function nextLine() {
    if (gIdx < gMeme.txts.length - 1) {
        gIdx++;
        var text = gMeme.txts[gIdx].line;
        document.getElementById('text-box').value = text;
        gMeme.txts[gIdx].line = text;
        renderCanvas(document.getElementById('text-box').value);
    }
}

function prevLine() {
    if (gIdx > 0) {
        gIdx--;
        var text = gMeme.txts[gIdx].line;
        document.getElementById('text-box').value = text;
        var color = gMeme.txts[gIdx].color;
        document.getElementById('color-changer').value = color;
        gMeme.txts[gIdx].line = text;

        renderCanvas(document.getElementById('text-box').value)
    }
}

function changeColor() {
    var color = document.getElementById('color-changer').value;
    gMeme.txts[gIdx].color = color;
}

function moveTextUp() {
    gMeme.txts[gIdx].posY -= 5;
    renderCanvas(document.getElementById('text-box').value);
}

function moveTextDown() {
    gMeme.txts[gIdx].posY += 5;
    renderCanvas(document.getElementById('text-box').value);
}

function moveTextLeft() {
    gMeme.txts[gIdx].posX -= 10
    renderCanvas(document.getElementById('text-box').value);
}

function moveTextRight() {
    gMeme.txts[gIdx].posX += 10;
    renderCanvas(document.getElementById('text-box').value);
}

function decreaseFont() {
    gMeme.txts[gIdx].size -= 5;
    renderCanvas(document.getElementById('text-box').value);
}

function increaseFont() {
    gMeme.txts[gIdx].size += 5;
    renderCanvas(document.getElementById('text-box').value);
}

function downloadCanvas(elLink) {
    elLink.href = gCanvas.toDataURL();
    elLink.download = 'canvas.jpg';
}

function changFont() {
    var font = document.getElementById('font').value;
    gMeme.txts[gIdx].font = font;
    renderCanvas(document.getElementById('text-box').value);
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
        var txtSize = gMeme.txts[gIdx].size
        if (txt === '') width = gCtx.measureText(document.getElementById('text-box').value).width;
        if (
            ev.offsetX > gMeme.txts[i].posX - width &&
            ev.offsetX < gMeme.txts[i].posX + width &&
            ev.offsetY > gMeme.txts[i].posY - (txtSize * 2) &&
            ev.offsetY < gMeme.txts[i].posY + txtSize
        ) {
            gCtx.fillStyle = "red";
            gCtx.fillRect(gMeme.txts.gPosX, gMeme.txts.gPosY, 200, 10);
            gDragIdx = i;
            drag(ev);
        }
    }
}