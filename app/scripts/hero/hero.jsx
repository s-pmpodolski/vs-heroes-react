'use strict';

var React = require('react'),
    HeroContainer= require('./hero-components/hero-container.jsx'),
    HeroImage = require('./../common/hero-image.jsx'),
    HeroTopBar = require('./hero-components/hero-top-bar.jsx'),
    HeroSearcher = require('./hero-searcher/hero-searcher.jsx'),
    HeroData = require('./hero-data/hero-data.jsx');


var Hero = React.createClass({
    render: function() {
        return (
            <span>
                <HeroContainer>
                    <HeroTopBar>
                        <HeroSearcher id={this.props.id}/>
                    </HeroTopBar>
                </HeroContainer>
                <HeroData id={this.props.id} />
            </span>
        );
    }
});

module.exports = Hero;
