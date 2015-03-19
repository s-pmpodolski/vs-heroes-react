'use strict';

var React = require('react'),
    HeroContainer= require('./hero-components/hero-container.jsx'),
    HeroImage = require('./hero-components/hero-image.jsx');


var Hero = React.createClass({
    render: function() {
        return (
            <HeroContainer>
                <HeroImage />
            </HeroContainer>
        );
    }
});

module.exports = Hero;
