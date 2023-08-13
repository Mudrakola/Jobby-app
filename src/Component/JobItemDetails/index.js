import {Component} from 'react'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import SimilarJob from '../SimilarJob'

import Header from '../Header'
import './index.css'

const initialStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class JobItemDetails extends Component {
  state = {
    specificJobItemDetail: {},
    similarJobItemDetail: [],
    skills: [],
    companyLife: {},
    apiStatus: initialStatusConstant.initial,
  }

  componentDidMount() {
    this.getSpecificJob()
  }

  getLeftAtCompany = data2 => ({
    description: data2.description,
    imageUrl: data2.image_url,
  })

  getSpecificJobDetail = data1 => ({
    companyLogoUrl: data1.company_logo_url,
    companyWebsiteUrl: data1.company_website_url,
    employmentType: data1.employment_type,
    id: data1.id,
    jobDescription: data1.job_description,
    location: data1.location,
    packagePerAnnum: data1.package_per_annum,
    title: data1.title,
    rating: data1.rating,
  })

  getSpecificJob = async () => {
    this.setState({apiStatus: initialStatusConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const fetchedSpecificData = this.getSpecificJobDetail(data.job_details)
      const lifeAtCompany = this.getLeftAtCompany(
        data.job_details.life_at_company,
      )
      const fetchedSkills = data.job_details.skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))
      const similarJob = data.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        specificJobItemDetail: fetchedSpecificData,
        similarJobItemDetail: similarJob,
        skills: fetchedSkills,
        companyLife: lifeAtCompany,
        apiStatus: initialStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: initialStatusConstant.failure})
    }
  }

  retryJobDetail = () => {
    this.getSpecificJob()
  }

  renderLoading = () => (
    <div className="loader-container loading-job" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="message-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="jobs-failure-image"
        alt="failure view"
      />
      <h1 className="message">Oops! Something Went Wrong</h1>
      <p className="message-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.retryJobDetail()}
      >
        Retry
      </button>
    </div>
  )

  getData = () => {
    const {
      specificJobItemDetail,
      skills,
      companyLife,
      similarJobItemDetail,
    } = this.state
    return (
      <>
        <div className="specific-job-container">
          <div className="specific-job-item-con">
            <img
              src={specificJobItemDetail.companyLogoUrl}
              className="company-url"
              alt="job details company logo"
            />
            <div className="job-container-item">
              <h1 className="specific-job-title">
                {specificJobItemDetail.title}
              </h1>
              <div className="specific-job-star-container">
                <AiFillStar className="job-star" />
                <p className="specific-rating">
                  {specificJobItemDetail.rating}
                </p>
              </div>
            </div>
          </div>
          <div className="package-location-container">
            <div className="location-employment-container">
              <div className="location-specific-job-container">
                <MdLocationOn className="specific-job-location" />
                <p className="specific-job-locat">
                  {specificJobItemDetail.location}
                </p>
              </div>
              <div className="location-specific-job-container">
                <BsFillBriefcaseFill className="specific-job-location" />
                <p className="specific-job-locat">
                  {specificJobItemDetail.employmentType}
                </p>
              </div>
            </div>
            <p className="specific-job-package">
              {specificJobItemDetail.packagePerAnnum}
            </p>
          </div>
          <hr className="line-2" />
          <div className="visit-container">
            <h1 className="specific-job-description-heading">Description</h1>
            <a
              href={specificJobItemDetail.companyWebsiteUrl}
              className="visit-website"
            >
              Visit
              <BiLinkExternal className="visit" />
            </a>
          </div>
          <p className="specific-job-description">
            {specificJobItemDetail.jobDescription}
          </p>
          <h1 className="specific-job-description-heading skill">Skills</h1>
          <ul className="skills-container">
            {skills.map(eachSkill => (
              <li className="skill-item" key={eachSkill.name}>
                <img
                  src={eachSkill.imageUrl}
                  className="skills-image"
                  alt={eachSkill.name}
                />
                <p className="skill-name">{eachSkill.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="specific-job-description-heading">Life at Company</h1>
          <div className="company-life-container">
            <p className="specific-job-description">
              {companyLife.description}
            </p>
            <img
              src={companyLife.imageUrl}
              className="company-life-image"
              alt="life at company"
            />
          </div>
        </div>
        <div className="similar-job-container">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-job-list-container">
            {similarJobItemDetail.map(eachSimilarJob => (
              <SimilarJob
                eachSimilarJob={eachSimilarJob}
                key={eachSimilarJob.id}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }

  getJob = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case initialStatusConstant.success:
        return this.getData()
      case initialStatusConstant.failure:
        return this.renderFailureView()
      case initialStatusConstant.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="specific-job">{this.getJob()}</div>
      </>
    )
  }
}
export default JobItemDetails
