import { useEffect, useState } from 'react';
import './vite.css';
import SearchFood from './search-food';
import { useAuth0 } from "@auth0/auth0-react";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedbtn, setSelectedBtn] = useState("all");
  const { loginWithRedirect,user, isAuthenticated,logout } = useAuth0();


  useEffect(()=>{

    const fetchFoodData = async () => {
      setLoading(true);
     try {
      const response = await fetch(BASE_URL);
      const json = await response.json();
  
      setData(json);
      setFilterData(json);
      setLoading(false);
     }
     catch(error){
      setError("unable to fetch data");
     }
    };
    fetchFoodData();

  },[]);
  const searchResult = (e) =>{
    const result = e.target.value;
    console.log(result);
    if (result === ""){
      setFilterData(null);
    }

    const filter = data?.filter((value)=>
    value.name.toLowerCase().includes(result.toLowerCase()));
  

  setFilterData(filter);
  };

  const filterFood = (type) =>{
    if(type === "all"){
      setFilterData(data);
      selectedbtn("all");
      return;
    }
    const filter = data?.filter((value)=>
      value.type.toLowerCase().includes(type.toLowerCase()));
    setFilterData(filter);
    setSelectedBtn(type);
};
const filterBtn = [
  {
    name: "All",
    type: "all"
  },
  {
    name: "Breakfast",
    type: "breakfast"

  },
  {
    name: "Lunch",
    type: "lunch"
  },
  {
    name: "Dinner",
    type: "dinner"
  }
];
  


  if (error) return <div>{error}</div>;
  if (loading) return <div>loading...</div>
  
  return (
  
  <div className="container">

    <div className="top-container">

    <div className="logo">
      <img src="/food.svg"/>
    </div>
   
    <div className='search-field'>
    <div className="search">
      <input onChange={searchResult} placeholder='Search here..'/>
    </div>

    <div className='auth-btn'>
    {
      isAuthenticated ?(
        <button className='beauty-btn' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out</button>
      ) : (
    <button className='beauty-btn' onClick={() => loginWithRedirect()}>Log In</button>)
    }
    </div>
    </div>
  

    </div>

    <div className='filter-container'>
      {
        filterBtn.map((value)=>
          <button className='beauty-btn' key={value.name} onClick={() => filterFood(value.type)}>{value.name}</button>
        )
      }
      
     
      </div>

      <SearchFood data={filterData}/>
    
      </div>
  
  )
};

export default App;
