var HeroDataStore = require('./flux/hero-data-store.js');
var HeroImage = require('../../common/hero-image.jsx');

var HeroDescription = React.createClass({
    render: function() {
        return (
            <div className="card-content">
                <p>{this.props.description}</p>
            </div>
        );
    }
});

var HeroStat = React.createClass({
    render: function() {
        var length = 0;
        if(this.props.data !== undefined && this.props.data.items != undefined) {
            length = this.props.data.available;
        } else {
            return null;
        }
        return (
             <li className="collection-item">
                 <div>
                    {this.props.name} <div className="secondary-content">{length}</div>
                 </div>
             </li>
        );
    }
});

var HeroStats = React.createClass({
   render: function() {
        return (
            <div className="card-action">
                <ul className="collection with-header">
                    <HeroStat data={this.props.comics} name={"Comics"} />
                    <HeroStat data={this.props.stories} name={"Stories"} />
                    <HeroStat data={this.props.events} name={"Events"} />
                    <HeroStat data={this.props.series} name={"Series"} />
                </ul>
            </div>
        );
   }
});

var HeroData = React.createClass({

    getInitialState: function() {
        return HeroDataStore.getState(this.props.id);
    },

    componentDidMount: function() {
        HeroDataStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        HeroDataStore.removeChangeListener(this._onChange);
    },

    /**
     * Event handler for 'change' events coming from the HeroSearcherStore
     */
    _onChange: function() {
        this.setState(HeroDataStore.getState(this.props.id));
    },

    render: function() {
        return (
            <div className="card">
                <div className="card-image">
                    <HeroImage className="hero-data-image" url={this.state.hero.thumbnail.path} type={"landscape_incredible"} extension={this.state.hero.thumbnail.extension} />
                    <span className="card-title">{this.state.hero.name}</span>
                </div>
                <HeroDescription description={this.state.hero.description} />
                <HeroStats comics={this.state.hero.comics} stories={this.state.hero.stories} events={this.props.events} series={this.state.hero.series} />
            </div>
        );
    }
});

module.exports = HeroData;
