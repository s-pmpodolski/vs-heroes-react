'use strict';

var React = require('react'),
    mui = require('material-ui'),
    Paper = mui.Paper;


var HeroContainer = React.createClass({
    render: function() {
        return (
            <Paper zDepth={1}>
                {this.props.children}
            </Paper>
        );
    }
});

module.exports = HeroContainer;
