import jsdom from "jsdom";

var doc = jsdom.jsdom('<!doctype html><html><body></body></html>', { url: 'http://localhost' });

var win = doc.defaultView;
global.document = doc;
global.window = win;

propagateToGlobal(win);

function propagateToGlobal(window) {
    for (let key in window) {
        if (!window.hasOwnProperty(key)) continue;
        if (key in global) continue;

        global[key] = window[key];
    }
}



function storageMock() {
    var storage = {};

    return {
        setItem: function(key, value) {
            storage[key] = value || '';
        },
        getItem: function(key) {
            return storage[key] || null;
        },  removeItem: function(key) {
            delete storage[key];
        }
    };
}
// mock the sessionStorage
global.sessionStorage = storageMock();