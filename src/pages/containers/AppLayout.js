import { connect } from 'react-redux'
import AppLayout  from '../../AppLayout'
import {withRouter} from 'react-router-dom'


const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

const AppLayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppLayout)

export default withRouter(AppLayoutContainer)
