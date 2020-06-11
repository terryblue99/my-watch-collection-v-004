import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.jpg'
import { signUpAction } from "../../actions/currentUserActions.js"
import ClearForm from "../../components/ClearForm"
import SetFocus from "../../components/SetFocus"
import RedirectToWithState from '../../components/RedirectToWithState'

class SignUp extends Component {

    state = {
        email: '',
        password: '',
        password_confirmation: ''
    }

    handleSubmit = (event) => {
        event.preventDefault()

        if (this.state.password.length < 8 ) {
            alert('Password must be a minimum of 8 characters!')
            return
        }

        if (this.state.password !== this.state.password_confirmation) {
            alert('Password and password confirmation must be the same!')
            return
        }
 
        this.props.signUpAction({ user: this.state })
        // Clear the form
        ClearForm('SignUp-Form')
        // Set focus on the email address
        SetFocus('Focus-SignUp-Email')
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })                         
    }
    
    render() {
       
        if (this.props.currentUser) {
            return RedirectToWithState(
                                        '/login',
                                        {isFromSignUp: true}
                                      )    
        }

        return (
            
            <div>
                <header className='SignUp'>
                    <br />
                    <img src={logo} alt='logo' className='Logo'/>
                    <div className='SignUp-container'>
                        <form id='SignUp-Form' 
                              onSubmit={this.handleSubmit}
                        >
                            <div className='Register Center-text'>
                                <div className='SignUp-element Cornsilk-color'>
                                    <label>Email: </label>
                                    <input autoFocus id='Focus-SignUp-Email' className='SignUp-input-element' required 
                                        type='email'
                                        name='email'
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <br /> 
                                <div className='SignUp-element Cornsilk-color'>
                                    <label>Password: </label>
                                    <input className='SignUp-input-element' required 
                                        type='password'
                                        name='password'
                                        onChange={this.handleChange}
                                    />
                                    </div>
                                <br />
                                <div className='SignUp-element Cornsilk-color'>
                                    <label>Confirm Password: </label>
                                    <input className='SignUp-input-element' required 
                                        type='password'
                                        name='password_confirmation'
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <br />
                                <button className='btn SignUp-button Button-text' type='submit'>Sign Up</button>
                                <Link className='btn SignUp-home-button Button-text Center-text' to={{pathname: '/home'}}> 
                                    Home
                                </Link>
                            </div>  
                        </form>
                        
                    </div>
                </header>
            </div>
        )
    }
}

const mapStateToProps = (state) => { 
    return {
      currentUser: state.currentUser
    } 
}

export default connect(mapStateToProps, { signUpAction })(SignUp)