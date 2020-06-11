import { Component } from 'react'
import { connect } from 'react-redux'
import { logOutAction } from "../../actions/currentUserActions.js"
import RedirectTo from '../../components/RedirectTo'

class LogOut extends Component {
  
  render() {
    this.props.logOutAction()
    return RedirectTo('/home')
  } 
}

export default connect(null, { logOutAction })(LogOut)