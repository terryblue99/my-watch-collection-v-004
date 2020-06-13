import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavBar from './NavBar'
import { editProfileAction } from '../actions/currentUserActions'
import { deleteUserAction } from '../actions/currentUserActions'
import { trackPromise } from 'react-promise-tracker' // Tracks deleteUserAction, displaying processing spinner
                                                     // https://lemoncode.github.io/react-promise-tracker/
import ProcessingIndicator from '../components/ProcessingIndicator' // https://www.basefactor.com/react-how-to-display-a-loading-indicator-on-fetch-calls
import RedirectTo from '../components/RedirectTo'

class EditProfile extends Component {
     
     state = {
    
          id: this.props.currentUser.user.id,  
          email: this.props.currentUser.user.email,
          password: '',
          password_confirmation: '',

          isBackToDashboard: false,
          isFormInput: false,
          isProcessing: false
     }

     handleDelete = () => {
          if (window.confirm('Do you really want to delete your account?\nAll of your watches will also be deleted!')) {
               this.setState({
                    isProcessing: true
               })
               trackPromise (
                    this.props.deleteUserAction(this.props.currentUser.user.id)  
               )             
          }
      }

     handleChange = (event) => {
          if(event.target.name === 'password' && event.target.value === '')
               {this.setState({
                    isFormInput: false
               })} 
          else  {this.setState({
                    [event.target.name]: event.target.value,
                    isFormInput: true
               })}                            
     }

     handleSubmit = (event) => {
        event.preventDefault() 

        const {
          id,
          email,
          password,
          password_confirmation
        } = this.state
          
          if (this.state.isFormInput) {

               if (password && password.length < 8 ) {
                    alert('Password must be a minimum of 8 characters!')
                    return
               }

               if (password && password !== password_confirmation) {
                    alert('New Password and New Password Confirmation must be the same!')
                    return
               }

               if (window.confirm('Do you really want to update your profile?')) {
                    // Edit the profile
                    const formData = new FormData()
                    formData.append('email', email)
                    formData.append('password', password)
                    formData.append('password_confirmation', password_confirmation)
                    this.props.editProfileAction(formData, id)
                    alert('Your profile has been updated.\nYou will need to log in again.')
                    window.location.assign('/login')
               }    
          }  else {
               alert('Nothing has been edited!')
          }  
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

          const user = this.props.currentUser.user
      
          return (  
              
               <div>
                    <NavBar />
                    <div className='container Profile-container'>
                         <div className='Profile-form-container'>
                              <button onClick={this.handleBack} className='btn Back-button Button-text'>Back to dashboard</button>   
                              <form id='EditProfile-Form'
                                    onSubmit={this.handleSubmit}
                              >
                                   <h1 className='ProfileForm-header Dark-red-color Center-text'>
                                        Edit Profile
                                   </h1>
                                   <h2 className='ProfileForm-subheader Center-text'>
                                        (You can change your email and/or password here)
                                   </h2>
                                   <div className='Profile'>
                                        <label>Email</label>
                                        <input className='Input-element'
                                               type='email'
                                               name='email'
                                               defaultValue={user.email}
                                               onChange={this.handleChange}
                                        />
                                        <br /> 
                                        <label>New Password (<span className='ProfileForm-NewPassword-text Dark-red-color'>Leave blank for no change</span>)</label>
                                        <input className='Input-element' 
                                               type='password'
                                               name='password'
                                               onChange={this.handleChange}
                                        />
                                        <br />
                                        <label>New Password Confirmation</label>
                                        <input className='Input-element' 
                                               type='password'
                                               name='password_confirmation'
                                               onChange={this.handleChange}
                                        />
                                        <br />
                                        <button className='btn ProfileUpdate-button Button-text' type='submit'>Update Profile</button>
                                        <br />
                                        <br />
                                   </div>
                              </form>
                         </div>
                         <hr className='ProfileDelete-hr' />
                         <div className='ProfileDelete'> 
                              {this.state.isProcessing ? <ProcessingIndicator /> :
                                   <button className='btn ProfileDelete-button Button-text' onClick={this.handleDelete}> 
                                        Delete My Account
                                   </button>}
                         </div>
                    </div>
               </div>
          )
     } 
}

const mapStateToProps = (state) => { 
  return {
    currentUser: state.currentUser
  } 
}

export default connect(mapStateToProps, { editProfileAction, deleteUserAction })(EditProfile)