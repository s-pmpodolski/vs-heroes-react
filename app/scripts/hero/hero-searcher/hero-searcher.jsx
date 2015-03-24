
'use strict';

var React = require('react');

var HeroSearchActions = require('./flux/hero-searcher-actions.js');
var _ = require('underscore');
var Input = require('../../common/input.jsx');
var mui = require('material-ui'),
FlatButton = mui.FlatButton;


var HeroImage = require('../../common/hero-image.jsx');

var HeroTitle = React.createClass({
    onClick: function() {
        console.log(this.props.parentId);
        HeroSearchActions.openSearch(this.props.parentId);
    },
    render: function() {
        return (
            <h1 className="mui-font-style-display-1 full-width" onClick={this.onClick}>
                {this.props.name}
            </h1>
        );
    }
});

var HeroInput = React.createClass({
    componentDidMount: function() {
        var _self = this;
        this.debounced = _.debounce(function() {
            _self.search();
        }, 500);
    },
    search: function() {
        var value = this.refs.input.refs.TextField.getValue();
        HeroSearchActions.searchHero(value, this.props.id);
    },
    onChange: function(e) {
        console.log(e);
        this.debounced();
    },
    render: function() {
        return (
          <Input type="text" hintText="Hero name"  defaultValue={this.props.name} onChange={this.onChange} ref="input"/>
        );
    }
});

var HeroDataActions = require('../hero-data/flux/hero-data-actions.js');

var HeroEntry = React.createClass({
    onClick: function() {
        HeroDataActions.loadHero(this.props.id, this.props.parentId, this.props.id);
        HeroSearchActions.closeSearch(this.props.parentId);
    },
    render: function() {
        var image = null;
        if(this.props.thumbnail !== undefined && this.props.thumbnail !== null) {
            image = (
                <HeroImage url={this.props.thumbnail.path} type={"standard_medium"} extension={this.props.thumbnail.extension} />
            );
        }
        return (
            <FlatButton onClick={this.onClick}>
                {image}
                <div className="hero-entry-text">
                    <h5>{this.props.name}</h5>
                </div>
            </FlatButton>
        );
    }
});

var HeroList = React.createClass({
   render: function() {
       var _self = this;
       var heroes = this.props.list.map(function(hero) {
           return (
             <HeroEntry thumbnail={hero.thumbnail} name={hero.name} id={hero.id} key={hero.id} parentId={_self.props.id}/>
           );
        });

       return (
           <div className="hero-dropdown-menu-wrapper">
             <div className="hero-dropdown-menu">
                {heroes}
             </div>
           </div>
       );
   }
});

var HeroSearchComponent = React.createClass({
   render: function() {
       return (
         <div>
             <HeroInput name={this.props.name} id={this.props.id}/>
             <HeroList list={this.props.list} id={this.props.id}/>
         </div>
       );
   }
});

var HeroSearcherStore = require('./flux/hero-searcher-store.js');

var HeroSearcher = React.createClass({

    getInitialState: function() {
        return HeroSearcherStore.getState(this.props.id);
    },

    componentDidMount: function() {
        HeroSearcherStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        HeroSearcherStore.removeChangeListener(this._onChange);
    },

    /**
     * Event handler for 'change' events coming from the HeroSearcherStore
     */
    _onChange: function() {
        console.log(HeroSearcherStore.getState(this.props.id), this.props.id);
        this.setState(HeroSearcherStore.getState(this.props.id));
    },

    render: function() {
        if (this.state.isSearchOpen) {
            return (
                <HeroSearchComponent name={this.state.name} list={this.state.list} id={this.props.id} />
            );
        }

        return (
            <HeroTitle name={this.state.name} parentId={this.props.id} />
        );
    }
});

module.exports = HeroSearcher;
