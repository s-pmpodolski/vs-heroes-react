var dispatcher = require('../dispatcher/dispatcher.js');
var constants = require('./app-constants.js');
var ActionTypes = constants.ActionTypes;

var actions = {
    compareHeros: function() {
        dispatcher.dispatch({
            type: ActionTypes.COMPARE_HEROES
        });
    }
};

module.exports = actions;
