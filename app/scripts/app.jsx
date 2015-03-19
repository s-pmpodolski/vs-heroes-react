'use strict';

var React = window.React = require('react'),
    mui = require('material-ui'),
    injectTapEventPlugin = require("react-tap-event-plugin"),
    Column = require('./column/column.jsx'),
    VsButton = require('./vs-button/vs-button.jsx'),
    Hero = require('./hero/hero.jsx');

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin

injectTapEventPlugin();


var HeroesComparator = React.createClass({
    render: function() {
        return (
            <div className="app-container">
                <Column>
                    <Hero />
                </Column>
                <Column>
                    <VsButton />
                </Column>
                <Column>
                    <Hero />
                </Column>
            </div>
        );
    }
});

// Call React.createFactory instead of directly call ExampleApplication({...}) in React.render
var AppFactory = React.createFactory(HeroesComparator);

var container = document.getElementById('app');

React.render(
    AppFactory(),
    container
);
