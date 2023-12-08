import "./SearchBar.css";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { IonIcon } from '@ionic/react';
import { send, wine, bed, restaurant, search } from 'ionicons/icons';

export default function SearchBar() {
  const [selectedOption, setSelectedOption] = React.useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const performAction = () => {
    switch (selectedOption) {
      case 'hotel':
        console.log('Option Hôtel selected');
        // Code requête à Laravel pour choix de l'option Hôtel (category_id = 1)
        break;
      case 'bar':
        console.log('Option Bar selected');
        // Code requête à Laravel pour choix de l'option Bar (category_id = 2)
        break;
      case 'restaurant':
        console.log('Option Restaurant selected');
        // Code requête à Laravel pour choix de l'option Restaurant (category_id = 3)
        break;
      default:
        console.log('Aucune option sélectionnée');
        break;
    }
  };

  const getSearchPlaceholder = () => {
    switch (selectedOption) {
      case 'hotel':
        return "Quel hôtel souhaitez-vous trouver?";
      case 'bar':
        return "Dans quel bar souhaitez-vous vous rendre?";
      case 'restaurant':
        return "Quel restaurant recherchez-vous?";
      default:
        return "Rechercher...";
    }
  };

  return (
    <div>
      <div className="search-bar">
        <input className="searchInput" type="text" placeholder={getSearchPlaceholder()} />
        <button className="iconeLoupe" type="button" onClick={performAction}>
          <IonIcon className="icon-filter-search" icon={search} />
        </button>
      </div>
      <div className="filter">

        <form className="formFilter" action="#" method="post">

        <label htmlFor="hotel" className={`labelFilter ${selectedOption === 'hotel' ? 'selected' : ''}`}>
          <IonIcon className="icon-filter-search" icon={bed} />
          Hôtel
        </label>
        <input
          type="radio"
          id="hotel"
          name="options"
          value="hotel"
          checked={selectedOption === 'hotel'}
          onChange={handleOptionChange}
        />


          <label htmlFor="bar" className={`labelFilter ${selectedOption === 'bar' ? 'selected' : ''}`}>
            <IonIcon className="icon-filter-search" icon={wine} />Bar
          </label>
          <input
            type="radio"
            id="bar"
            name="options"
            value="bar"
            checked={selectedOption === 'bar'}
            onChange={handleOptionChange}
          />

          <label htmlFor="restaurant" className={`labelFilter ${selectedOption === 'restaurant' ? 'selected' : ''}`}>
            <IonIcon className="icon-filter-search" icon={restaurant} />Restaurant
          </label>
          <input
            type="radio"
            id="restaurant"
            name="options"
            value="restaurant"
            checked={selectedOption === 'restaurant'}
            onChange={handleOptionChange}
          />

          {/* <button className="filter-btn" type="button" onClick={performAction}>
            <IonIcon className="icon-filter-search" icon={send} />
          </button>
         */}
        </form>
        
      </div>
    </div>
  );
}
