import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJob = props => {
  const {eachSimilarJob} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = eachSimilarJob
  return (
    <li className="similar-job-item-list">
      <div>
        <div className="specific-job-item-con">
          <img
            src={companyLogoUrl}
            className="company-url"
            alt="similar job company logo"
          />
          <div className="job-container-item">
            <h1 className="specific-job-title">{title}</h1>
            <div className="specific-job-star-container">
              <AiFillStar className="job-star" />
              <p className="specific-rating">{rating}</p>
            </div>
          </div>
        </div>
      </div>
      <h1 className="similar-job-para">Description</h1>
      <p className="similar-job-description">{jobDescription}</p>
      <div className="location-employment-container">
        <div className="location-specific-job-container">
          <MdLocationOn className="specific-job-location" />
          <p className="specific-job-locat">{location}</p>
        </div>
        <div className="location-specific-job-container">
          <BsFillBriefcaseFill className="specific-job-location" />
          <p className="specific-job-locat">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJob
