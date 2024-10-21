import React from 'react';
import { useState } from 'react'
import Home from './page/home/Home'
import Layout from './layout/Layout'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Menu from './page/menu/Menu';
import Spf from './page/spf/Spf';
import Login from './page/auth/Login';
import Register from './page/auth/Register';
import { decryptMessage } from './utils/criyto';
import { useCheckRestaurantQuery } from './api/restaurant';
import CheckRestaurant from './page/restaurant/CheckRestaurant';
import LoadingOverlay from './utils/loading';
import CreateRestaurant from './page/restaurant/CreateRestaurant';
import ProductDetail from './page/menu/ProductDetail';
import Topping from './page/Topping/Topping';
import ToppingDetail from './page/Topping/ToppingDetail';

const App = () => {
  const [clicks, setclick] = useState<any>(1)
  const user = JSON.parse(localStorage?.getItem('user')!)
  console.log(user);
  
  const data_decrypto = decryptMessage(user)
  const dec = data_decrypto ? JSON.parse(data_decrypto) : ""
  const { data: checkres, isLoading: checking } = useCheckRestaurantQuery(dec ? dec?.id : "")
  const click = (value) => {
    setclick(value);
  }


  return (
    <>
      {checking && <LoadingOverlay />}
      <Router>
        <Routes>

          <Route path="/" element={user ? <Layout onClick={click} /> : <Login />}>
            {clicks == 1 ? <Route index element={checkres?.status ? <Home /> : <CheckRestaurant />} /> : <Route index element={<Spf />} />}
            <Route path="/menu"  >
              <Route index element={<Menu />} />
              <Route path=":id/detail" element={<ProductDetail/>}/>
              <Route path="topping">
                <Route index element={<Topping />} />
                <Route path=":id/detail" element={<ToppingDetail />} />
              </Route>
            </Route>
            <Route path="/createRestaurant" element={<CreateRestaurant />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </Router>

    </>
  )
}

export default App
