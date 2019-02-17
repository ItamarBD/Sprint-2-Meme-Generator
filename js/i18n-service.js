
var gCurrLang = 'en';

var gTrans = {
    'enter-text': {
        en: 'Enter text',
        he: 'הכנס טקסט'
    },
    'clear': {
        en: 'Clear text',
        he: 'מחק טקסט'
    },
    'add': {
        en: 'Add text',
        he: 'הוסף טקסט'
    },
    'next': {
        en: 'Next line',
        he: 'שורה הבאהה'
    },
    'previous': {
        ev: 'Previous line',
        he: 'השורה הקודמת'
    },
    'align-left': {
        en: 'Align left',
        he: 'ישר לשמאל'
    },
    'align-right': {
        en: 'Align right',
        he: 'ישר לימין'
    },
    'align-center': {
        en: 'Align center',
        he: 'מרכז'
    },
    'font': {
        en: 'Font',
        he: 'גופן'
    },
    'download': {
        en: 'Download',
        he: 'הורד'
    }

}




function doTrans() {
    var els = document.querySelectorAll('[data-trans]');
    
    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var transKey = el.dataset.trans;
        
        var txt = getTrans(transKey);

        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt);
        } else {
            el.innerText = txt;
        }
    }
}

function setLang(lang) {
    gCurrLang = lang;
}

function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';

    var txt = keyTrans[gCurrLang];
    if (!txt) txt = keyTrans['en'];

    return txt;
}