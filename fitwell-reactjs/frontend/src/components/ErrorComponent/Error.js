import React from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'
const Error = () => {
    const navigate = useNavigate();
  return (
    <div style={{backgroundColor:'white', height:'100vh'}}>
      <div className="row justify-content-center" >
    <div className="col-md-12 col-sm-12">
        <div className="card card-errorPage shadow-lg border-0 rounded-lg mt-5 mx-auto" style={{width:'30rem'}}>
            <h3 className="card-header card-header-errorPage display-1 text-muted text-center" style={{color:'white'}}>
                404
            </h3>

            <span className="card-subtitle mb-2 text-muted text-center" style={{color:'white'}}>
                Page Could Not Be Found 
            </span>

            <div className="card-body mx-auto">
                <button className="btn btn-sm text-white" onClick={()=>{navigate('./Home')}} style={{background:'#ff6a00'}}>Go To HomePage</button>
            </div>
        </div>
    </div>
</div>
      
    </div>
  )
}

export default Error
