import React from 'react'
import { connect } from 'react-redux'
import NavBar from './NavBar'
import { editWatchAction } from '../actions/watchesActions'
import RedirectTo from '../components/RedirectTo'
import RedirectToWithState from "../components/RedirectToWithState"
import DateValidation from "../components/DateValidation"

class EditWatch extends React.Component {
     
     state = {
       watchData: {
          id: this.props.location.state.watch.id,
          watch_maker: this.props.location.state.watch.watch_maker,
          watch_name: this.props.location.state.watch.watch_name,
          movement: this.props.location.state.watch.movement,
          complications: this.props.location.state.watch.complications,
          band: this.props.location.state.watch.band,
          model_number: this.props.location.state.watch.model_number,
          case_measurement: this.props.location.state.watch.case_measurement,
          water_resistance: this.props.location.state.watch.water_resistance,
          date_bought: this.props.location.state.watch.date_bought,
          cost: this.props.location.state.watch.cost,
          notes: this.props.location.state.watch.notes,
          user_id: this.props.location.state.watch.user_id
       },
       image: null,
       isBackToDashboard: false,
       isFormInput: false
     }

     handleChange = (event) => {
        this.setState({
          watchData: {
               ...this.state.watchData,
               [event.target.name]: event.target.value
           },
           isFormInput: true
        })                         
     }

     handleFile = (event) => {
          this.setState({
               image: event.target.files[0],
               isFormInput: true
          }) 
     }

     handleSubmit = (event) => {
          event.preventDefault()

          const { watchData: {
                    id,
                    watch_maker,
                    watch_name,
                    movement,
                    band,
                    model_number,
                    case_measurement,
                    water_resistance,
                    complications,
                    date_bought,
                    cost,
                    notes,
                    user_id 
                  }
          } = this.state

          let isWatchRelated = false
          if (watch_maker === this.props.watchRelated) {
               isWatchRelated = true
          } 
          if (this.state.isFormInput) {
               // validate the 'Date Bought/RCVD' input for watch records
               if (watch_maker && !isWatchRelated) {
                    const isValidDate = DateValidation(date_bought)
                    if (!isValidDate) {
                         alert('Date Bought/RCVD must be in format yyyy-mm-dd, yyyy-mm or yyyy and contain valid day & month numbers!')
                         return
                    }
               }    
               // Edit the record
               const formData = new FormData()
               formData.append('watch_maker', watch_maker)
               formData.append('watch_name', watch_name)
               formData.append('movement', movement)
               formData.append('band', band)
               formData.append('model_number', model_number)
               formData.append('case_measurement', case_measurement)
               formData.append('water_resistance', water_resistance)
               formData.append('complications', complications)
               formData.append('date_bought', date_bought)
               formData.append('cost', cost)
               formData.append('notes', notes)
               formData.append('user_id', user_id)   
               if (this.state.image) {
                    formData.append('image', this.state.image)
               }
               this.props.editWatchAction(formData, id)
               if (!isWatchRelated) {
                    alert('The watch has been edited')
               } else alert(`The ${this.props.watchRelated} has been edited`)
          } else {
               alert('Nothing has been edited!')
          }  
     }

     handleBack = () => {
          this.setState({
               isBackToDashboard: true
          })
     }

