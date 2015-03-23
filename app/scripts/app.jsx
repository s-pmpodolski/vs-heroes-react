'use strict';

var React = window.React = require('react'),
    injectTapEventPlugin = require("react-tap-event-plugin"),
    Column = require('./column/column.jsx'),
    VsButton = require('./buttons/vs-button.jsx'),
    AddButton = require('./buttons/add-button.jsx'),
    RemoveButton = require('./buttons/remove-button.jsx'),
    Hero = require('./hero/hero.jsx'),
    Counter = require('./common/counter.jsx'),
    AppActions = require('./flux/app-actions'),
    AppStore = require('./flux/app-store');


injectTapEventPlugin();


var HeroesComparator = React.createClass({
    getInitialState: function() {
        return {
            numberOfHeroesPairs: 1,
            showButtons: true,
            appState: AppStore.getState()
        }
    },
    componentDidMount: function() {
        AppStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        AppStore.removeChangeListener(this._onChange);
    },

    /**
     * Event handler for 'change' events coming from the HeroSearcherStore
     */
    _onChange: function() {
        this.setState({
            appState: AppStore.getState()
        });
    },
    addPair: function() {
      this.setState({
          numberOfHeroesPairs: this.state.numberOfHeroesPairs+1
      });
    },
    removePair: function() {
        if(this.state.numberOfHeroesPairs > 1) {
            this.setState({
                numberOfHeroesPairs: this.state.numberOfHeroesPairs-1
            });
        }
    },
    fight: function() {
        AppActions.compareHeros();
        this.setState({
            showButtons: false
        });
    },
    render: function() {
        var left = [];
        var right = [];

        for(var i = 0; i < this.state.numberOfHeroesPairs; i++) {
            left.push(
                <Hero id={"left"+i} key={"left"+i} />
            );
            right.push(
                <Hero id={"right"+i} key={"right"+i} />
            );
        }

        var buttons = null;
        if(this.state.showButtons) {
            buttons = (
                <span>
                    <VsButton onClick={this.fight} />
                    <AddButton onClick={this.addPair}/>
                    <RemoveButton onClick={this.removePair}/>
                </span>
            );
        }

        return (
            <div className="app-container">
                <Column>
                    <Counter id={"left"} count={this.state.appState.left} />
                    {left}
                </Column>
                <Column>
                    {buttons}
                </Column>
                <Column>
                    <Counter id={"right"} count={this.state.appState.right} />
                    {right}
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
