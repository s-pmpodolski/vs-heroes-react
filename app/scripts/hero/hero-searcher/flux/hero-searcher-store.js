var dispatcher = require('../../../dispatcher/dispatcher.js');
var constants = require('./hero-searcher-constants.js');
var ActionTypes = constants.ActionTypes;
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var rest = require('../../../common/marvel-rest.js');

var CHANGE_EVENT = 'change';

var defaultValue = function() {
    this.isSearchOpen = false;
    this.name = '';
    this.list = [];
};

var HeroSearchStore = assign({}, EventEmitter.prototype, {
    _state: {},

    getState: function(id) {
        if(this._state[id] === undefined) {
            this._state[id] = new defaultValue();
        }
        return this._state[id];
    },

    getList: function(id) {
      return this._state[id].list;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    openSearch: function(id) {
        this._state[id].isSearchOpen = true;
    },

    closeSearch: function(id) {
        this._state[id].isSearchOpen = false;
    },

    setName: function(name, id) {
        this._state[id].name = name;
    },

    searchHero: function(name, id, callback) {
        console.log(this._state, id);
        this._state[id].name = name;

        var _self = this;

        rest.characters().getAll({
            nameStartsWith: name,
            limit: 100,
            apikey: '9a2b889d80597fe738ec3d075ebfa8b0'
        }).then(function(data) {
            _self._state[id].list = data.data.data.results;
            callback();
        }).catch(function(err) {
            console.log(err);
            callback();
        });
    }
});

HeroSearchStore.dispatchToken = dispatcher.register(function(action) {

    switch(action.type) {

        case ActionTypes.SEARCH_HERO:
            HeroSearchStore.searchHero(action.name, action.id, function(){
                HeroSearchStore.emitChange();
            });
            break;

        case ActionTypes.OPEN_SEARCH:
            HeroSearchStore.openSearch(action.id);
            HeroSearchStore.emitChange();
            break;

        case ActionTypes.CLOSE_SEARCH:
            HeroSearchStore.closeSearch(action.id);
            HeroSearchStore.emitChange();
            break;

        case ActionTypes.SET_NAME:
            HeroSearchStore.setName(action.name, action.id);
            HeroSearchStore.emitChange();
            break;

        default:
        // do nothing
    }

});


module.exports = HeroSearchStore;
