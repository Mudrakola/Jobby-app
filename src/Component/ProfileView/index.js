import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const initialStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class ProfileView extends Component {
  state = {
    profileView: {},
    apiStatus: initialStatusConstant.initial,
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfileDetail = data1 => ({
    name: data1.name,
    profileImageUrl: data1.profile_image_url,
    shortBio: data1.short_bio,
  })

  getProfile = async () => {
    this.setState({apiStatus: initialStatusConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const fetchedProfileData = this.getProfileDetail(data.profile_details)
      this.setState({
        profileView: fetchedProfileData,
        apiStatus: initialStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: initialStatusConstant.failure})
    }
  }

  renderProfile = () => {
    const {profileView} = this.state
    return (
      <div className="profile-img">
        <img
          src={profileView.profileImageUrl}
          className="profile-logo"
          alt="profile"
        />
        <h1 className="profile-name">{profileView.name}</h1>
        <p className="profile-short-bio">{profileView.shortBio}</p>
      </div>
    )
  }

  renderLoading = () => (
    <div className="loader-container loading" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRetry = () => {
    this.getProfile()
  }

  renderFailureView = () => (
    <div className="loading">
      <button type="button" className="retry-button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderProfileDetail = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case initialStatusConstant.success:
        return this.renderProfile()
      case initialStatusConstant.inProgress:
        return this.renderLoading()
      case initialStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="profile-con">{this.renderProfileDetail()}</div>
        <hr className="line" />
      </>
    )
  }
}

export default ProfileView
