import React from 'react'

const Paginated = ({videogamesLimitPage, allVideogames, paginated}) => {

  const pageNumbers = []

  for (let i = 0; i < Math.ceil(allVideogames/videogamesLimitPage); i++) {
    pageNumbers.push(i+1)
  }

  return (
    <nav className='mx-auto mt-3 mb-5' >
      <ul className="pagination justify-content-center">
        {
          pageNumbers && pageNumbers.map( number => (
            <li className="page-item " aria-current="page" key={number}>
              <a className="page-link text-black" onClick={()=> paginated(number)}>{number}</a>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}

export default Paginated