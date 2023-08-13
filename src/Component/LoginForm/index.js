import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    isErrorMsg: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({
        isErrorMsg: true,
        errorMsg: data.error_msg,
      })
    }
  }

  enterUsername = event => {
    this.setState({username: event.target.value})
  }

  enterPassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameField = () => (
    <>
      <label htmlFor="username" className="label-element">
        USERNAME
      </label>
      <input
        type="text"
        id="username"
        className="username1"
        onChange={this.enterUsername}
        placeholder="Username"
      />
    </>
  )

  renderPasswordField = () => (
    <>
      <label htmlFor="password" className="label-element">
        PASSWORD
      </label>
      <input
        type="password"
        id="password"
        className="username1"
        onChange={this.enterPassword}
        placeholder="Password"
      />
    </>
  )

  render() {
    const {isErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-login-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="website-logo"
            alt="website logo"
          />
          <form className="form-container" onSubmit={this.submitForm}>
            <div className="username-container">
              {this.renderUsernameField()}
            </div>
            <div className="username-container">
              {this.renderPasswordField()}
            </div>
            <button className="login-button" type="submit">
              Login
            </button>
            {isErrorMsg && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
