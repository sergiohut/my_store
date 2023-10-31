import { useContext } from "react";
import CartContext from "../context/CartProvider";
import { UseCartContextType } from "../context/CartProvider";

//Esto sería para usar el contexto, crea un hook. Lo novedoso de esto es que para usar el contexto necesitaremos no solo importar 1. useContext y 2. el propio contexto, también necesitaremos 3.el tipo que hicimos para el propio contexto. Como hay que tiparlo todo... 
const useCart = (): UseCartContextType => {
    return useContext(CartContext)
}
 
export default useCart