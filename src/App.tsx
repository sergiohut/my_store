import Header from './components/Header'
import Footer from './components/Footer'
import Cart from './components/Cart'
import ProductList from './components/ProductList'

import { ReactElement, useState} from 'react'

import './App.css'

function App() {
  const [viewCart, setViewCart] = useState<boolean>(false)
  const pageContent: ReactElement | ReactElement[] = viewCart ? <Cart /> : <ProductList/>

  const content = (
    <> 
      <Header viewCart={viewCart} setViewCart={setViewCart}/>
      {pageContent}
      <Footer viewCart={viewCart}/>
    </>
  )
  return content

}

export default App
