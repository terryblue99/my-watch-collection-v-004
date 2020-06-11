import { useDispatch } from 'react-redux'
import { logOutAction } from "../../actions/currentUserActions.js"
import RedirectTo from '../../components/RedirectTo'

const LogOut = () => {
  const dispatch = useDispatch()
  dispatch(logOutAction())
  return RedirectTo('/home')
}

export default LogOut