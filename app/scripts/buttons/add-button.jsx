'use strict';

var React = require('react'),
    mui = require('material-ui'),
    RaisedButton = mui.RaisedButton;


var AddButton = React.createClass({
    render: function() {
        return (
            <RaisedButton label="Add ++" secondary={true} onClick={this.props.onClick}/>
        );
    }
});

module.exports = AddButton;
