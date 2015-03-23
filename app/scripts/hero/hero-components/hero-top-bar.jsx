
'use strict';

var React = require('react');

var HeroTopBar = React.createClass({
    render: function() {
        return (
            <div className="hero-top-bar">
                {this.props.children}
            </div>
        );
    }
});

module.exports = HeroTopBar;
