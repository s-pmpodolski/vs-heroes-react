var dispatcher = require('../../../dispatcher/dispatcher.js');
var constants = require('./hero-data-constants.js');
var ActionTypes = constants.ActionTypes;

var actions = {
    loadHero: function(id, componentId) {
        dispatcher.dispatch({
            type: ActionTypes.LOAD_HERO,
            id: id,
            componentId: componentId
        });
    }
};

module.exports = actions;
