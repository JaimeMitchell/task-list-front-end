import { useEffect, useState } from 'react';
import axios from 'axios';
import CatList from './components/CatList';
import NewCatForm from './components/NewCatForm';
import './App.css';

const kBaseUrl = 'http://localhost:5000';

const convertFromApi = (apiCat) => {
  const { pet_count, ...rest } = apiCat;
  return  { petCount: petCount, ...rest };
};

const getAllCatsApi = () => {
  return axios
    .get(`${kBaseUrl}/cats`)
    .then((response) => {
      return response.data.map(convertFromApi);
    })
    .catch((err) => {
      console.log(err);
    });
};

const petCatApi = (id) => {
  return axios
    .patch(`${kBaseUrl}/cats/${id}/pet`)
    .then((response) => {
      return convertFromApi(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const unregisterCatApi = (id) => {
  return axios
    .delete(`${kBaseUrl}/cats/${id}`)
    .then((response) => {
      return convertFromApi(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const addNewCatApi = (name) => {
  const currentCatData = {
    name,
    personality: 'not at all fun',
    color: 'calico',
    petCount: 0,
  };
  return axios
    .post(`${kBaseUrl}/cats`, currentCatData)
    .then((response) => {
      return convertFromApi(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

function App() {
  const [catData, setCatData] = useState([]);

  const getAllCats = () => {
    return getAllCatsApi().then((cats) => {
      // console.log(cats);
      setCatData(cats);
    });
  };

  useEffect(() => {
    getAllCats();
  }, []);

  const petCat = (id) => {
    return petCatApi(id).then((catResult) => {
      setCatData((catData) =>
        catData.map((cat) => {
          if (cat.id === catResult.id) {
            return catResult;
          } else {
            return cat;
          }
        })
      );
    });
  };

  const calcTotalPets = (catData) => {
    return catData.reduce((total, cat) => {
      return total + cat.petCount;
    }, 0);
  };

  const totalPetTally = calcTotalPets(catData);

  const unregisterCat = (id) => {
    return unregisterCatApi(id).then((catResult) => {
      setCatData(catData => catData.filter(cat => {
        return cat.id !== catResult.id;
      }));
      return getAllCats();
    });
  };

  const handleCatSubmit = (data) => {
    addNewCatApi(data)
      .then((newCat) => {
        setCatData([...catData, newCat]);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="App">
      <h2>Total Number of Pets Across All Kitties: {totalPetTally}</h2>
      <NewCatForm handleCatSubmit={handleCatSubmit} />
      <CatList
        catData={catData}
        onPetCat={petCat}
        onUnregister={unregisterCat}
      />
    </div>
  );
}

export default App;
