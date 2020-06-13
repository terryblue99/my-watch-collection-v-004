import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getWatchesAction } from '../actions/watchesActions'
import NavBar from './NavBar'
import Watches from '../components/Watches'

const DashBoard = (props) => {
    
    const currentUser = useSelector(state => state.currentUser)
    const watches = useSelector(state => state.myWatches.watches)
    const watchRelated = useSelector(state => state.myWatches.watchRelated)
    const dispatch = useDispatch()

    useEffect(() => {  
        if (!props.location.state || props.location.state.isEdits) {
            dispatch(getWatchesAction(currentUser.user.id)) 
        }   
    })

    let sortOptionSelected = 'Select a sort option...'
    let isSearchSuccessful

    // Check if redirected from another screen
    if (props.location.state) {

        // Check if redirected to from a NavBar search
        if (props.location.state.isFromNavBar) {
                if (props.location.state.isSearchSuccessful) {
                    isSearchSuccessful = props.location.state.isSearchSuccessful
                } else if (props.location.state.isSearchFailed) {
                    dispatch(getWatchesAction(currentUser.user.id, props.location.state.isSearchFailed))
                }
            }

        // Check if redirected to from WatchDetail and a record has been deleted
        else if (props.location.state.isFromWatchDetail &&
                    props.location.state.isWatchDeleted) {
                    dispatch(getWatchesAction(props.currentUser.user.id))
                    // Delete the history location state to prevent re-execution of this code
                    delete props.history.location.state
                    
                }

        // Check if redirected to from DashboardMain and a sort has been selected
        else if (props.location.state.isFromDashboardMain &&
                    props.location.state.sortOptionSelected) {
                    sortOptionSelected = props.location.state.sortOptionSelected
                }
    }

    return (

        <div>
            <NavBar />
            <div className='container Main-container'> 
                <Watches watches={watches}
                         watchRelated={watchRelated}
                         sortOptionSelected={sortOptionSelected}
                         isSearchSuccessful={isSearchSuccessful}
                         DashBoardSortHistory={props.history}
                />               
            </div> 
        </div>
        )
}

export default DashBoard