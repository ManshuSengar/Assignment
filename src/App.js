import { useState, useEffect } from 'react'
import './App.css'
import data from './data.json'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
function App() {
  let [stockdata, setdata] = useState(data);
  let [dummyData, setdummyData] = useState([]);
  let [cartdata, setcartdata] = useState([])
  let [showdiv, setShowDiv] = useState(1)
  let [count, setcount] = useState(1);
  let [total, settotal] = useState(0);
  let [typeValue, settypeValue] = useState('Hoodies');
  let [sizeValue, setSizeValue] = useState('S');
  let [search, setSearch] = useState('');

  const handleCheckbox = (e, item) => {
    if (e.target.checked) {
      cartdata.push(item)
      setcartdata(cartdata)
    } else {
      var newArr = cartdata.filter((element) => {
        return element._id !== item._id
      })
      cartdata = newArr
      setcartdata(cartdata)
    }
    var initTotal = 0
    cartdata.map((item, key) => {
      initTotal += item.price
    })
    settotal(initTotal)
  }
  const deleteItem = (e, item) => {
    var newArr = cartdata.filter((element) => {
      return element._id !== item._id
    })
    cartdata = newArr
    setcartdata(cartdata)
  }
  useEffect(()=>{
    var newArr = data.filter((element) => {
      return element.type == 'Hoodies' && element.size == 'S'
    });
    setdummyData(newArr);
  },[]);
  const options = ['Hoodies', 'T-Shirts', 'Shirt'];
  const defaultOption = options[0];

  const optionSize = ['S', 'M', 'XL']
  const defaultOptionSize = optionSize[0]
  const showAddToCart = (from) => {
    setShowDiv(from);
  }
  const increaseDecrease = (id, noOfStock, from, item) => {
    var count = document.getElementById(id).innerHTML
    count = parseInt(count)
    var index = 0
    debugger
    if (from === 'increase' && count < noOfStock) {
      document.getElementById(id).innerHTML = count + 1
      index = cartdata.findIndex((object) => {
        return object._id === item._id
      })
      cartdata[index].price += item.price
      setcartdata(cartdata)
    } else if (from === 'decrease' && count > 1) {
      document.getElementById(id).innerHTML = count - 1
      cartdata[index].price -= cartdata[index].price
      setcartdata(cartdata)
    }

    return
  }
  const handleType = (event) => {
    debugger;
    var val=event.value;
    typeValue=val;
    settypeValue(val);
    filterTable(typeValue,sizeValue,search);
  };
  const handleSize = (event) => {
    debugger;
    var val=event.value;
    sizeValue=val;
    setSizeValue(val);
    filterTable(typeValue,sizeValue,search);
  };
  const handleSearch = (event) => {
    search=event.target.value;
    setSearch(event.target.value);
    filterTable(typeValue,sizeValue,search)
  };

  function filterTable(type,size,searchVal){
    var newArr = data.filter((element) => {
      return element.type == type && element.size == size && element.name.includes(searchVal)
    });
    setdummyData(newArr);
  }

  return (
    <>
      {showdiv === 1 && (
        <div className="App container">
          <div className='main'>
          <div className='tbox'>
            <Dropdown className='hood'
              options={options}
              value={defaultOption}
              placeholder="Select an option"
              onChange={(e)=>handleType(e)}
            />
            
            <Dropdown className='size'
              options={optionSize}
              value={defaultOptionSize}
              placeholder="Select an option"
              onChange={(e)=>handleSize(e)}
            />
            
            
            </div>
            <div className='box'>
            <input type="search" id="query" name="q" onChange={handleSearch} placeholder="Search..." />
            </div>
            <div className='box'>
            <button onClick={() => showAddToCart(2)} className="cart">
              Add to cart
            </button>
            </div>
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
              {dummyData.map((item, key) => {
                return (
                  <tr>
                    <td>
                      <div className="">
                        <div className="">
                          <img
                            src={item.image}
                            className=""
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
                    <td>
                      {item.numberInStock > 0 ? 'In stock' : 'out of stock'}
                    </td>
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
        </div>
      )}
      {showdiv === 2 && (
        <div className="checkout container">
          <div className="container mt-4">
            {' '}
            <table className="table align-middle mb-0 bg-white">
              <thead className="bg-light">
                <tr>
                  <th></th>
                  <th></th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartdata.map((item, key) => {
                  var uniqueid = item._id
                  return (
                    <tr>
                      <td>
                        <button
                          onClick={(e) => deleteItem(e, item)}
                          style={{ border: 'none', background: 'none' }}
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </td>
                      <td>
                        <div className="">
                          <div className="">
                            <img
                              src={item.image}
                              className=""
                              alt=""
                              style={{ width: '45px' }}
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="fw-normal mb-1">
                          {`${item.name} ${item.type}-${item.color}`}
                        </p>
                      </td>
                      <td>${item.price + '.00'}</td>
                      <td>
                        <div className="d-flex flex-row">
                          <button
                            id={'btninc' + { uniqueid }}
                            onClick={(e) =>
                              increaseDecrease(
                                'count-' + uniqueid,
                                item.numberInStock,
                                'increase',
                                item,
                              )
                            }
                          >
                            +
                          </button>
                          <span className="m-1" id={'count-' + uniqueid}>
                            1
                          </span>
                          <button
                            id={'btndec' + { uniqueid }}
                            onClick={(e) =>
                              increaseDecrease(
                                'count-' + uniqueid,
                                item.numberInStock,
                                'decrease',
                                item,
                              )
                            }
                          >
                            -
                          </button>
                        </div>
                      </td>
                      <td>${item.price + '.00'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div class="card" style={{ width: '18rem' }}>
            <div class="card-body">
              <h3 class="card-title">Cart Total</h3>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <div class="flex-column">
                <h6>Subtotal</h6>
                <h6>${total + '.00'}</h6>
              </div>
              <div class="flex-row">
                <h4>Total</h4>
                <h4>${total + '.00'}</h4>
              </div>
              <button  type="button" class="btn btn-primary" onClick={() => showAddToCart('3')}>Proceed To Checkout</button>
            </div>
          </div>
        </div>
      )}
      {showdiv == 3 && (
        <div className="thankyou-page ">
          <header class="site-header" id="header">
            <h1 class="site-header__title" data-lead-id="site-header-title">
              THANK YOU!
            </h1>
          </header>
        </div>
      )}
    </>
  )
}

export default App
