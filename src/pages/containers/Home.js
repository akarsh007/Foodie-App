import { connect } from 'react-redux'
import Home from '../Home'
const mapStateToProps = (state, ownProps) => {
return {}
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)

export default HomeContainer
