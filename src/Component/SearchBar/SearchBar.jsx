import "./SearchBar.css";
import axios from 'axios';
import * as React from "react";
import { IonIcon } from '@ionic/react';
import { home, wine, bed, restaurant, search } from 'ionicons/icons';

export default function SearchBar() {
  let [selectedOption, setSelectedOption] = React.useState('all');
  let [searchText, setSearchText] = React.useState('');
  let [responseData, setResponseData] = React.useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  let handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  let handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  let BASE_URL = `${apiUrl}/api/categories/`;

  let performAction = async () => {
    if (selectedOption === 'all' && searchText.trim() === '') {
      setResponseData([]);
      return;
    }
      switch (selectedOption) {
        case 'all':
          makeRequest(0);
          break;
        case 'hotel':
          makeRequest(1);
          break;
        case 'bar':
          makeRequest(2);
          break;
        case 'restaurant':
          makeRequest(3);
          break;
      }
    }
  
  let makeRequest = async (categoryId) => {
       let url = BASE_URL + (categoryId === 0 ? 'all' : categoryId);
    try {
      let response = await axios.post(url, {
        category_id: categoryId,
        searchText: searchText,
      });
      console.log(response.data);
      setResponseData(response.data);
    } catch (error) {
      console.error(`Erreur lors de la requête ${url}`, error);
    }
  };

  let getSearchPlaceholder = () => {
    switch (selectedOption) {
      case 'hotel':
        return "Quel hôtel souhaitez-vous trouver?";
      case 'bar':
        return "Dans quel bar souhaitez-vous vous rendre?";
      case 'restaurant':
        return "Quel restaurant recherchez-vous?";
      case 'all' :
        return "Rechercher";
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

        <label htmlFor="all" className={`labelFilter ${selectedOption === 'all' ? 'selected' : ''}`}>
          <IonIcon className="icon-filter-search" icon={home} />
          Tout rechercher
        </label>
        <input
          type="radio"
          id="all"
          name="options"
          value="all"
          checked={selectedOption === 'all'}
          onChange={handleOptionChange}
        />

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

        </form>
      </div>
      {responseData ? (
      <div className='parentFiche'>
        {responseData.length > 0 ? (
          responseData.map((result) => (
            <div key={result.id} className="fiche">
              <img className="imageFiche" src={result.image_path} />
              <h5><u>{result.category}</u></h5>
              <p className="titre">{result.name}</p>
              <p>Propriétaire : {result.owner_lastname} {result.owner_firstname}</p>
            </div>
          ))
        ) : (
          <p>Aucun élément ne correspond à votre recherche.</p>
        )}
      </div>
    ) : (" ")}
  </div>
);
}