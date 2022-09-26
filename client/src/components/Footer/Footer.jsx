import React from 'react'

const Footer = () => {
  return (
    <div >
      <nav className="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark p-0">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="https://github.com/adrianaccz" target="_blanck">
                  <i className="bi bi-github"></i>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="https://www.linkedin.com/in/adriana-c-75900390/" target="_blanck">
                  <i className="bi bi-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Footer