import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Image from 'react-image-enlarger'
import { deleteWatchAction } from '../actions/watchesActions'
import DashboardMain from './DashboardMain'
import RedirectTo from '../components/RedirectTo'
import RedirectToWithState from '../components/RedirectToWithState'

const WatchDetail = (props) => { 

    const [stateData, setStateData] = useState({isBackToDashboard: false, isWatchDeleted: false})
    const [zoomed, setZoomed] = React.useState(false)
    const isSort = useSelector(state => state.myWatches.isSort)
    const watchRelated = useSelector(state => state.myWatches.watchRelated) // For records that are not related to a specific watch.
    const isSearchFailed = useSelector(state => state.myWatches.isSearchFailed)
    const dispatch = useDispatch()

    const enlargeImage = (image) => {
        return (
            <Image className='Watch-image'
                style={{ width: '200px', height: 'auto' }}
                zoomed={zoomed}
                src={image}
                alt='enlarged watch image'
                onClick={() => setZoomed(true)}
                onRequestClose={() => setZoomed(false)}
            />
        )
    }

    const handleDelete = () => {

        let isWatchRelated
        let recordType

        if (props.currentWatch.watch_maker === watchRelated) {
            isWatchRelated = true
            recordType = watchRelated
        } else {
                isWatchRelated = false
                recordType = 'watch'
               }

        if (window.confirm(`Do you realy want to delete this ${recordType}?`)) {

            dispatch(deleteWatchAction(props.currentWatch.id))
            
            if (!isWatchRelated) {
                alert('The watch has been deleted!')
            } else alert(`The ${watchRelated} has been deleted!`)

            setStateData(prevStateData => {
                return {
                    ...prevStateData,
                    isBackToDashboard: true,
                    isWatchDeleted: true
                }
            })
        }
    }

    const handleBack = () => {
        setStateData(prevStateData => {
            return {
                ...prevStateData,
                isBackToDashboard: true
            }
        })
   }

    if (stateData.isBackToDashboard && stateData.isWatchDeleted) {
        setStateData(prevStateData => {
            return {
                ...prevStateData,
                isBackToDashboard: false,
                isWatchDeleted: false
            }
        })
        // Clear the current detail screen to allow 
        // the dashboard to be displayed there instead
        props.setCurrentWatch(null)
        return  RedirectToWithState(
                                        '/dashboard',
                                        {
                                            isFromWatchDetail: true,    
                                            isWatchDeleted: true
                                        } 
                                    )
    } 
    else if (stateData.isBackToDashboard) {
        setStateData(prevStateData => {
            return {
                ...prevStateData,
                isBackToDashboard: false
            }
        }) 
        // Clear the current detail screen to allow 
        // the dashboard to be displayed there instead
        props.setCurrentWatch(null) 
        RedirectTo('/dashboard')
    }

    const {currentWatch} = props
    
    if (currentWatch &&
        !isSearchFailed &&
        !isSort) 
    {
        const {
            id,
            watch_name,
            watch_maker,
            movement,
            complications,
            band,
            model_number,
            case_measurement,
            water_resistance,
            date_bought,
            date_last_worn,
            cost,
            notes
        } = currentWatch

        const {
            watch_maker: watch_related,
            watch_name: related_title,
            movement: related_input1,
            complications: related_input2,
            band: related_input3,
            model_number: related_input4,
            case_measurement: related_input5,
            water_resistance: related_input6
       } = currentWatch

        return ( 
            
            <div className='Watch-detail'>
                <div className='Back-button_and_Image'>    
                    <button onClick={handleBack} className='Watch-detail-back-button btn Button-text'>Back to dashboard</button>
                    <div className='Watch-detail-image'> 
                        {enlargeImage(currentWatch.image)}
                    </div>
                </div>
                <div className='Watch-detail-text'>
                    {watch_maker && !watch_maker.includes(watchRelated)
                        ? <h1 className='WatchDetail-watch-maker Dark-red-color'><b>{watch_maker}</b></h1>
                        : <h1 className='WatchDetail-watch-related Dark-red-color'><b>{watch_related}</b></h1> 
                    }
                    {watch_name && !watch_maker.includes(watchRelated)
                        ? <h2 className='Watch-name'>{watch_name}</h2>
                        : <h2 className='Watch-name'>{related_title}</h2>
                    }
                    <div className='Watch-detail-complications Center-text'>
                        {movement && !watch_maker.includes(watchRelated)
                            ?   <>  <p className='Detail-css'>Movement</p>
                                    <h3 className='WatchDetail'>{movement}</h3>
                                </>
                            :   null }
                        {related_input1 !== 'undefined' && watch_related.includes(watchRelated) 
                            ?   <>  <h3 className='WatchDetail'>{related_input1}</h3>
                                </>
                            :   null }
                        {complications && !watch_maker.includes(watchRelated)
                            ?   <>  <p className='Detail-css'>Complications</p>
                                    <h3 className='WatchDetail'>{complications}</h3>
                                </>
                            :   null }
                        {related_input2 !== 'undefined' && watch_related.includes(watchRelated) 
                            ?   <>  <h3 className='WatchDetail'>{related_input2}</h3>
                                </>
                            :   null }
                        {band && !watch_maker.includes(watchRelated)
                            ?   <>  <p className='Detail-css'>Band</p>
                                    <h3 className='WatchDetail'>{band}</h3>
                                </>
                            :   null }
                        {related_input3 !== 'undefined' && watch_related.includes(watchRelated) 
                            ?   <>  <h3 className='WatchDetail'>{related_input3}</h3>
                                </>
                            :   null }
                        {model_number && !watch_maker.includes(watchRelated)
                            ?   <>  <p className='Detail-css'>Model Number</p>
                                    <h3 className='WatchDetail'>{model_number}</h3>
                                </>
                            :   null }
                        {related_input4 !== 'undefined' && watch_related.includes(watchRelated) 
                            ?   <>  <h3 className='WatchDetail'>{related_input4}</h3>
                                </>
                            :   null }
                        {case_measurement && !watch_maker.includes(watchRelated)
                            ?   <>  <p className='Detail-css'>Case Measurement</p>
                                    <h3 className='WatchDetail'>{case_measurement}</h3>
                                </>
                            :   null }
                        {related_input5 !== 'undefined' && watch_related.includes(watchRelated) 
                            ?   <>  <h3 className='WatchDetail'>{related_input5}</h3>
                                </>
                            :   null }
                        {water_resistance && !watch_maker.includes(watchRelated)
                            ?   <>  <p className='Detail-css'>Water Resistance</p>
                                    <h3 className='WatchDetail'>{water_resistance}</h3>
                                </>
                            :   null }
                        {related_input6 !== 'undefined' && watch_related.includes(watchRelated) 
                            ?   <>  <h3 className='WatchDetail'>{related_input6}</h3>
                                </>
                            :   null }
                        {date_bought && !watch_maker.includes(watchRelated) 
                            ?   <>
                                    {cost > 0
                                        ? <> <p className='Detail-css'>Date Bought</p>
                                            <h3 className='WatchDetail'>{date_bought}</h3>
                                        </>
                                        : <> <p className='Detail-css'>Date RCVD</p>
                                            <h3 className='WatchDetail'>{date_bought}</h3>
                                        </>
                                    }    
                                </>
                            : null }
                        {date_last_worn && !watch_maker.includes(watchRelated) 
                            ?   <>     
                                    <p className='Detail-css'>Date Last Worn</p>
                                    <h3 className='WatchDetail'>{date_last_worn}</h3>      
                                </>
                            : null }
                        {cost > 0
                            ?    <>
                                    <p className='Detail-css'>Cost</p>
                                    <h3 className='WatchDetail'>{parseFloat(cost).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</h3>
                                </>
                            : null }
                        {notes 
                            ?    <>
                                    <p className='Detail-css'>Notes</p>
                                    <h3 className='TextDetail'>{notes}</h3>
                                </>
                            : null }
                    </div> 
                    <div className="Edit-Delete-buttons">
                        {!watch_maker.includes(watchRelated)
                            ? <>
                                <Link className='btn Edit-button Button-text Center-text' to={{
                                        pathname: `/watches/${id}/edit_watch`,
                                        state: {
                                            watch: currentWatch
                                        }
                                    }}>
                                        Edit
                                </Link>
                            </>
                            : <>
                                <Link className='btn Edit-button Button-text Center-text' to={{
                                        pathname: `/watches/${id}/edit_watch_related`,
                                        state: {
                                            watch: currentWatch,
                                            isEditWatchRelated: true
                                        }
                                    }}>
                                        Edit
                                </Link>
                            </>
                        }
                        <button className='btn Delete-button Button-text Center-text' onClick={handleDelete}> 
                            Delete
                        </button>
                    </div>    
                </div>
            </div> 
        )     
    } else {
    
        return <DashboardMain   newestWatch={props.newestWatch}
                                oldestWatch={props.oldestWatch}
                                setCurrentWatch={props.setCurrentWatch}
                                sortOptionSelected={props.sortOptionSelected}
                                DashBoardHistory={props.DashBoardHistory}              
        />
    }
}

export default WatchDetail