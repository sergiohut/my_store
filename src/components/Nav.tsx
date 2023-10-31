import useCart from "../hooks/useCart"
import "./Nav.css"
const Nav = ({viewCart, setViewCart}: PropsType) => {
  
  const {totalItems} = useCart()


  /*Esto que lo crea como una variable nosotros acostumbrabamos a ponerlo directamente entre corchetes en el return y también le gusta hacer una variable content y meter ahi el return*/
  const button = 
  viewCart 
  ? <button  className="pointer"  id="bottone1" onClick={() => setViewCart(false)}>Seguir comprando</button> 
  : <a className="pointer carrito" onClick={() => setViewCart(true)}><span className="carrito_text">Consultar carrito</span> <svg viewBox="0 0 16 16" className="bi bi-cart2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
  </svg>
({totalItems})</a>

  const content = (
    <nav className="nav">
      {button}
    </nav>
    )
    
  return content
  
}

type PropsType = {
  viewCart: boolean,
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>,
}

export default Nav
