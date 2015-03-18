'use strict';

var React = window.React = require('react'),
    mui = require('material-ui'),
    RaisedButton = mui.RaisedButton,
    injectTapEventPlugin = require("react-tap-event-plugin");;

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin

injectTapEventPlugin();


var App = React.createClass({
    render: function() {
        var elapsed = Math.round(this.props.elapsed  / 100);
        var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' );
        var message =
            'React has been successfully running for ' + seconds + ' seconds. Awesome!';

        return (
            <p>
                {message}
                <RaisedButton label="Default" />
            </p>
        );
    }
});

// Call React.createFactory instead of directly call ExampleApplication({...}) in React.render
var AppFactory = React.createFactory(App);

var start = new Date().getTime();
setInterval(function() {
    React.render(
        AppFactory({elapsed: new Date().getTime() - start}),
        document.getElementById('app')
    );
}, 50);
