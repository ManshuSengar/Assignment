import { useState } from 'react';
import './App.css';
import data from './data.json';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {Routes, Route, useNavigate} from 'react-router-dom';
function Checkout() {
  let [stockdata, setdata] = useState(data)
  let [cartdata, setcartdata] = useState([])
  const handleCheckbox = (e, item) => {
    debugger
    if (e.target.checked) {
      cartdata.push(item)
    } else {
      var newArr = cartdata.filter((element) => {
        return element._id !== item._id
      })
      cartdata = newArr
    }
  }
  const options = [
    'one', 'two', 'three'
  ];
  const defaultOption = options[0];
  return (
    <div className="App container">
      <div>
      <Dropdown options={options} value={defaultOption} placeholder="Select an option" />
      <input type="search" id="query" name="q" placeholder="Search..." />
        <button  className='float-sm-right'>Add to cart</button>
        </div>
      <table className="table align-middle mb-0 bg-white">
        <thead className="bg-light">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Color</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Buy</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, key) => {
            return (
              <tr>
                <td>
                  <div className="">
                    <div className="">
                      <img
                        src={item.image}
                        className="rounded-circle"
                        alt=""
                        style={{ width: '45px' }}
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <p className="fw-normal mb-1">{item.name}</p>
                </td>
                <td>{item.color}</td>
                <td>{item.numberInStock > 0 ? 'In stock' : 'out of stock'}</td>
                <td>${item.price + '.00'}</td>
                <td>
                  <span>{item.numberInStock}</span>
                  <i class="fa-solid fa-cart-shopping"></i>
                  <input
                    type="checkbox"
                    onChange={(e) => handleCheckbox(e, item)}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Routes>
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
    </div>
  )
}

export default Checkout
