'use strict';

var React = require('react'),
    mui = require('material-ui'),
    RaisedButton = mui.RaisedButton;


var RemoveButton = React.createClass({
    render: function() {
        return (
            <RaisedButton label="Remove --" primary={true} onClick={this.props.onClick} />
        );
    }
});

module.exports = RemoveButton ;
