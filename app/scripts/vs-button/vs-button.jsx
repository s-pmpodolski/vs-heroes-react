'use strict';

var React = require('react'),
    mui = require('material-ui'),
    FloatingActionButton = mui.FloatingActionButton;


var VsButton = React.createClass({
    render: function() {
        return (
            <FloatingActionButton className="hero-vs-button">
                VS
            </FloatingActionButton>
        );
    }
});

module.exports = VsButton;
