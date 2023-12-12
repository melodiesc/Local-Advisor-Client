import "./SearchBar.css";
import axios from 'axios';
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { IonIcon } from '@ionic/react';
import { wine, bed, restaurant, search } from 'ionicons/icons';

export default function SearchBar() {
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [searchText, setSearchText] = React.useState('');

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const performAction = async () => {
  switch (selectedOption) {
    case 'hotel':
      console.log('Option Hôtel selected');
      try {
        const response = await axios.post('http://localhost:8000/api/1', {
          category_id: 1,
          searchText: searchText,
        });
        console.log(response.data);
      } catch (error) {
        console.error('Erreur lors de la requête Hôtel', error);
      }
      break;
    case 'bar':
      console.log('Option Bar selected');
      try {
        const response = await axios.post('http://localhost:8000/api/2', {
          category_id: 2,
          searchText: searchText,
        });
        console.log(response.data);
      } catch (error) {
        console.error('Erreur lors de la requête Bar', error);
      }
      break;
    case 'restaurant':
      console.log('Option Restaurant selected');
      try {
        const response = await axios.post('http://localhost:8000/api/3', {
          category_id: 3,
          searchText: searchText,
        });
        console.log(response.data);
      } catch (error) {
        console.error('Erreur lors de la requête Restaurant', error);
      }
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
        <input className="searchInput" type="text" placeholder={getSearchPlaceholder()} value={searchText}
          onChange={handleInputChange}/>
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
