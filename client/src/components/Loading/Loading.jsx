import React from 'react'

const Loading = () => {
  return (
    <div>
      <div>
        <h1 className=" fw-bold pt-5" >LOADING</h1>
      </div>
      <div className="spinner-border bg-white" style={{width: "3rem", height: "3rem"}} role="status">
      </div>
      <div className="spinner-grow bg-white" style={{width: "3rem", height: "3rem"}} role="status">
      </div>
      <div className="spinner-border bg-white" style={{width: "3rem", height: "3rem"}} role="status">
      </div>
      <div className="spinner-grow bg-white" style={{width: "3rem", height: "3rem"}} role="status">
      </div>
      <div className="spinner-border bg-white" style={{width: "3rem", height: "3rem"}} role="status">
      </div>
    </div>
  )
}

export default Loading