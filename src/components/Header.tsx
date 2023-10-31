import Nav from "./Nav"
import FixedNav from "./FixedNav"
import { useState, useRef } from "react"

import "./Header.css"
import useProducts from "../hooks/useProducts"
import { productsData} from "../../data/productsData"



const Header = ({viewCart, setViewCart}: PropsType) => {
  const [name, setName] = useState("");
const textInput = useRef(null);
const showValue = () => {
  console.log(textInput);
  //Gracias a la referencia puedo leer el objeto real del DOM y leer su value -> ESTO ES DEL DOM
  const inputValue = textInput.current!.value;
  //Si existe el valor lo seteamos
  if (inputValue) {
    setName(inputValue);
  }
};
  const {products, setProducts} = useProducts()
  const [clicked2, setClicked2] = useState(false);
  const handleClick2 = () => {
    setClicked2(!clicked2);
  };

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
    const orderProducts = products.sort((a, b) => (a.sku > b.sku ? 1 : -1));
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
        {!viewCart&& 
        <div className="link_path">
          <ul>
            <li><a href="">Hombre</a></li>
            <li>&gt;</li>
            <li><a href="">Ropa</a></li>
            <li>&gt;</li>
            <li className="current_page"><a  href="">Casual(15 articulos)</a></li>
          </ul>
          
        </div>}
      </section>
      

        {<section className="user_actions">
        <Nav viewCart={viewCart} setViewCart={setViewCart}/>
        {!viewCart&& 
        <div className="actions_left" >
          <div className="upper_line">

              <input type="text"   placeholder="Buscar"  ref={textInput} onChange={(ev) => {filterFunction(ev.target.value), showValue()}}/>
          </div>
            <div onClick={handleClick2}>
              Ordenar por
              <ul className={`filterBar__filter ${clicked2 ? 'active' : ''}`}>
                <li>
      
                </li>
                <li>
                  <input id="Grandes_viajes" onClick={() => {sortedCheaper(name)}} type="checkbox" value="Grandes viajes" />
                  <label htmlFor="Grandes_viajes"> Precio de menor a mayor</label>
                </li>
                <li>
                  <input id="Grandes_viajes" onClick={() => {sortedExpensive(name)}} type="checkbox" value="Grandes viajes" />
                  <label htmlFor="Grandes_viajes"> Precio de mayor a menor</label>
                </li>
                <li>
                  <input id="Grandes_viajes" onClick={() => {sortedRecent(name)}}type="checkbox" value="Grandes viajes" />
                  <label htmlFor="Grandes_viajes">Más recientes</label>
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