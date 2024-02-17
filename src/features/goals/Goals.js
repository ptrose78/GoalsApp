import React from "react";
import ROUTES from "../../app/routes";
import {Link} from "react-router-dom"

export default function Goals() {
 
return (
  <form>  
    <Link to={ROUTES.newGoalRoute()} className="button">
        Create New Goal
    </Link>   
  </form>
)   
}