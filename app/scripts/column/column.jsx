'use strict';

var React = require('react');

var Column = React.createClass({
    render: function() {
        return (
            <div className="col-md-4">
                {this.props.children}
            </div>
        );
    }
});

module.exports = Column;
