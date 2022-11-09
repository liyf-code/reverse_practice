var CryptoJS = require('crypto-js');

var token = '23y0ufFl5YxIyGrI8hWRUZmKkvtSjLQA',
    nonce = '123456789abcdefg',
    passid = 'zdww';


function get_headers_params(timestamp) {
    var zdwwsignature = CryptoJS.SHA256(timestamp + 'fTN2pfuisxTavbTuYVSsNJHetwq5bJvC' + 'QkjjtiLM2dCratiA' + timestamp)
        .toString(CryptoJS.enc.Hex)
        .toUpperCase();
    return {
        'x-wif-nonce': 'QkjjtiLM2dCratiA',
        'x-wif-paasid': 'smt-application',
        'x-wif-signature': zdwwsignature,
        'x-wif-timestamp': timestamp
    }
}

function generateAjaxParmas(params, timestamp) {
    return {
        paasHeader: passid,
        timestampHeader: timestamp,
        nonceHeader: nonce,
        signatureHeader: CryptoJS.SHA256(timestamp + token + nonce + timestamp)
            .toString(CryptoJS.enc.Hex)
            .toUpperCase()
    }
}
