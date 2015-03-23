'use strict';

var restful = require('restful.js');

var endpoint = 'gateway.marvel.com';

var api = restful(endpoint).protocol('http').prefixUrl('v1/public');

var charactersCollection = api.all('characters');

var rest = {
    characters: charactersCollection,
    character: function(id) {
        return api.one('characters', id);
    }
};

module.exports = rest;
