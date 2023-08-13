import {Component} from 'react'

import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import JobItem from '../JobItem'
import FilterGroup from '../FilterGroup'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const initialStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class JobDetails extends Component {
  state = {
    jobsAvailable: [],
    apiStatus: initialStatusConstant.initial,
    searchInput: '',
    employmentType: [],
    salaryRange: 0,
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: initialStatusConstant.inProgress})
    const {employmentType, salaryRange, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join(
      ',',
    )}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const fetchedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsAvailable: fetchedData,
        apiStatus: initialStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: initialStatusConstant.failure})
    }
  }

  retryJobs = () => {
    this.getJobs()
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
      <button type="button" className="retry-button" onClick={this.retryJobs()}>
        Retry
      </button>
    </div>
  )

  renderJobDetailList = () => {
    const {jobsAvailable} = this.state
    const noJobs = jobsAvailable.length > 0
    return (
      <>
        {noJobs ? (
          <ul className="job-list-container">
            {jobsAvailable.map(eachJobItem => (
              <JobItem eachJobItem={eachJobItem} key={eachJobItem.id} />
            ))}
          </ul>
        ) : (
          <div className="message-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              className="jobs-failure-image"
              alt="no jobs"
            />
            <p className="message">No Jobs Found</p>
            <p className="message-description">
              We could not find any jobs. Try other filters.
            </p>
          </div>
        )}
      </>
    )
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterKey = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  getSubmit = () => {
    this.getJobs()
  }

  changeSalaryRange = salary => {
    this.setState({salaryRange: salary}, this.getJobs)
  }

  changeEmploymentType = event => {
    const {employmentType} = this.state
    const noInputs = employmentType.filter(
      eachItem => eachItem === event.target.id,
    )
    if (noInputs.length === 0) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, event.target.id],
        }),
        this.getJobs,
      )
    } else {
      const filterData = employmentType.filter(
        eachItem => eachItem !== event.target.id,
      )
      this.setState({employmentType: filterData}, this.getJobs)
    }
  }

  renderJobDetail = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case initialStatusConstant.success:
        return this.renderJobDetailList()
      case initialStatusConstant.inProgress:
        return this.renderLoading()
      case initialStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {jobsAvailable, searchInput} = this.state
    console.log(jobsAvailable)
    return (
      <>
        <div className="job-bg-container">
          <div className="search-container sm">
            <input
              type="search"
              className="input-search"
              placeholder="Search"
              onChange={this.changeSearchInput}
              onKeyDown={this.onEnterKey}
              value={searchInput}
            />

            <button
              type="button"
              className="search-icon-container"
              data-testid="searchButton"
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <FilterGroup
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            searchInput={searchInput}
            changeSearchInput={this.changeSearchInput}
            getJobs={this.getJobs}
            changeEmploymentType={this.changeEmploymentType}
            changeSalaryRange={this.changeSalaryRange}
          />
          <div className="right-container">
            <div className="search-container">
              <input
                type="search"
                className="input-search"
                placeholder="Search"
                onChange={this.changeSearchInput}
                onKeyDown={this.onEnterKey}
                value={searchInput}
              />
              <button
                type="button"
                className="search-icon-container"
                data-testid="searchButton"
                onClick={this.getSubmit}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobDetail()}
          </div>
        </div>
      </>
    )
  }
}

export default JobDetails
