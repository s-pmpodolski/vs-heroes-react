'use strict';

var React = require('react'),
    mui = require('material-ui'),
    TextField = mui.TextField;

var Input = React.createClass({
    render: function() {
        return (
            <TextField {...this.props} />
        );
    }
});

module.exports = Input;
