import { BASE_URL } from './App';
import './vite.css';
const SearchFood = ({data}) =>
{
    return(
        <>
        <div className='food-container'>

      <div className='food-cards'>
        {
            data?.map((value) =>(
                <div key={value.name} className='food-card'>
                    <div className='food-image'>
                      <img src={BASE_URL + value.image}/>
                    </div>
                    <div className='food-info'>
                      <div className='info'>
                        <h3>{value.name}</h3>
                        <p>{value.text}</p>
                      </div>
                      <button>${value.price.toFixed(2)}</button>
                    </div>
                </div>
            ))
        }
      </div>

      
    </div>
      
    

  
  </>

    )
}
export default SearchFood ;