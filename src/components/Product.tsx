import { ProductType } from "../context/ProductsProvider"
import { ReducerActionType, ReducerAction } from "../context/CartProvider"
import check_icon from "../assets/icons/check_icon.png"
import { ReactElement } from "react"
import "./Product.css"

/* Lo más importate que veo aqui es el uso del dispatch, el argumento es como una reducerAction con un tipo de acción y un payload */


const Product = ({product, dispatch, REDUCER_ACTIONS, inCart}:PropsType): ReactElement => {

  const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url).href


  const onAddToCart = () => dispatch({type: REDUCER_ACTIONS.ADD, payload: {...product, qty: 1}})

  const itemCart = inCart?  <div className="added"> Añadido  <img className="icon2" src={check_icon}/></div> : null

  const Content = 
  <article className="product">
    <div className="product__img">
    <img src={img} alt={product.name} />
    </div>
    <div className="product_extra">
      <div className="product_info"> 
      <div>
        <h3>{product.name}</h3>
        <p>{new Intl.NumberFormat(`es-ES`, { style: `currency`, currency: "EUR"}).format(product.price)}</p>
            </div>
            {itemCart}  
        </div>

    <div className="product_action"> 
      <div data-tooltip="Price:-$20" onClick={onAddToCart} className="button">
        <div className="button-wrapper pointer">
          <div className="text">Añadir al carrito</div>
            <span className="icon">
              <svg viewBox="0 0 16 16" className="bi bi-cart2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
              </svg>
            </span>
          </div>
        </div>

          </div>

  </div>

  </article>

  return Content
}

type PropsType ={
  product: ProductType,
  dispatch: React.Dispatch<ReducerAction>,
  REDUCER_ACTIONS: ReducerActionType,
  inCart: boolean, 
}

export default Product