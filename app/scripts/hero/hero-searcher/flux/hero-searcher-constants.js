var keyMirror = require('keymirror');

var constants = {
    ActionTypes: keyMirror({
        SEARCH_HERO: null,
        OPEN_SEARCH: null,
        CLOSE_SEARCH: null,
        SET_NAME: null
    })
};

module.exports = constants;
