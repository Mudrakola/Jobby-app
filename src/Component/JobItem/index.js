import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobItem = props => {
  const {eachJobItem} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachJobItem
  return (
    <li className="job-description">
      <Link to={`/jobs/${id}`} className="job-click">
        <div className="job-title-rating-container">
          <img
            src={companyLogoUrl}
            className="company-logo"
            alt="company logo"
          />
          <div className="title-container">
            <h1 className="job-title">{title}</h1>
            <div className="star-container">
              <AiFillStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-salary-container">
          <div className="location-container">
            <div className="job-icon-container">
              <MdLocationOn className="job-icon" />
              <p className="location">{location}</p>
            </div>
            <div className="job-icon-container">
              <BsFillBriefcaseFill className="job-icon" />
              <p className="location">{employmentType}</p>
            </div>
          </div>
          <p className="salary-per-annum">{packagePerAnnum}</p>
        </div>
        <hr className="line-2" />
        <h1 className="description-heading">Description</h1>
        <p className="job-description-para">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobItem
