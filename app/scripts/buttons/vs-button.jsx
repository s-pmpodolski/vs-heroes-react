'use strict';

var React = require('react'),
    mui = require('material-ui'),
    FloatingActionButton = mui.FloatingActionButton,
    Paper = mui.Paper;


var VsButton = React.createClass({
    render: function() {
        return (
            <span className="hero-vs-button-wrapper">
                <Paper zDepth={1}>
                    <h1 className="hero-vs-button" onClick={this.props.onClick}>
                        FIGHT!
                    </h1>
                </Paper>
            </span>
        );
    }
});

module.exports = VsButton;
