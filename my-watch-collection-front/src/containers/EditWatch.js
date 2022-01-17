import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import NavBar from './NavBar'
import { editWatchAction } from '../actions/watchesActions'
import RedirectTo from '../components/RedirectTo'
import RedirectToWithState from "../components/RedirectToWithState"
import DateValidation from "../components/DateValidation"

const EditWatch = (props) => {
   
     const watchRelated = useSelector(state => state.myWatches.watchRelated)
     const dispatch = useDispatch()
     const initialState = {
          id: props.location.state.watch.id,
          watch_maker: props.location.state.watch.watch_maker,
          watch_name: props.location.state.watch.watch_name,
          movement: props.location.state.watch.movement,
          complications: props.location.state.watch.complications,
          band: props.location.state.watch.band,
          model_number: props.location.state.watch.model_number,
          case_measurement: props.location.state.watch.case_measurement,
          water_resistance: props.location.state.watch.water_resistance,
          date_bought: props.location.state.watch.date_bought,
          date_last_worn: props.location.state.watch.date_last_worn,
          cost: props.location.state.watch.cost,
          notes: props.location.state.watch.notes,
          user_id: props.location.state.watch.user_id,
          image: null
     }
     const [stateData, setStateData] = useState(initialState)
     const [formInput, setFormInput] = useState({isFormInput: false})  
     const [backToDashboard, setBackToDashboard] = useState({isBackToDashboard: false})

     let {
          watch_maker: watch_related,
          watch_name: related_title,
          movement: related_input1,
          complications: related_input2,
          band: related_input3,
          model_number: related_input4,
          case_measurement: related_input5,
          water_resistance: related_input6
     } = stateData

     if (related_input1 === 'undefined') {
          related_input1 = ' '
     }
     if (related_input2 === 'undefined') {
          related_input2 = ' '
     }
     if (related_input3 === 'undefined') {
          related_input3 = ' '
     }
     if (related_input4 === 'undefined') {
          related_input4 = ' '
     }
     if (related_input5 === 'undefined') {
          related_input5 = ' '
     }
     if (related_input6 === 'undefined') {
          related_input6 = ' '
     }

     const setFormInputTrue = () => { 
          setFormInput(prevFormInput => {
               return {
               ...prevFormInput,
               isFormInput: true
               }
          })                            
     }
     
     const handleChange = (event) => {
          const {name, value} = event.target  
          setFormInputTrue()
          setStateData(prevStateData => {
               return ({
               ...prevStateData,
               [name]: value
               })    
          })                                 
     }
 
     const handleFile = (event) => {
          const {files} = event.target
          setFormInputTrue()
          setStateData(prevStateData => {
               return {
                    ...prevStateData,
                    image: files[0]
               }
          }) 
     }

     const handleSubmit = (event) => {
          event.preventDefault()

          let isWatchRelated = false
          if (stateData.watch_maker === watchRelated) {
               isWatchRelated = true
          } 
          if (formInput.isFormInput) {
               // validate the 'Date Bought/RCVD' input for watch records
               if (stateData.watch_maker && !isWatchRelated) {
                    const isValidDate = DateValidation(stateData.date_bought)
                    if (!isValidDate) {
                         alert('Date Bought/RCVD must be in format yyyy-mm-dd, yyyy-mm or yyyy and contain valid year, day & month numbers!')
                         return
                    }
               }
               if (stateData.watch_maker && stateData.date_last_worn && !isWatchRelated) {
                    const isValidDate = DateValidation(stateData.date_last_worn)
                    if (!isValidDate) {
                         alert('Date Last Worn must be in format yyyy-mm-dd, yyyy-mm or yyyy and contain valid year, day & month numbers!')
                         return
                    }
               }   
               // Edit the record
               const formData = new FormData()
               if (!isWatchRelated) {
                    formData.append('watch_maker', stateData.watch_maker)
                    formData.append('watch_name', stateData.watch_name)
                    formData.append('movement', stateData.movement)
                    formData.append('band', stateData.band)
                    formData.append('model_number', stateData.model_number)
                    formData.append('case_measurement', stateData.case_measurement)
                    formData.append('water_resistance', stateData.water_resistance)
                    formData.append('complications', stateData.complications)
                    formData.append('date_bought', stateData.date_bought)
                    formData.append('date_last_worn', stateData.date_last_worn)
                    formData.append('cost', stateData.cost)
                    formData.append('notes', stateData.notes)
                    formData.append('user_id', stateData.user_id)   
                    if (stateData.image) {
                         formData.append('image', stateData.image)
                    }
               } else {
                    formData.append('watch_related', watch_related)
                    formData.append('related_title', related_title)
                    formData.append('related_input1', related_input1)
                    formData.append('related_input2', related_input2)
                    formData.append('related_input3', related_input3)
                    formData.append('related_input4', related_input4)
                    formData.append('related_input5', related_input5)
                    formData.append('related_input6', related_input6)
                    formData.append('notes', stateData.notes)
                    formData.append('user_id', stateData.user_id)   
                    if (stateData.image) {
                         formData.append('image', stateData.image)
                    }
               }    
               dispatch(editWatchAction(formData, stateData.id))
               if (!isWatchRelated) {
                    alert('The watch has been edited')
               } else alert(`The ${watchRelated} has been edited`)
          } else {
               alert('Nothing has been edited!')
          }  
     }

     const handleBack = () => {
          setBackToDashboard(prevBackToDashboard => {
               return {
                    ...prevBackToDashboard,
                    isBackToDashboard: true
               }
          })
     }
 
     if (backToDashboard.isBackToDashboard && formInput.isFormInput) {

          setFormInput(prevFormInput => {
               return {
               ...prevFormInput,
               isFormInput: false
               }
          })  
          setBackToDashboard(prevBackToDashboard => {
               return {
                    ...prevBackToDashboard,
                    isBackToDashboard: false
               }
          })  
          return RedirectToWithState(
                                        '/dashboard',
                                        {
                                             isFromEditWatch: true,
                                             isEdits: true
                                        }
                                        )
               
     } 
     else if (backToDashboard.isBackToDashboard) {
          setBackToDashboard(prevBackToDashboard => {
               return {
                    ...prevBackToDashboard,
                    isBackToDashboard: false
               }
          })
          RedirectTo('/dashboard')
     }

     const watch = props.location.state.watch

     const isEditWatchRelated = props.location.state.isEditWatchRelated || false

     return ( 

          <div>
               <div>
                    <NavBar /> 
               </div> 

               <h1 className='WatchForm-header Dark-red-color Center-text'>
                    {!isEditWatchRelated
                         ? <>Edit this Watch</>
                         : <>Edit this Watch-Related</>
                    }
               </h1>

               <div className='container WatchForm-container'>
               
                    <button onClick={handleBack} className='btn Back-button Button-text'>Back to dashboard</button>
                    
                    <form className='EditWatch-Form'
                              onSubmit={handleSubmit}
                    >
                         {!isEditWatchRelated
                              ?    <> <label>Watch Maker</label>
                                        <input className='Input-element' required 
                                             type='text'
                                             name='watch_maker'
                                             defaultValue={watch.watch_maker}
                                             onChange={handleChange}/>
                                   </>
                              :    <> <input className='Input-element'
                                             type='hidden'
                                             name='watch_maker'
                                             value={watch_related}/>
                                   </>
                         }
                         <br />
                         {!isEditWatchRelated
                              ?    <> <label>Watch Name</label>
                                        <input className='Input-element' required 
                                             type='text'
                                             name='watch_name'
                                             defaultValue={watch.watch_name}
                                             onChange={handleChange}/>
                                   </>
                              :    <> <label>Title</label>
                                        <input className='Input-element' required
                                             autoComplete='off'
                                             type='text'
                                             name='watch_name'
                                             defaultValue={related_title}
                                             onChange={handleChange}/>
                                   </>
                         }
                         <br />
                         {!isEditWatchRelated
                              ?    <> <label>Movement</label>
                                        <input className='Input-element'
                                             type='text'
                                             name='movement'
                                             defaultValue={watch.movement}
                                             onChange={handleChange}/>
                                   </>
                              :    <> <input className='Input-element'
                                             autoComplete='off'
                                             type='text'
                                             name='movement'
                                             defaultValue={related_input1}
                                             onChange={handleChange}/>
                                   </>
                         }
                         <br />
                         {!isEditWatchRelated
                              ?    <> <label>Complications</label>
                                        <input className='Input-element'
                                             type='text'
                                             name='complications'
                                             defaultValue={watch.complications}
                                             onChange={handleChange}/>
                                   </>
                              :    <> <input className='Input-element'
                                             autoComplete='off'
                                             type='text'
                                             name='complications'
                                             defaultValue={related_input2}
                                             onChange={handleChange}/>
                                   </>
                         }
                         <br /> 
                         {!isEditWatchRelated
                              ?    <> <label>Band</label>
                                        <input className='Input-element'
                                             type='text'
                                             name='band'
                                             defaultValue={watch.band}
                                             onChange={handleChange}/>
                                   </>
                              :    <> <input className='Input-element'
                                             autoComplete='off'
                                             type='text'
                                             name='band'
                                             defaultValue={related_input3}
                                             onChange={handleChange}/>
                                   </>
                         }
                         <br />
                         {!isEditWatchRelated
                              ?    <> <label>Model Number</label>
                                        <input className='Input-element'
                                             type='text'
                                             name='model_number'
                                             defaultValue={watch.model_number}
                                             onChange={handleChange}/>
                                   </>
                              :    <> <input className='Input-element'
                                             autoComplete='off'
                                             type='text'
                                             name='model_number'
                                             defaultValue={related_input4}
                                             onChange={handleChange}/>
                                   </>
                         }
                         <br /> 
                         {!isEditWatchRelated
                              ?    <> <label>Case Measurement (e.g. 45mm)</label>
                                        <input className='Input-element'
                                             type='text'
                                             name='case_measurement'
                                             defaultValue={watch.case_measurement}
                                             onChange={handleChange}/>
                                   </>
                              :    <> <input className='Input-element'
                                             autoComplete='off'
                                             type='text'
                                             name='case_measurement'
                                             defaultValue={related_input5}
                                             onChange={handleChange}/>
                                   </>
                         }
                         <br />
                         {!isEditWatchRelated
                              ?    <> <label>Water Resistance (e.g. 200 meters)</label>
                                        <input className='Input-element'
                                             type='text'
                                             name='water_resistance'
                                             defaultValue={watch.water_resistance}
                                             onChange={handleChange}/>
                                   </>
                              :    <> <input className='Input-element'
                                             autoComplete='off'
                                             type='text'
                                             name='water_resistance'
                                             defaultValue={related_input6}
                                             onChange={handleChange}/>
                                   </>
                         }
                         <br />
                         {!isEditWatchRelated
                              ?    <> <label>Date Bought/RCVD (yyyy-mm-dd, yyyy-mm or yyyy)</label>
                                        <input className='Input-element' required
                                             type='text'
                                             name='date_bought'
                                             defaultValue={watch.date_bought}
                                             onChange={handleChange}/>
                                   </>
                              : null
                         }
                         <br />
                         {!isEditWatchRelated
                              ?    <> <label>Date Last Worn (blank, yyyy-mm-dd, yyyy-mm or yyyy)</label>
                                        <input className='Input-element'
                                             type='text'
                                             name='date_last_worn'
                                             defaultValue={watch.date_last_worn}
                                             onChange={handleChange}/>
                                   </>
                              : null
                         }
                         <br />
                         {!isEditWatchRelated
                              ?    <> <label>Cost (e.g. 199.99 | defaults to 0)</label>
                                        <input className='Input-element'
                                             type='number'
                                             step='0.01'
                                             min='0'
                                             name='cost'
                                             defaultValue={watch.cost}
                                             onChange={handleChange}
                                        />
                                        <br />
                                   </>
                              : null
                         }
                         <label>Notes</label>
                              <textarea className='Text-area'  
                                   name='notes'
                                   defaultValue={watch.notes}
                                   onChange={handleChange}
                              />
                         <br />
                         <b className='WatchForm-upload-text Dark-red-color Center-text'>
                              Upload image</b>
                         <input className='Input-element Choose-image'  
                                   type='file'
                                   name='image'
                                   onChange={handleFile}
                         />
                         <button className='btn Save-button Button-text' type='submit'>Save</button>
                    </form> 
               </div>
          </div>
     )
}

export default EditWatch