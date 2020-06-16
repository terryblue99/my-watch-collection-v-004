import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getWatchesAction } from '../actions/watchesActions'
import NavBar from './NavBar'
import Watches from '../components/Watches'

const DashBoard = (props) => {
    
    const location = useLocation()

    const currentUser = useSelector(state => state.currentUser)
    const watches = useSelector(state => state.myWatches.watches)
    const watchRelated = useSelector(state => state.myWatches.watchRelated)
    const dispatch = useDispatch()

    useEffect(() => {  
        if (!props.location.state || props.location.state.isEdits) {
            dispatch(getWatchesAction(currentUser.user.id)) 
        }   
    },[currentUser, dispatch, props.location.state])

    let isSearchSuccessful

    // Check if redirected from another screen
    if (props.location.state) {
        alert('location.state: ' + props.location.state.isFromWatchDetail)
        // Check if redirected to from a NavBar search
        if (location.state.isFromNavBar) {
            alert('location.state NavBar')
                if (location.state.isSearchSuccessful) {
                    isSearchSuccessful = location.state.isSearchSuccessful
                } else if (location.state.isSearchFailed) {
                    dispatch(getWatchesAction(currentUser.user.id, location.state.isSearchFailed))
                }
            }

        // Check if redirected to from WatchDetail and a record has been deleted
        else if (location.state.isFromWatchDetail &&
                    location.state.isWatchDeleted) {
                        alert('redirected to from WatchDetail and a record has been deleted')
                    dispatch(getWatchesAction(props.currentUser.user.id))
                    // Delete the history location state to prevent re-execution of this code
                    delete location.state
                    
                }
    }

    return (

        <div>
            <NavBar />
            <div className='container Main-container'> 
                <Watches watches={watches}
                         watchRelated={watchRelated}
                         isSearchSuccessful={isSearchSuccessful}
                         DashBoardSortHistory={props.history}
                />               
            </div> 
        </div>
        )
}

export default DashBoard