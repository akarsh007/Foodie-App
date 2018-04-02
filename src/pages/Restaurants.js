import React, {Component} from 'react'
import Header from '../components/common/HeaderContainer';
import RestaurantDetails from '../components/interface/RestaurantDetails';
class Accounts extends Component {

    constructor(props){
        super(props)
        this.state = {
            showRestaurantDetailModal: false,
            selectedRestaurant: {}
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
    }

    closeRestaurantDetailsModal = () => {
        this.setState({showRestaurantDetailModal: false})
    }

    showRestaurantDetails = (restaurantId) => {
        let selectedRestaurant = this.props.restaurantList.filter((restaurant) => restaurant.id === restaurantId)
        this.setState({selectedRestaurant}, () => this.setState({showRestaurantDetailModal: true}))
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
        let {restaurantList} =this.props
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
                <div className="container is-fluid gap-t-60">
                    <table className="table table-wrapper is-fullwidth">
                        <thead>
                        <tr>
                            <th className='w-40'>Restaurant Name</th>
                            <th className='w-40'>Cuisines</th>
                            <th className='w-40'>Locality</th>
                            <th className='w-25'>Rating</th>
                        </tr>
                        </thead>
                        <tbody>
                        {restaurantList && restaurantList.map(this.restaurantRow)}
                        </tbody>
                    </table>

                </div>
            </div>
        )}}
export default Accounts
