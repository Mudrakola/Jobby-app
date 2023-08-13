import ProfileView from '../ProfileView'

import './index.css'

const FilterGroup = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    changeEmploymentType,
    changeSalaryRange,
  } = props

  const onChangeEmployType = event => {
    changeEmploymentType(event)
  }

  const onChangeSalary = event => {
    console.log(event.target.value)
    changeSalaryRange(event.target.value)
  }

  return (
    <>
      <div className="left-container-lg">
        <ProfileView />
        <h1 className="employment-heading">Type of Employment</h1>
        <ul className="employment-container">
          {employmentTypesList.map(eachEmployment => (
            <li
              className="employment-list"
              onChange={onChangeEmployType}
              key={eachEmployment.employmentTypeId}
            >
              <input
                type="checkbox"
                className="check-box1"
                id={eachEmployment.employmentTypeId}
                value={eachEmployment.employmentTypeId}
              />
              <label className="work" htmlFor={eachEmployment.employmentTypeId}>
                {eachEmployment.label}
              </label>
            </li>
          ))}
        </ul>
        <hr className="line" />
        <h1 className="employment-heading">Salary Range</h1>
        <ul className="employment-container">
          {salaryRangesList.map(eachSalary => (
            <li
              className="employment-list"
              onChange={onChangeSalary}
              key={eachSalary.salaryRangeId}
            >
              <input
                type="radio"
                className="check-box1"
                id={eachSalary.salaryRangeId}
                value={eachSalary.salaryRangeId}
                name="salaryRanges"
              />
              <label className="work" htmlFor={eachSalary.salaryRangeId}>
                {eachSalary.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default FilterGroup