     render() {
 
          if (this.state.isBackToDashboard && this.state.isFormInput) {
               this.setState({
                    isFormInput: false,
                    isBackToDashboard: false
               })  
               return RedirectToWithState(
                                             '/dashboard',
                                             {
                                                  isFromEditWatch: true,
                                                  isEdits: true
                                             }
                                         )
                    
          } 
          else if (this.state.isBackToDashboard) {
                    this.setState({
                         isBackToDashboard: false
                    }) 
                    return RedirectTo('/dashboard')
          }

          const watch = this.props.location.state.watch

          const isEditWatchRelated = this.props.location.state.isEditWatchRelated || false

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
                    
                         <button onClick={this.handleBack} className='btn Back-button Button-text'>Back to dashboard</button>
                         
                         <form className='EditWatch-Form'
                               onSubmit={this.handleSubmit}
                         >
                              {!isEditWatchRelated
                                   ?    <> <label>Watch Maker</label>
                                           <input className='Input-element' required 
                                                  type='text'
                                                  name='watch_maker'
                                                  defaultValue={watch.watch_maker}
                                                  onChange={this.handleChange}/>
                                        </>
                                   :    <> <input className='Input-element Dark-red-color'
                                                  type='text'
                                                  name='watch_maker'
                                                  value={this.props.watchRelated}/>
                                        </>
                              }
                              <br />
                              {!isEditWatchRelated
                                   ?    <> <label>Watch Name</label>
                                           <input className='Input-element' required 
                                                  type='text'
                                                  name='watch_name'
                                                  defaultValue={watch.watch_name}
                                                  onChange={this.handleChange}/>
                                        </>
                                   :    <> <label>Title</label>
                                           <input className='Input-element'
                                                  autoComplete='off'
                                                  type='text'
                                                  name='watch_name'
                                                  defaultValue={watch.watch_name}
                                                  onChange={this.handleChange}/>
                                        </>
                              }
                              <br />
                              {!isEditWatchRelated
                                   ?    <> <label>Movement</label>
                                           <input className='Input-element'
                                                  type='text'
                                                  name='movement'
                                                  defaultValue={watch.movement}
                                                  onChange={this.handleChange}/>
                                        </>
                                   :    <> <input className='Input-element'
                                                  autoComplete='off'
                                                  type='text'
                                                  name='movement'
                                                  defaultValue={watch.movement}
                                                  onChange={this.handleChange}/>
                                        </>
                              }
                              <br />
                              {!isEditWatchRelated
                                   ?    <> <label>Complications</label>
                                           <input className='Input-element'
                                                  type='text'
                                                  name='complications'
                                                  defaultValue={watch.complications}
                                                  onChange={this.handleChange}/>
                                        </>
                                   :    <> <input className='Input-element'
                                                  autoComplete='off'
                                                  type='text'
                                                  name='complications'
                                                  defaultValue={watch.complications}
                                                  onChange={this.handleChange}/>
                                        </>
                              }
                              <br /> 
                              {!isEditWatchRelated
                                   ?    <> <label>Band</label>
                                           <input className='Input-element'
                                                  type='text'
                                                  name='band'
                                                  defaultValue={watch.band}
                                                  onChange={this.handleChange}/>
                                        </>
                                   :    <> <input className='Input-element'
                                                  autoComplete='off'
                                                  type='text'
                                                  name='band'
                                                  defaultValue={watch.band}
                                                  onChange={this.handleChange}/>
                                        </>
                              }
                              <br />
                              {!isEditWatchRelated
                                   ?    <> <label>Model Number</label>
                                           <input className='Input-element'
                                                  type='text'
                                                  name='model_number'
                                                  defaultValue={watch.model_number}
                                                  onChange={this.handleChange}/>
                                        </>
                                   :    <> <input className='Input-element'
                                                  autoComplete='off'
                                                  type='text'
                                                  name='model_number'
                                                  defaultValue={watch.model_number}
                                                  onChange={this.handleChange}/>
                                        </>
                              }
                              <br /> 
                              {!isEditWatchRelated
                                   ?    <> <label>Case Measurement (e.g. 45mm)</label>
                                           <input className='Input-element'
                                                  type='text'
                                                  name='case_measurement'
                                                  defaultValue={watch.case_measurement}
                                                  onChange={this.handleChange}/>
                                        </>
                                   :    <> <input className='Input-element'
                                                  autoComplete='off'
                                                  type='text'
                                                  name='case_measurement'
                                                  defaultValue={watch.case_measurement}
                                                  onChange={this.handleChange}/>
                                        </>
                              }
                              <br />
                              {!isEditWatchRelated
                                   ?    <> <label>Water Resistance (e.g. 200 meters)</label>
                                           <input className='Input-element'
                                                  type='text'
                                                  name='water_resistance'
                                                  defaultValue={watch.water_resistance}
                                                  onChange={this.handleChange}/>
                                        </>
                                   :    <> <input className='Input-element'
                                                  autoComplete='off'
                                                  type='text'
                                                  name='water_resistance'
                                                  defaultValue={watch.water_resistance}
                                                  onChange={this.handleChange}/>
                                        </>
                              }
                              <br />
                              {!isEditWatchRelated
                                   ?    <> <label>Date Bought/RCVD (yyyy-mm-dd, yyyy-mm or yyyy)</label>
                                           <input className='Input-element' required
                                                  type='text'
                                                  name='date_bought'
                                                  defaultValue={watch.date_bought}
                                                  onChange={this.handleChange}/>
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
                                                  onChange={this.handleChange}
                                           />
                                           <br />
                                        </>
                                   : null
                              }
                              <label>Notes</label>
                                   <textarea className='Text-area'  
                                        name='notes'
                                        defaultValue={watch.notes}
                                        onChange={this.handleChange}
                                   />
                              <br />
                              <b className='WatchForm-upload-text Dark-red-color Center-text'>
                                   Upload image</b>
                              <input className='Input-element Choose-image'  
                                     type='file'
                                     name='image'
                                     onChange={this.handleFile}
                              />
                              <button className='btn Save-button Button-text' type='submit'>Save</button>
                         </form> 
                    </div>
               </div>
          )
     } 
}

const mapStateToProps = (state) => {
     return {
       watchRelated: state.myWatches.watchRelated  // For records that are not related to a specific watch.
     } 
}

export default connect(mapStateToProps, { editWatchAction })(EditWatch)