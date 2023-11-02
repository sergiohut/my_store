import Nav from "./Nav"
import FixedNav from "./FixedNav"
import { useState, useRef } from "react"

import "./Header.css"
import useProducts from "../hooks/useProducts"
import { productsData} from "../../data/productsData"



const Header = ({viewCart, setViewCart}: PropsType) => {
  const [name, setName] = useState("");
const textInput:any = useRef(null);
const showValue = () => {
  console.log(textInput);
  //Gracias a la referencia puedo leer el objeto real del DOM y leer su value -> ESTO ES DEL DOM
  const inputValue = textInput.current.value;
  //Si existe el valor lo seteamos
  if (inputValue) {
    setName(inputValue);
  }
};
  const {products, setProducts} = useProducts()
  const compareNumbers = (a:any, b:any) => {
    return a.sku.slice(4) - b.sku.slice(4);
  }


  const sortedCheaper = (value:String) => {
    const orderProducts = products.sort((a, b) => (a.price > b.price ? 1 : -1));
    const orderedProducts = orderProducts.filter((item) => {
      return item.name.toLowerCase().includes(value.toLowerCase()) ||
      item.category.toLowerCase().includes(value.toLowerCase());
    });
    setProducts(orderedProducts);
  };

  const sortedExpensive = (value:String) => {
    const orderProducts = products.sort((a, b) => (a.price > b.price ? -1 : 1));
    const orderedProducts = orderProducts.filter((item) => {
      return item.name.toLowerCase().includes(value.toLowerCase()) ||
      item.category.toLowerCase().includes(value.toLowerCase());
    });
    setProducts(orderedProducts);
  };

  const sortedRecent = (value:String) => {
    const orderProducts = products.sort((compareNumbers));
    const orderedProducts = orderProducts.filter((item) => {
      return item.name.toLowerCase().includes(value.toLowerCase()) ||
      item.category.toLowerCase().includes(value.toLowerCase());
    });
    setProducts(orderedProducts);
  };
  

  const filterFunction = (value:any) => {
    const filteredProducts = productsData.filter((item) => {
      return item.name.toLowerCase().includes(value.toLowerCase()) ||
      item.category.toLowerCase().includes(value.toLowerCase());
    });
    setProducts(filteredProducts);
};


  return (
 <header className="header">
        <FixedNav viewCart={viewCart} setViewCart={setViewCart}/>
      <section className="central_header">
        <h1>My Store</h1>
        {!viewCart? 
        <div className="link_path">
          <ul>
            <li><a href="">Hombre</a></li>
            <li>&gt;</li>
            <li><a href="">Ropa</a></li>
            <li>&gt;</li>
            <li className="current_page"><a  href="">Casual</a></li>
          </ul>
          
        </div>:
        <h2> Carrito de la compra: </h2>}
      </section>
      

        {<section className="user_actions">
        <Nav viewCart={viewCart} setViewCart={setViewCart}/>
        {!viewCart&& 
        <div className="actions_left" >
          <div className="upper_line">

              <input type="text"   placeholder="Buscar"  ref={textInput} onChange={(ev) => {filterFunction(ev.target.value), showValue()}}/>
          </div>
            <div className="order">
              Ordenar por
              <ul className={`filterBar__filter }`}>
                <li>
                  <input id="Cheaper" onClick={() => {sortedCheaper(name)}} type="radio" value="Cheaper" name="order"/>
                  <label htmlFor="Cheaper"> Precio de menor a mayor</label>
                </li>
                <li>
                  <input id="Expensive" onClick={() => {sortedExpensive(name)}} type="radio" name="order" value="Expensive" />
                  <label htmlFor="Expensive"> Precio de mayor a menor</label>
                </li>
                <li>
                  <input id="Recent" onClick={() => {sortedRecent(name)}}type="radio" 
                  name="order" value="Recent" />
                  <label htmlFor="Recent">Más recientes</label>
                </li>
              </ul>
            </div>
        </div>
        }


      </section>}

    </header>
  )
}

type PropsType = {
  viewCart: boolean,
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>,
}

export default Header

/*
La otra opción sería tipar después de los argumentos : {viewCart: boolean, setViewCart lo que toque}

Lo que no entiendo es para que necesita estos props el Header, para pasarselos como props al Nav?? vale en función de si es el estado es true o false te enseña una cosa u otra, pero... y no se podría meter el estado en un contexto pa no tener que estar pasandolo por props de un componente a otro?? O igual lo hace simplemente para que no se rerenderice... tiene sentido */

export type ProductType = {
  sku: string,
  name: string,
  price: number,
  category: string
}