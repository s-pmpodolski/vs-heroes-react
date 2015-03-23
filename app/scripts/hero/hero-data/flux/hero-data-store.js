var dispatcher = require('../../../dispatcher/dispatcher.js');
var constants = require('./hero-data-constants.js');
var ActionTypes = constants.ActionTypes;
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var rest = require('../../../common/marvel-rest.js');

var HeroSearchActions = require('../../hero-searcher/flux/hero-searcher-actions.js');

var CHANGE_EVENT = 'change';

var defaultValue = function() {
    this.hero = {
        name: '',
        description: '',
        thumbnail: {}
    };
};

var HeroDataStore = assign({}, EventEmitter.prototype, {
    _state: {},
    init: function() {
        this._state = {
            heroesNumber: 0
        };
    },

    getState: function(componentId) {
        if(this._state[componentId] === undefined) {
            this._state[componentId] = new defaultValue();
            this._state.heroesNumber += 1;
        }
        console.log(this._state);
        return this._state[componentId];
    },

    getAll: function() {
        return this._state;
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


    loadHero: function(id, componentId, callback) {
        var _self = this;

        console.log('loading hero', id);

        rest.character(id).get({
            apikey: '9a2b889d80597fe738ec3d075ebfa8b0'
        }).then(function(entity) {
            var data = entity.data();
            _self._state[componentId].hero = data.data.results[0];
            console.log(_self._state.hero);
            //set hero name inside searcher
            HeroSearchActions.setName(_self._state[componentId].hero.name, componentId);
            callback();
        }).catch(function(err) {
            console.log(err);
            console.log(err.getStack());
            callback();
        });
    }
});

HeroDataStore.init();

HeroDataStore.dispatchToken = dispatcher.register(function(action) {
    console.log(action.type);
    switch(action.type) {

        case ActionTypes.LOAD_HERO:
            HeroDataStore.loadHero(action.id, action.componentId, function(){
                HeroDataStore.emitChange();
            });
            break;


        default:
        // do nothing
    }

});


module.exports = HeroDataStore;
