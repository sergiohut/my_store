import { productsData} from "../../data/productsData"
import useProducts from "../hooks/useProducts"

type PropsType = {
    viewCart: boolean,
    setViewCart: React.Dispatch<React.SetStateAction<boolean>>,
  }

const FixedNav = ({viewCart}: PropsType) => {
    const {setProducts} = useProducts()

    const fixedNav =  viewCart 
    ? ""
    :           <nav className="nav_bar">
    <ul>
      <li><a href="#" onClick={() => {
      const camisetas = productsData.filter((item) => item.category === "Camisetas y polos");
      setProducts(camisetas); console.log(camisetas);


  }}>Camisetas y polos</a></li>
      <li><a href="#" onClick={() => {
      const camisas = productsData.filter((item) => item.category === "Camisas");
      setProducts(camisas); console.log(camisas)
  }}>Camisas</a></li>
      <li><a href="#" onClick={() => {
      const pantalones = productsData.filter((item) => item.category === "Pantalones");
      setProducts(pantalones); console.log(pantalones)
  }}>Pantalones</a></li>
      <li><a href="#" onClick={() => {
      const calzado = productsData.filter((item) => item.category === "Calzado");
      setProducts(calzado); console.log(calzado)
  }}>Calzado</a></li>
      <li><a href="#" onClick={() => {
      const accesorios = productsData.filter((item) => item.category === "Accesorios");
      setProducts(accesorios); console.log(accesorios)
  }}>Accesorios</a></li>
      <li><a href="#" onClick={() => {
      setProducts(productsData); 
  }}>Todo</a></li>
    </ul>
  </nav>

const content = (
    <nav className="nav">
      {fixedNav}
    </nav>
    )
    
  return content

}

export default FixedNav