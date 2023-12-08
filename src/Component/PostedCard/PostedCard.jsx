import * as React from "react";
import "./PostedCard.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function PostedCard() {
return (
  <div className="fiche">
    <img className="imageFiche" src='https://www.cwlfly.com/wp-content/uploads/2019/08/les-plus-belles-plages-bali-1.jpg'/>
    <p className="titre">
  Lorem ipsum, dolor sit amet consectetur adipisicing elit Accusamus.
    </p>
    <span className="note">Note : 2/5</span>
    <img className="imageFiche" src='https://www.cwlfly.com/wp-content/uploads/2019/08/les-plus-belles-plages-bali-1.jpg'/>
    <p className="titre">
  Lorem ipsum, dolor sit amet consectetur adipisicing elit Accusamus.
    </p>
    <span className="note">Note : 2/5</span>
    <img className="imageFiche" src='https://www.cwlfly.com/wp-content/uploads/2019/08/les-plus-belles-plages-bali-1.jpg'/>
    <p className="titre">
  Lorem ipsum, dolor sit amet consectetur adipisicing elit Accusamus.
    </p>
    <span className="note">Note : 2/5</span>
    <img className="imageFiche" src='https://www.cwlfly.com/wp-content/uploads/2019/08/les-plus-belles-plages-bali-1.jpg'/>
    <p className="titre">
  Lorem ipsum, dolor sit amet consectetur adipisicing elit Accusamus.
    </p>
    <span className="note">Note : 2/5</span>
  </div>
  
)
}