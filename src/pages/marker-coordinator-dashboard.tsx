import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <header>
        <link rel="stylesheet" href="css/Marker-coordinator-dashboard.css" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <title>Marker Match</title>
      </header>
      <nav id="navigation-bar">
        <div>
          <div id="logo">
            <img src="images/University_of_Auckland_logo.png" />
          </div>
          <a>
            <i className="fa fa-2x fa-dashboard" />
            <br />
            My courses
          </a>
          <a>
            <i className="fa fa-2x fa-book" />
            <br />
            Courses
          </a>
          <a>
            <i className="fa fa-2x fa-edit" />
            <br />
            Applications
          </a>
        </div>
        <div>
          <a>
            <i className="fa fa-2x fa-user" />
            <br />
            Account
          </a>
          <a>
            <i className="fa fa-2x fa-cog" />
            <br />
            Settings
          </a>
        </div>
      </nav>
      <div id="main-div">
        <div id="dashboard">
          <h1>Marker Allocation</h1>
          <div id="allocation-div">
            <div id="courses-to-allocate-div">
              <div id="course-search-div">
                <input type="text" placeholder="Search Courses..." />
              </div>
              <div id="courses">
                <div className="course-selection-div">
                  <h3>COMPSCI399</h3>
                  <span className="course-selection-amount-needed">
                    5 / 19 markers
                  </span>{' '}
                  <br />
                  <span className="course-select-avg-hours">
                    Avg workload: 4 hours
                  </span>
                </div>
                <div className="course-selection-div">
                  <h3>COMPSCI101</h3>
                  <span className="course-selection-amount-needed">
                    3 / 20 markers
                  </span>{' '}
                  <br />
                  <span className="course-select-avg-hours">
                    Avg workload: 4 hours
                  </span>
                </div>
                <div className="course-selection-div">
                  <h3>COMPSCI210</h3>
                  <span className="course-selection-amount-needed">
                    1 / 5 markers
                  </span>{' '}
                  <br />
                  <span className="course-select-avg-hours">
                    Avg workload: 4 hours
                  </span>
                </div>
                <div className="course-selection-div">
                  <h3>COMPSCI120</h3>
                  <span className="course-selection-amount-needed">
                    3 / 5 markers
                  </span>{' '}
                  <br />
                  <span className="course-select-avg-hours">
                    Avg workload: 4 hours
                  </span>
                </div>
                <div className="course-selection-div">
                  <h3>COMPSCI110</h3>
                  <span className="course-selection-amount-needed">
                    1 / 5 markers
                  </span>{' '}
                  <br />
                  <span className="course-select-avg-hours">
                    Avg workload: 4 hours
                  </span>
                </div>
                <div className="course-selection-div">
                  <h3>COMPSCI130</h3>
                  <span className="course-selection-amount-needed">
                    1 / 5 markers
                  </span>{' '}
                  <br />
                  <span className="course-select-avg-hours">
                    Avg workload: 4 hours
                  </span>
                </div>
                <div className="course-selection-div">
                  <h3>COMPSCI111</h3>
                  <span className="course-selection-amount-needed">
                    1 / 5 markers
                  </span>{' '}
                  <br />
                  <span className="course-select-avg-hours">
                    Avg workload: 4 hours
                  </span>
                </div>
                <div className="course-selection-div">
                  <h3>TESTSCROLL</h3>
                  <span className="course-selection-amount-needed">
                    1 / 5 markers
                  </span>{' '}
                  <br />
                  <span className="course-select-avg-hours">
                    Avg workload: 4 hours
                  </span>
                </div>
                <div className="course-selection-div">
                  <h3>TESTSCROLL</h3>
                  <span className="course-selection-amount-needed">
                    1 / 5 markers
                  </span>{' '}
                  <br />
                  <span className="course-select-avg-hours">
                    Avg workload: 4 hours
                  </span>
                </div>
                <div className="course-selection-div">
                  <h3>TESTSCROLL</h3>
                  <span className="course-selection-amount-needed">
                    1 / 5 markers
                  </span>{' '}
                  <br />
                  <span className="course-select-avg-hours">
                    Avg workload: 4 hours
                  </span>
                </div>
              </div>
            </div>
            <div id="applications-for-course">
              <div className="applications-section">
                <div className="applications-section-header">
                  <h3>Accepted Applications</h3>
                  <span>Current Average Workload: 5hrs</span>
                  <br />
                  <span>Current Allocated Markers: 9</span>
                  <i className="fa fa-filter" />
                  <input
                    className="applications-section-header-search"
                    type="text"
                    placeholder="Search Applications..."
                  />
                </div>
                <div id="accepted-applications-for-course">
                  <div className="student-application">
                    <div className="student-application-grade">A+</div>
                    <h4>[First name][Last name]</h4>
                    <span>3/10 hours allocated</span>
                    <br />
                    <span>1/3 priority</span>
                    <div className="student-application-more-details">
                      <span>AUID: 000 000 000</span>
                      <br />
                    </div>
                  </div>
                  <div className="student-application">
                    <div className="student-application-grade">A+</div>
                    <h4>[First name][Last name]</h4>
                    <span>3/10 hours allocated</span>
                    <br />
                    <span>1/3 priority</span>
                    <div className="student-application-more-details">
                      <span>AUID: 000 000 000</span>
                      <br />
                    </div>
                  </div>
                  <div className="student-application">
                    <div className="student-application-grade">A+</div>
                    <h4>[First name][Last name]</h4>
                    <span>3/10 hours allocated</span>
                    <br />
                    <span>1/3 priority</span>
                    <div className="student-application-more-details">
                      <span>AUID: 000 000 000</span>
                      <br />
                    </div>
                  </div>
                  <div className="student-application">
                    <div className="student-application-grade">A+</div>
                    <h4>[First name][Last name]</h4>
                    <span>3/10 hours allocated</span>
                    <br />
                    <span>1/3 priority</span>
                    <div className="student-application-more-details">
                      <span>AUID: 000 000 000</span>
                      <br />
                    </div>
                  </div>
                  <div className="student-application">
                    <div className="student-application-grade">A+</div>
                    <h4>[First name][Last name]</h4>
                    <span>3/10 hours allocated</span>
                    <br />
                    <span>1/3 priority</span>
                    <div className="student-application-more-details">
                      <span>AUID: 000 000 000</span>
                      <br />
                    </div>
                  </div>
                  <div className="student-application">
                    <div className="student-application-grade">A+</div>
                    <h4>[First name][Last name]</h4>
                    <span>3/10 hours allocated</span>
                    <br />
                    <span>1/3 priority</span>
                    <div className="student-application-more-details">
                      <span>AUID: 000 000 000</span>
                      <br />
                    </div>
                  </div>
                  <div className="student-application">
                    <div className="student-application-grade">A+</div>
                    <h4>[First name][Last name]</h4>
                    <span>3/10 hours allocated</span>
                    <br />
                    <span>1/3 priority</span>
                    <div className="student-application-more-details">
                      <span>AUID: 000 000 000</span>
                      <br />
                    </div>
                  </div>
                  <div className="student-application">
                    <div className="student-application-grade">A+</div>
                    <h4>[First name][Last name]</h4>
                    <span>3/10 hours allocated</span>
                    <br />
                    <span>1/3 priority</span>
                    <div className="student-application-more-details">
                      <span>AUID: 000 000 000</span>
                      <br />
                    </div>
                  </div>
                  <div className="student-application">
                    <div className="student-application-grade">A+</div>
                    <h4>[First name][Last name]</h4>
                    <span>3/10 hours allocated</span>
                    <br />
                    <span>1/3 priority</span>
                    <div className="student-application-more-details">
                      <span>AUID: 000 000 000</span>
                      <br />
                    </div>
                  </div>
                </div>
              </div>
              <div className="applications-section">
                <div className="applications-section-header">
                  <h3>Pending Applications</h3>
                  <span>Number of Pending Applications: 9</span>
                  <i className="fa fa-filter" />
                  <input
                    className="applications-section-header-search"
                    type="text"
                    placeholder="Search Applications..."
                  />
                </div>
                <div id="pending-applications-for-course">
                  <div className="student-application">
                    <div className="student-application-grade">A+</div>
                    <h4>[First name][Last name]</h4>
                    <span>3/10 hours allocated</span>
                    <br />
                    <span>1/3 priority</span>
                    <div className="student-application-more-details">
                      <span>AUID: 000 000 000</span>
                      <br />
                    </div>
                  </div>
                  <div className="student-application">
                    <div className="student-application-grade">A+</div>
                    <h4>[First name][Last name]</h4>
                    <span>3/10 hours allocated</span>
                    <br />
                    <span>1/3 priority</span>
                    <div className="student-application-more-details">
                      <span>AUID: 000 000 000</span>
                      <br />
                    </div>
                  </div>
                  <div className="student-application">
                    <div className="student-application-grade">A+</div>
                    <h4>[First name][Last name]</h4>
                    <span>3/10 hours allocated</span>
                    <br />
                    <span>1/3 priority</span>
                    <div className="student-application-more-details">
                      <span>AUID: 000 000 000</span>
                      <br />
                    </div>
                  </div>
                  <div className="student-application">
                    <div className="student-application-grade">A+</div>
                    <h4>[First name][Last name]</h4>
                    <span>3/10 hours allocated</span>
                    <br />
                    <span>1/3 priority</span>
                    <div className="student-application-more-details">
                      <span>AUID: 000 000 000</span>
                      <br />
                    </div>
                  </div>
                  <div className="student-application">
                    <div className="student-application-grade">A+</div>
                    <h4>[First name][Last name]</h4>
                    <span>3/10 hours allocated</span>
                    <br />
                    <span>1/3 priority</span>
                    <div className="student-application-more-details">
                      <span>AUID: 000 000 000</span>
                      <br />
                    </div>
                  </div>
                  <div className="student-application">
                    <div className="student-application-grade">A+</div>
                    <h4>[First name][Last name]</h4>
                    <span>3/10 hours allocated</span>
                    <br />
                    <span>1/3 priority</span>
                    <div className="student-application-more-details">
                      <span>AUID: 000 000 000</span>
                      <br />
                    </div>
                  </div>
                  <div className="student-application">
                    <div className="student-application-grade">A+</div>
                    <h4>[First name][Last name]</h4>
                    <span>3/10 hours allocated</span>
                    <br />
                    <span>1/3 priority</span>
                    <div className="student-application-more-details">
                      <span>AUID: 000 000 000</span>
                      <br />
                    </div>
                  </div>
                  <div className="student-application">
                    <div className="student-application-grade">A+</div>
                    <h4>[First name][Last name]</h4>
                    <span>3/10 hours allocated</span>
                    <br />
                    <span>1/3 priority</span>
                    <div className="student-application-more-details">
                      <span>AUID: 000 000 000</span>
                      <br />
                    </div>
                  </div>
                  <div className="student-application">
                    <div className="student-application-grade">A+</div>
                    <h4>[First name][Last name]</h4>
                    <span>3/10 hours allocated</span>
                    <br />
                    <span>1/3 priority</span>
                    <div className="student-application-more-details">
                      <span>AUID: 000 000 000</span>
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
