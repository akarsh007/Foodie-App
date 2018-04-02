import { connect } from 'react-redux'
import Header from './Header'


const mapStateToProps = (state, ownProps) => {

    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)

export default HeaderContainer;