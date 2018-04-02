import React, {Component} from 'react'
import Header from '../components/common/HeaderContainer';
import RestaurantDetails from '../components/interface/RestaurantDetails';
class Accounts extends Component {

    constructor(props){
        super(props)
        this.state = {
            showRestaurantDetailModal: false,
            selectedRestaurant: {},
            restaurantList: [],
            filterValue : 0,
            sortAscending : false
        }
    }

    componentDidMount() {
        if (this.props.otherValues) {
            if (this.props.otherValues.type === 'category')
                this.props.getCategoryRestaurants(this.props.otherValues, this.props.cityId)
            else if (this.props.otherValues.type === 'cuisine')
                this.props.getCuisineRestaurants(this.props.otherValues, this.props.cityId)
            else
                this.props.getLocalityRestaurants(this.props.otherValues, this.props.cityId)

        }

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.restaurantList && nextProps.restaurantList.length)
            this.setState({restaurantList: nextProps.restaurantList})
    }

    closeRestaurantDetailsModal = () => {
        this.setState({showRestaurantDetailModal: false})
    }

    showRestaurantDetails = (restaurantId) => {
        let selectedRestaurant = this.props.restaurantList.filter((restaurant) => restaurant.id === restaurantId)
        this.setState({selectedRestaurant}, () => this.setState({showRestaurantDetailModal: true}))
    }

    sortByRating = () => {
        if(this.state.restaurantList) {
            let restaurantList = [...this.state.restaurantList]
            let sortAscending = this.state.sortAscending
            this.sortArrOfObjects(restaurantList, 'rating')
            this.setState({restaurantList: (sortAscending ? restaurantList.reverse() : restaurantList), sortAscending: !sortAscending})
        }
    }

    sortArrOfObjects = (arr, key) =>{
        arr.sort(function (a, b) {
            return b[key] - a[key]
        })
    }

    handleFilterOptionChange = (event) => {
        this.setState({filterValue: event.target.value})
        if(this.props.restaurantList)
            this.setState({restaurantList: this.props.restaurantList.filter((restaurant) => restaurant.rating >= event.target.value)})

    }

    restaurantRow = (restaurant, index) => {
        return (
            <tr key={restaurant.id} onClick={() => this.showRestaurantDetails(restaurant.id)} style={{cursor:'pointer'}}>
                <td>
                    <ul className="list is-inline">
                        <li><span className="restaurant-name">{restaurant.name}</span></li>
                    </ul>
                </td>
                <td>
                    <ul className="list is-inline">
                        <li>
                            <span className="restaurant-name">{restaurant.cuisines}</span>
                        </li>
                    </ul>
                </td>
                <td>
                    <ul className="list is-inline">
                        <li>
                            <span className="restaurant-name">{restaurant.locality}</span>
                        </li>
                    </ul>
                </td>

                <td>
                    <ul className="list is-inline">
                        <li>
                            <span className="restaurant-name">{restaurant.rating}</span>
                        </li>
                    </ul>
                </td>
            </tr>
        );
    };

    render() {
        let restaurantList =this.state.restaurantList
        return (
            <div className="home-landing">
                <Header>
                    <div className='hero is-small is-info'>
                        <div className= 'hero-body'>
                            <div className="container is-fluid">
                                <h1 className="title">
                                    List of Restaurants
                                </h1>
                            </div>
                        </div>
                    </div>
                </Header>
                <br/>
                {this.state.showRestaurantDetailModal &&
                <RestaurantDetails
                    active={this.state.showRestaurantDetailModal}
                    restaurant = {this.state.selectedRestaurant[0]}
                    closeRestaurantDetailsModal={this.closeRestaurantDetailsModal}
                />}
                <div className="container is-fluid ">
                    <div className='is-pulled-right'>
                        <div style={{color: '#9b9b9b'}}>
                            Filter by Rating &nbsp;
                            <select value={this.state.filterValue} onChange={this.handleFilterOptionChange}>
                                <option value={0}>Show All</option>
                                <option value={4}>Above 4</option>
                                <option value={3}>Above 3</option>
                                <option value={2}>Above 2</option>
                            </select>
                        </div>
                    </div>
                    <table className="table table-wrapper is-fullwidth ">
                        <thead>
                        <tr>
                            <th className='w-40'>Restaurant Name</th>
                            <th className='w-40'>Cuisines</th>
                            <th className='w-40'>Locality</th>
                            <th className='w-25 clickable' onClick={() => {this.sortByRating()}}>Rating</th>
                        </tr>
                        </thead>
                        <tbody>
                        {restaurantList && restaurantList.length ?
                            restaurantList.map(this.restaurantRow)
                        :
                            <tr>
                                <td>
                                    <ul className="list is-inline">
                                        <li>
                                            <span className="restaurant-name">
                                                Sorry!! No Restaurant present.
                                            </span>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                        }
                        </tbody>
                    </table>

                </div>
            </div>
        )}}
export default Accounts
