import * as React from "react";
import "./PostedCard.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function PostedCard() {
return (
  <div className="parentFiche">

      <div className="fiche">
        <img className="imageFiche" src='https://www.cwlfly.com/wp-content/uploads/2019/08/les-plus-belles-plages-bali-1.jpg'/>
        <p className="titre">
          Profitez de nos magnifiques plages ! Venez bronzer sur le sable d'or de Bali.
        </p>
        <span className="note">Note : 4.5/5</span>
      </div>

      <div className="fiche">
        <img className="imageFiche" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJp5t0tKjM_WpJLig6I69bmXp12tw6Gm7iNQ&usqp=CAU'/>
        <p className="titre">
        Hilton Tokyo Bay is an official Tokyo Disney Resort® hotel, boasting easy access to Tokyo Disneyland®
        </p>
        <span className="note">Note : 5/5</span>
      </div>

      <div className="fiche">
      <img className="imageFiche" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR34cFcbA_miXNhD8eaYQxQsrchNVeDn3lHyQ&usqp=CAU'/>
      <p className="titre">
      The best cafe in the world! Experience traditional flavors and typical Hungarian dishes or enjoy elegant international cuisine.
      </p>
      <span className="note">Note : 3.8/5</span>
      </div>

      <div className="fiche">
      <img className="imageFiche" src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/2e/39/5a/caption.jpg?w=2400&h=-1&s=1&cx=1920&cy=1080&chk=v1_afa39bdec11e342cfabb'/>
      <p className="titre">
      Frozen waterfalls. Snow-dusted pine trees. Spectacular natural light shows. 
      </p>
      <span className="note">Note : 4.9/5</span>
      </div>

      <div className="fiche">
        <img className="imageFiche" src='https://www.cwlfly.com/wp-content/uploads/2019/08/les-plus-belles-plages-bali-1.jpg'/>
        <p className="titre">
          Profitez de nos magnifiques plages ! Venez bronzer sur le sable d'or de Bali.
        </p>
        <span className="note">Note : 4.5/5</span>
      </div>

      <div className="fiche">
        <img className="imageFiche" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJp5t0tKjM_WpJLig6I69bmXp12tw6Gm7iNQ&usqp=CAU'/>
        <p className="titre">
        Hilton Tokyo Bay is an official Tokyo Disney Resort® hotel, boasting easy access to Tokyo Disneyland®
        </p>
        <span className="note">Note : 5/5</span>
      </div>

      <div className="fiche">
      <img className="imageFiche" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR34cFcbA_miXNhD8eaYQxQsrchNVeDn3lHyQ&usqp=CAU'/>
      <p className="titre">
      The best cafe in the world! Experience traditional flavors and typical Hungarian dishes or enjoy elegant international cuisine.
      </p>
      <span className="note">Note : 3.8/5</span>
      </div>

      <div className="fiche">
      <img className="imageFiche" src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/2e/39/5a/caption.jpg?w=2400&h=-1&s=1&cx=1920&cy=1080&chk=v1_afa39bdec11e342cfabb'/>
      <p className="titre">
      Frozen waterfalls. Snow-dusted pine trees. Spectacular natural light shows. 
      </p>
      <span className="note">Note : 4.9/5</span>
      </div>
    </div>
)
}