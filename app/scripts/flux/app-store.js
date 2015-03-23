var dispatcher = require('../dispatcher/dispatcher.js');
var constants = require('./app-constants.js');
var ActionTypes = constants.ActionTypes;
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var HeroDataStore = require('../hero/hero-data/flux/hero-data-store.js');

var CHANGE_EVENT = 'change';

var defaultValue = function() {
    this.left = 0;
    this.right = 0;
};

var AppStore = assign({}, EventEmitter.prototype, {
    _state: new defaultValue(),

    getState: function() {
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

    getCount: function(hero) {

        var counter = 0;
        if(hero === undefined) {
            console.log(counter);
            return counter;
        }

        if(hero.series !== undefined && hero.series.available !== undefined) {
            console.log(counter);
            counter += hero.series.available;
        }

        if(hero.stories !== undefined && hero.stories.available !== undefined) {
            console.log(counter);
            counter += hero.stories.available;
        }

        if(hero.events !== undefined && hero.events.available !== undefined) {
            console.log(counter);
            counter += hero.events.available;
        }

        if(hero.comics!== undefined && hero.comics.available !== undefined) {
            console.log(counter);
            counter += hero.comics.available;
        }

        console.log(counter);

        return counter;
    },

    compare: function(hero1, hero2) {
        var hero1Counter = this.getCount(hero1);
        var hero2Counter = this.getCount(hero2);

        if(hero1Counter > hero2Counter) {
            this._state.left += 1;
        } else if(hero1Counter < hero2Counter) {
            this._state.right += 1;
        }

        console.log(hero1Counter, hero2Counter, this._state);
    },

    compareHeroes: function() {
        var heroesData = HeroDataStore.getAll();

        for(var i = 0; i < heroesData.heroesNumber/2; i++) {
            this.compare(heroesData['left'+i].hero, heroesData['right'+i].hero);
        }
    }
});

AppStore.dispatchToken = dispatcher.register(function(action) {
    switch(action.type) {
        case ActionTypes.COMPARE_HEROES:
            AppStore.compareHeroes();
            AppStore.emitChange();
            break;

        default:
        // do nothing
    }

});


module.exports = AppStore;
