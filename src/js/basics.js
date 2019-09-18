
// Retrieve remote BrowserWindow
const {BrowserWindow} = require('electron').remote

function init() {
    // Minimize task
    document.getElementById("minimize").addEventListener("click", (e) => {
        var window = BrowserWindow.getFocusedWindow();
        window.minimize();
    });

    // Maximize window
    document.getElementById("maximize").addEventListener("click", (e) => {
        var window = BrowserWindow.getFocusedWindow();
        if(window.isMaximized()){
            window.unmaximize();
        }else{
            window.maximize();
        }
    });

    // Close app
    document.getElementById("close").addEventListener("click", (e) => {
        var window = BrowserWindow.getFocusedWindow();
        window.close();
    });

    //Change icon maximize-unmaximize
    //document.addEventListener("maximize")

};

document.onreadystatechange =  () => {
    if (document.readyState == "complete") {
        init();
    }
};
