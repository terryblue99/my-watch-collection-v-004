import React from 'react'
import { connect } from 'react-redux'
import NavBar from './NavBar'
import { addWatchAction } from '../actions/watchesActions'
import ClearForm from '../components/ClearForm'
import SetFocus from '../components/SetFocus'
import RedirectTo from '../components/RedirectTo'
import DateValidation from '../components/DateValidation'

class AddWatch extends React.Component {

     state = {
          watchData: {
               watch_maker: this.props.watchRelated,
               watch_name: '',
               movement: '',
               band: '',
               model_number: '',
               case_measurement: '',
               water_resistance: '',
               complications: '',
               date_bought: '',
               cost: 0.00,
               notes: '',
               user_id: this.props.currentUser.user.id
          },
          image: null,
          isBackToDashboard: false
     }

     handleChange = (event) => {
          this.setState({
               watchData: {
                   ...this.state.watchData,
                   [event.target.name]: event.target.value
               }   
          })                          
     }

     handleFile = (event) => {
          this.setState({
               image: event.target.files[0]   
          }) 
     }

     handleSubmit = (event) => { 
          event.preventDefault()

          const { watchData: {
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
          // validate the 'Date Bought/RCVD' input for watch records
          if (!isWatchRelated) {
               const isValidDate = DateValidation(date_bought)
               if (!isValidDate) {
                    alert('Date Bought/RCVD must be in format yyyy-mm-dd, yyyy-mm or yyyy and contain valid day & month numbers!')
                    return
               }
          }   
          // Create the record
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
          this.props.addWatchAction(formData, this.state.watchData)
          if (!isWatchRelated) {
               alert('The watch has been added and saved!')
          } else alert(`The ${this.props.watchRelated} has been added and saved!`)
          // Clear the form
          ClearForm('AddWatch-Form')
          // Set focus on the first input
          SetFocus('Focus-first-input')
     }

     handleBack = () => {
          this.setState({
               isBackToDashboard: true
          })
     }

     render() {      

          if (this.state.isBackToDashboard) { 
               this.setState({
                    isBackToDashboard: false
               }) 
               return RedirectTo('/dashboard')
          }

          const isAddWatchRelated = this.props.location.isAddWatchRelated || false
          const {watch_maker} = this.state.watchData
      
          return (
               <div>
                    <div>
                         <NavBar /> 
                    </div>

                    <h1 className='WatchForm-header Dark-red-color Center-text'>
                         {!isAddWatchRelated
                              ? <>Add a Watch</>
                              : <>Add a Watch-Related</>
                         }
                    </h1> 

                    <div className='container WatchForm-container'> 

                         <button onClick={this.handleBack} className='btn Back-button Button-text'>Back to dashboard</button>
                         <form id='AddWatch-Form'
                              onSubmit={this.handleSubmit}
                         >
                              {!isAddWatchRelated
                                   ?    <> <label>Watch Maker</label>
                                           <input autoFocus id='Focus-first-input' 
                                                  className='Input-element' required 
                                                  type='text'
                                                  name='watch_maker'
                                                  onChange={this.handleChange}/>
                                        </>
                                   :    <> <input className='Input-element Dark-red-color'
                                                  autoComplete='off'
                                                  type='text'
                                                  name='watch_maker'
                                                  value={watch_maker}
                                                  readonly/>
                                        </>
                              }
                              <br />
                              {!isAddWatchRelated
                                   ?    <> <label>Watch Name</label>
                                        <input className='Input-element' required 
                                                  type='text'
                                                  name='watch_name'
                                                  onChange={this.handleChange}/>
                                        </>
                                   :    <> <label>Title</label>
                                        <input autoFocus id='Focus-first-input' required
                                                  className='Input-element'
                                                  type='text'
                                                  name='watch_name'
                                                  onChange={this.handleChange}/>
                                        </>
                              }
                              <br />
                              {!isAddWatchRelated
                                   ?    <> <label>Movement</label>
                                        <input className='Input-element'
                                                  type='text'
                                                  name='movement'
                                                  onChange={this.handleChange}/>
                                        </>
                                   :    <> <input className='Input-element'
                                                  autoComplete='off'
                                                  type='text'
                                                  name='movement'
                                                  onChange={this.handleChange}/>
                                        </>
                              }
                              <br />
                              {!isAddWatchRelated
                                   ?    <> <label>Complications</label>
                                        <input className='Input-element'
                                                  type='text'
                                                  name='complications'
                                                  onChange={this.handleChange}/>
                                        </>
                                   :    <> <input className='Input-element'
                                                  autoComplete='off'
                                                  type='text'
                                                  name='complications'
                                                  onChange={this.handleChange}/>
                                        </>
                              }
                              <br />
                              {!isAddWatchRelated
                                   ?    <> <label>Band</label>
                                        <input className='Input-element'
                                                  type='text'
                                                  name='band'
                                                  onChange={this.handleChange}/>
                                        </>
                                   :    <> <input className='Input-element'
                                                  autoComplete='off'
                                                  type='text'
                                                  name='band'
                                                  onChange={this.handleChange}/>
                                        </>
                              }
                              <br /> 
                              {!isAddWatchRelated
                                   ?    <> <label>Model Number</label>
                                        <input className='Input-element'
                                                  type='text'
                                                  name='model_number'
                                                  onChange={this.handleChange}/>
                                        </>
                                   :    <> <input className='Input-element'
                                                  autoComplete='off'
                                                  type='text'
                                                  name='model_number'
                                                  onChange={this.handleChange}/>
                                        </>
                              }
                              <br />
                              {!isAddWatchRelated
                                   ?    <> <label>Case Measurement (e.g. 45mm)</label>
                                        <input className='Input-element'
                                                  type='text'
                                                  name='case_measurement'
                                                  onChange={this.handleChange}/>
                                        </>
                                   :    <> <input className='Input-element'
                                                  autoComplete='off'
                                                  type='text'
                                                  name='case_measurement'
                                                  onChange={this.handleChange}/>
                                        </>
                              }
                              <br />
                              {!isAddWatchRelated
                                   ?    <> <label>Water Resistance (e.g. 200 meters)</label>
                                        <input className='Input-element'
                                                  type='text'
                                                  name='water_resistance'
                                                  onChange={this.handleChange}/>
                                        </>
                                   :    <> <input className='Input-element'
                                                  autoComplete='off'
                                                  type='text'
                                                  name='water_resistance'
                                                  onChange={this.handleChange}/>
                                        </>
                              }
                              <br />
                              {!isAddWatchRelated
                                   ?    <> <label>Date Bought/RCVD (yyyy-mm-dd, yyyy-mm or yyyy)</label>
                                        <input className='Input-element' required
                                                  type='text'
                                                  name='date_bought'
                                                  onChange={this.handleChange}/>
                                        </>
                                   : null
                              }
                              <br />
                              {!isAddWatchRelated
                                   ?    <> <label>Cost (e.g. 199.99 | defaults to 0)</label>
                                        <input className='Input-element'
                                                  type='number'
                                                  step='0.01'
                                                  min='0'
                                                  name='cost'
                                                  onChange={this.handleChange}
                                        /> 
                                        <br />    
                                        </>
                                   : null
                              }
                              <label>Notes</label>
                                   <textarea className='Text-area'  
                                        name='notes'
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
       currentUser: state.currentUser,
       watchRelated: state.myWatches.watchRelated // For records that are not related to a specific watch.
     } 
 }

export default connect(mapStateToProps, { addWatchAction })(AddWatch)