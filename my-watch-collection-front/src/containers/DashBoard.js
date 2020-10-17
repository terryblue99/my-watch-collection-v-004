import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getWatchesAction } from '../actions/watchesActions'
import NavBar from './NavBar'
import Watches from '../components/Watches'

const DashBoard = (props) => {
    const currentUser = useSelector(state => state.currentUser)
    const watches = useSelector(state => state.myWatches.watches)
    const watchRelated = useSelector(state => state.myWatches.watchRelated)
    const sortDefaultText = useSelector(state => state.myWatches.sortDefaultText)
    const dispatch = useDispatch()
    let sortOptionSelected = sortDefaultText
    
    useEffect(() => {
        dispatch(getWatchesAction(currentUser.user.id))    
    },[dispatch, currentUser.user.id])

    // Check if redirected from another screen
    if (props.location.state) {
        // Check if redirected to from WatchDetail and a record has been edited
        if (props.location.state.isFromWatchDetail &&
                    props.location.state.isEdits) {
                    dispatch(getWatchesAction(currentUser.user.id))
                    // Delete the history location state to prevent re-execution of this code
                    delete props.history.location.state   
                }
        // Check if redirected to from WatchDetail and a record has been deleted
        else if (props.location.state.isFromWatchDetail &&
                    props.location.state.isWatchDeleted) {
                    dispatch(getWatchesAction(currentUser.user.id))
                    // Delete the history location state to prevent re-execution of this code
                    delete props.history.location.state   
        }
    }
    
    return (

        <div>
            <NavBar />
            <div className='container Main-container'>
                <Watches watches={watches}
                         watchRelated={watchRelated}
                         sortOptionSelected={sortOptionSelected}
                         DashBoardHistory={props.history}
                />               
            </div> 
        </div>
        )
}

export default DashBoard