import React,{Fragment} from "react";
import { Link, withRouter } from "react-router-dom";
import {isAuthenticated,signout} from "../auth/helper";

//active nav bar tab or current tab
//history is given by link tag ,,don't change it
const currentTab=(history,path)=>{
  //if history.location.pathname =currentpath
  if(history.location.pathname===path){
    return {color:"#2ecc72"}
  }
  else{
    return {color:"#FFFFFF"}
  }
}

//passing history as props 
const Menu = ({history}) => (
  <div>
    <ul className="nav nav-tabs bg-dark">
      <li className=" nav-item">
        <Link style={currentTab(history,"/")} className="nav-link" to="/">
          Home
        </Link>
      </li>
      {isAuthenticated() && (
        <li className="nav-item">
          <Link style={currentTab(history,"/user/dashboard")} className="nav-link" to="/user/dashboard">
            Dashboard
          </Link>
        </li>
      )}
      
      {!isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <Link style={currentTab(history,"/signup")} className="nav-link" to="/signup">
              Signup
            </Link>
          </li>
          <li className="nav-item">
            <Link style={currentTab(history,"/signin")} className="nav-link" to="/signin">
              Sign In
            </Link>
          </li>
        </Fragment>
      )}
      {isAuthenticated() && (
        <li className="nav-item">
          <span className="nav-link text-warning" onClick={()=>{
            signout(()=>{
              history.push("/");
            })
          }}>
            Signout
          </span>
        </li>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
