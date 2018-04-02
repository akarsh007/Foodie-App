import React, {Component} from 'react';
import 'react-select/dist/react-select.css';
import { Async } from 'react-select';
import RestaurantDetails from './RestaurantDetails';

class CustomOption extends Component {

    constructor(props){
        super(props)
    }

    handleMouseDown = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.props.onSelect(this.props.option, event);
    }

    handleMouseEnter = (event) => {
        this.props.onFocus(this.props.option, event);
    }

    handleMouseMove = (event) => {
        if (this.props.isFocused) return;
        this.props.onFocus(this.props.option, event);
    }

    render () {
        return (
            <div>
                    {this.props.option.type ?
                        <div className={this.props.className}
                             onMouseDown={this.handleMouseDown}
                             onMouseEnter={this.handleMouseEnter}
                             onMouseMove={this.handleMouseMove}
                        >
                                <span>{this.props.children}</span>
                                <br/>
                                <span>Type: {this.props.option.type}</span>
                        </div>
                        :
                        <div className={this.props.className}
                             onMouseDown={this.handleMouseDown}
                             onMouseEnter={this.handleMouseEnter}
                             onMouseMove={this.handleMouseMove}
                             >
                            <div>{this.props.children}</div>
                            <div>{`Rating: ${this.props.option.rating}`}</div>
                            <div>{`Cuisines: ${this.props.option.cuisines}`}</div>
                            <div>{`Locality: ${this.props.option.locality}`}</div>
                    </div>}
            </div>
        );
    }
};

class HomeModal extends Component {

    constructor(props){
        super(props)
        this.state = {
            cityValue: '',
            restaurantValue: '',
            otherValues: '',
            options: [],
            enableSearch: false,
            showRestaurantDetailModal: false
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        //this.setState({options: nextProps.cityList})
    }

    componentDidUpdate(prevProps){
        if(!prevProps.active && this.props.active) {
            this.refs.accName.focus();
        }
    }

    getCityOptions = (input, callback) => {
        const { getCities } = this.props
        if(input && input.length>1) {
            getCities(input, (arr) => {callback(null, {
                options: arr
                });
            })
        }
    }

    getRestaurantOptions = (input, callback) => {
        const { getCityRestaurants } = this.props
        if(input && input.length>1) {
            getCityRestaurants(input, this.state.cityValue.id, (arr) => {callback(null, {
                options: arr
                });
            })
        }
    }
    getOtherOptions = (input, callback) => {
        const { getOtherValues } = this.props
        if(input && input.length>1) {
            getOtherValues(input, this.state.cityValue.id, (arr) => {callback(null, {
                options: arr
                });
            })
        }
    }

    handleCityChange = (cityValue) => {
        this.setState({ cityValue, enableSearch: true });
        console.log(`Selected: ${cityValue.id}`);
    }

    handleRestaurantChange = (restaurantValue) => {
        this.setState({ restaurantValue, showRestaurantDetailModal: true});

        console.log(`Selected: ${restaurantValue.id}`);
    }

    handleOtherValueChange = (otherValues) => {
        this.setState({ otherValues});
                console.log("Selected:", otherValues);
                this.props.history.push('/restaurants')
                this.props.setOtherValues(otherValues, this.state.cityValue)
    }

    closeRestaurantDetailsModal = () => {
        this.setState({showRestaurantDetailModal: false})
    }

    render(){

        let activeClass = this.state.showRestaurantDetailModal ? '' : 'is-active';
        return (
            <div>
                <RestaurantDetails
                    active={this.state.showRestaurantDetailModal}
                    restaurant = {this.state.restaurantValue}
                    closeRestaurantDetailsModal={this.closeRestaurantDetailsModal}
                />
            <div className={"modal " + activeClass}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="box">
                        <div className="is-clearfix modal-header">
                            <span className="title">Welcome to the Foodie app!!</span>
                        </div>

                        <div className="field columns is-horizontal">
                            <div className="field-label is-normal column is-3">
                                <label className="label" style={{marginTop: '10px'}}>City</label>
                            </div>
                            <div className="field-body column is-8">
                                <div className="field">
                                    <div className="control">
                                        <div className=" is-fullwidth">
                                            <Async
                                                name="form-field-name"
                                                loadOptions={this.getCityOptions}
                                                value={this.state.cityValue}
                                                onChange={this.handleCityChange}
                                                valueKey="id"
                                                labelKey="name"
                                                placeholder='Enter City Name'
                                            />
                                            </div>
                                        <div></div><br/><br/>
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {this.state.enableSearch &&
                        <div className="field columns is-horizontal">
                            <div className="field-label is-normal column is-3">
                                <label className="label">Search Restaurant</label>
                            </div>
                            <div className="field-body column is-8">
                                <div className="field">
                                    <div className="control">
                                        <div className=" is-fullwidth">
                                            <Async
                                                name="form-field-name"
                                                loadOptions={this.getRestaurantOptions}
                                                optionComponent={CustomOption}
                                                value={this.state.restaurantValue}
                                                onChange={this.handleRestaurantChange}
                                                valueKey="id"
                                                labelKey="name"
                                            />
                                        </div>
                                        <div></div><br/><br/>
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </div>}

                        {this.state.enableSearch &&
                        <div className="field columns is-horizontal">
                            <div className="field-label is-normal column is-3">
                                <label className="label">Search Category, Cuisine type and Locality</label>
                            </div>
                            <div className="field-body column is-8">
                                <div className="field">
                                    <div className="control">
                                        <div className=" is-fullwidth">
                                            <Async
                                                name="form-field-name"
                                                loadOptions={this.getOtherOptions}
                                                optionComponent={CustomOption}
                                                value={this.state.otherValue}
                                                onChange={this.handleOtherValueChange}
                                                valueKey="id"
                                                labelKey="name"
                                            />
                                        </div>
                                        <div></div><br/><br/>
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </div>}

                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default HomeModal