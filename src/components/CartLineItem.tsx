import { CartItemType } from "../context/CartProvider"
import { ChangeEvent, ReactElement } from "react"
import { ReducerActionType, ReducerAction } from "../context/CartProvider"
import "./CartLineItem.css"

type PropsType = {
    item: CartItemType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType
}

const CartLineItem = ({item, dispatch, REDUCER_ACTIONS}: PropsType) => {`
`
  const img: string = new URL(`../images/${item.sku}.jpg`, import.meta.url).href

  const lineTotal: any = (item.qty * item.price)

  const highestQty: number = 20 > item.qty ? 20: item.qty

  const optionValues: number[] = [...Array(highestQty).keys()].map(i => i +1)

  const options: ReactElement[] = optionValues.map(val =>{
    return <option key={`opt${val}`}>{val}</option>
  })

  const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: {...item, qty: Number(e.target.value)}
    })
  }

  const onRemoveFromCart = () => dispatch({
    type: REDUCER_ACTIONS.REMOVE,
    payload: item,
  })

  const content = (
    <li className="cartInfo_item">
      <img src={img} alt={item.name} className="item_img" />
      <div aria-label="Item Name" className="bold">{item.name}</div>
      <div aria-label="Price Per Item" className="bold">{new Intl.NumberFormat("es-ES", {style: "currency", currency: "EUR"}).format(item.price)}</div>
      <select 
      name="" 
      id="" 
      className="item_select"
      value={item.qty}
      aria-label="Item Quantity"
      onChange={onChangeQty}
      >{options}</select>
      <div className="cart__item-subtotal red" aria-label="Line Item Subtotal">{new Intl.NumberFormat(`es-ES`, { style: `currency`, currency: "EUR"}).format(lineTotal)}</div>

      <button className="item_button" aria-label="Remove Item From Cart"
      title="Remove Item From Cart"
      onClick={onRemoveFromCart}>X</button>
    </li>


  )

  return content
}





export default CartLineItem