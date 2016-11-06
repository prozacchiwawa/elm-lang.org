var origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
window.addEventListener('message', function(msg) {
    if (msg.data.msg && msg.data.msg === 'elm-compiler') {
        console.log("compiler up");
    } else if (msg.data.msg && msg.data.msg === 'compile-code') {
        console.log('compiling code...');
        console.log(msg.data.source);
        window.compile(msg.data.source, function(result) {
            if (result.length && result[0] == '(') { // javascript
                console.log('compile done, passing on to '+frames[1].location.href);
                frames[1].postMessage({msg:'compiled', js:result}, origin);
            } else { // errors
                console.log('errors\n' + result);
                frames[1].postMessage({msg:'comperror', errors:result}, origin);
            }
        });
    }
});
