'use strict';

var React = require('react'),
    mui = require('material-ui');


var Counter = React.createClass({
    render: function() {
        return (
            <h1>Count: {this.props.count}</h1>
        );
    }
});

module.exports = Counter;
