import useCart from "../hooks/useCart"
import {useState} from "react"
import CartLineItem from "./CartLineItem"
import "./Cart.css"
import done_ilust from "../assets/Illustrations/3d-business-young-man-with-shopping.png"

const Cart = () => {
  const [confirm, setConfirm] = useState(false)
  const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart} = useCart()

  const onSubmitOrder = () => {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT})
    setConfirm(true)
  }

  const pageContent = confirm
    ? <section className="cartDone">
      <h2> Pedido realizado con éxito</h2>
      <img src={done_ilust} />  
      </section>
    : < >
        <h2>Carrito de la compra: </h2>
        <div className="cartInfo">
          <ul >
          {cart.map(item => {
            return (
              <CartLineItem
                key={item.sku}
                item={item}
                dispatch={dispatch}
                REDUCER_ACTIONS={REDUCER_ACTIONS}
              />
            )
          })}
        </ul>
        <div className="cartInfo_totals">
          <div>
          <p>Nº de items: {totalItems}</p>
          <p>Subtotal: {totalPrice}</p>
          </div>
          <button className="cartInfo_submit" disabled={!totalItems} onClick={onSubmitOrder}>
            Tramitar pedido
          </button>
        </div>
        </div>
      </>

  
const content = (
  <main className="cart">
    {pageContent}
  </main>
)

  return content
}

export default Cart