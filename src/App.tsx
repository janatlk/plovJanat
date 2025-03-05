import {Route, Routes} from 'react-router';
import AddDish from './pages/add-dish/add-dish.tsx';
import Header from './components/Header/Header.tsx';
import Home from './pages/home/home-page.tsx'
import Basket from './pages/basket/basket-page.tsx'
import EditDish from './pages/edit-dish/edit-dish.tsx';
import { IBasketState, IDish } from './types.ts';
import { useEffect, useState } from "react";
import { addDishToBasket } from './utils/BasketHelpers.tsx';


function App() {
  const [basketState, setBasketState] = useState<IBasketState>({
    items: [],
    totalPrice: 0,
    totalCount: 0
    });
    const handleAddDish = (dish: IDish) => {
      setBasketState(currentState => addDishToBasket(currentState, dish));
      }
  console.log('BASKET=',basketState)
  return (
    <>
      <Header totalCount={basketState.totalCount}/>
      <div className="container">
        <Routes>
        <Route path="/" element={<Home addDishToBasket={handleAddDish}/>}/>
          <Route path="/add-dish" element={<AddDish/>}/>
          <Route path="/edit-dish/:id" element={<EditDish/>}/>
          <Route path="/basket/" element={<Basket/>}/>
        </Routes>
      </div>
    </>
);
}
export default App;
