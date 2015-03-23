'use strict';

var React = require('react');
var cx = React.addons.classSet;


var HeroImage = React.createClass({
    render: function() {
        if(this.props.url === undefined) {
            return null;
        }

        var className = {
            "hero-image": this.props.className === undefined
        };

        if(this.props.className !== undefined) {
            className[this.props.className] = true;
        }

        className = cx(className);

        return (
            <img src={this.props.url + "/" + this.props.type + "." + this.props.extension} alt="..." className={className} />
        );
    }
});

module.exports = HeroImage;
