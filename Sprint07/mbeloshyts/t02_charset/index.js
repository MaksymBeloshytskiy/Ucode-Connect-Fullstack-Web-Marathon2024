document.getElementById('changeCharset').addEventListener('click', function() {
    const inputString = document.getElementById('inputString').value;
    const charsetSelect = document.getElementById('charsets');
    const selectedCharsets = Array.from(charsetSelect.selectedOptions).map(option => option.value);

    document.getElementById('originalString').value = inputString;

    // Check if UTF-8 is selected
    if (selectedCharsets.includes('UTF-8')) {
        document.getElementById('utf8Output').value = inputString; // UTF-8 is native, no conversion needed
    }

    // Check if ISO-8859-1 is selected
    if (selectedCharsets.includes('ISO-8859-1')) {
        document.getElementById('isoOutput').value = convertToISO88591(inputString);
    }

    // Check if Windows-1252 is selected
    if (selectedCharsets.includes('Windows-1252')) {
        document.getElementById('windowsOutput').value = convertToWindows1252(inputString);
    }
});

document.getElementById('clear').addEventListener('click', function() {
    // Clear all input and output fields
    document.getElementById('inputString').value = '';
    document.getElementById('originalString').value = '';
    document.getElementById('utf8Output').value = '';
    document.getElementById('isoOutput').value = '';
    document.getElementById('windowsOutput').value = '';
});

function convertToISO88591(str) {
    // Conversion to ISO-8859-1
    return unescape(encodeURIComponent(str));
}

function convertToWindows1252(str) {
    // Conversion to Windows-1252
    const windows1252Map = {
        '€': '\x80', '‚': '\x82', 'ƒ': '\x83', '„': '\x84', '…': '\x85', '†': '\x86', '‡': '\x87',
        'ˆ': '\x88', '‰': '\x89', 'Š': '\x8A', '‹': '\x8B', 'Œ': '\x8C', 'Ž': '\x8E', '‘': '\x91',
        '’': '\x92', '“': '\x93', '”': '\x94', '•': '\x95', '–': '\x96', '—': '\x97', '˜': '\x98',
        '™': '\x99', 'š': '\x9A', '›': '\x9B', 'œ': '\x9C', 'ž': '\x9E', 'Ÿ': '\x9F'
    };
    return str.replace(/[€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ]/g, match => windows1252Map[match] || match);
}
