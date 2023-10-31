import useCart from "../hooks/useCart"
import useProducts from "../hooks/useProducts"
import { ReactElement } from "react"
import Product from "./Product"

/* 
- Treameos lo que necesitamos de useCart y useProducts. 
- useProducts es basicament los items disponibles en la tienda con su id, su nombre y su precio. 

-Mapeamos los productos que haya creando un componente producto para cada uno de ellos, con sus correspondientes props sacados de los contextos, los productos, el dispatch del carrito, las acciones del carrito y inCart que es un boolean para saber si el producto esta o no en el carrito actual . 


Lo importante es saber leer lo que estamos haciendo. Saber razonar lo que queremos hacer y como pasarlo a código. 

Hay que plantearse ¿Que info queremos mostrar en la tienda? El producto, su imagen, su precio y un botón para añadir al carrito. 

Sabiendo esto pensamos lo que necesitamos de los contextos. 
*/
const ProductList = () => {
  const {dispatch, REDUCER_ACTIONS, cart} = useCart()
  const {products} = useProducts()

  let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>

  if (products?.length) {
    pageContent = products.map(product => {
      const inCart: boolean = cart.some(item => item.sku === product.sku)

      return (
        <Product
          key={product.sku}
          product={product}
          dispatch = {dispatch}
          REDUCER_ACTIONS={REDUCER_ACTIONS}
          inCart={inCart}
        />
      )
    })
  } 

  const Content = (<main className="main">
    {pageContent}
  </main>)

  return Content

}

export default ProductList