'use strict';

var React = require('react');


var HeroImage = React.createClass({
    render: function() {
        return (
            <img src="http://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55.jpg" alt="..." className="hero-image" />
        );
    }
});

module.exports = HeroImage;
