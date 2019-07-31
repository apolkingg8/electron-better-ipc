'use strict';

function isElectron() {
    // Renderer process
    if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
        return true;
    }

    // Main process
    if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
        return true;
    }

    // Detect the user agent when the `nodeIntegration` option is set to true
    if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
        return true;
    }

    return false;
}


if(!isElectron()) {
	// build with node
	module.exports.ipcRenderer = require('./source/renderer');
} else if (process.type === 'renderer') {
	module.exports.ipcRenderer = require('./source/renderer');
} else {
	module.exports.ipcMain = require('./source/main');
}
