var dispatcher = require('../../../dispatcher/dispatcher.js');
var constants = require('./hero-searcher-constants.js');
var ActionTypes = constants.ActionTypes;

var actions = {
    searchHero: function(name, id) {
        dispatcher.dispatch({
            type: ActionTypes.SEARCH_HERO,
            name: name,
            id: id
        });
    },

    openSearch: function(id) {
        dispatcher.dispatch({
            type: ActionTypes.OPEN_SEARCH,
            id: id
        });
    },

    closeSearch: function(id) {
        dispatcher.dispatch({
            type: ActionTypes.CLOSE_SEARCH,
            id: id
        });
    },

    setName: function(name, id) {
        dispatcher.dispatch({
            type: ActionTypes.SET_NAME,
            name: name,
            id: id
        });
    }
};

module.exports = actions;
