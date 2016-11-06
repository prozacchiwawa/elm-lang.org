window.addEventListener('message', function(msg) {
    console.log('got compiled code:', msg.data);
    if (msg.data.msg && msg.data.msg === 'compiled') {
        localStorage.setItem('code', msg.data.js);
        location.reload();
    }
});

(function() {
    function addScript(code) {
        var scriptParentElt = document.getElementById('code');
        if (!scriptParentElt) {
            return;
        }
        
        var scriptElt = document.createElement('script');
        var textNode = document.createTextNode(code);
        scriptElt.appendChild(textNode);
        scriptParentElt.appendChild(scriptElt);
    }

    var code = localStorage.getItem('code');
    if (code) {
        addScript(code);
    }

    addScript('var runningElmModule = Elm.Main.fullscreen();');
})();
