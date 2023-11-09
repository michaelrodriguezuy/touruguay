import React from "react";
import "../cards/Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Card({ title, imageSource }) {
    return (
        <div className="card bg-dark">
            <img src={imageSource} alt="" />
            <div className="card-body text-light">
                <h4 className="card-title">{title}</h4>
                <p className="card-text text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti ab itaque tempora delectus! Tempora ratione laboriosam id aperiam possimus nisi aliquam eligendi quis iusto qui? Aliquam debitis repudiandae optio id!</p>
                <a href="#!" className="btn btn-outline-secondary border-0 rounded-5">Mas informacion.</a>
            </div>
        </div>
    )
}

export default Card;