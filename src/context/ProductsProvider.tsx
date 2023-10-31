import { createContext, ReactElement, useState } from "react"
import { productsData} from "../../data/productsData"

// ESTADO INICIAL, la lista de productos 
 const initState: ProductType[] = 
 productsData

 export type ProductType = {
    sku: string,
    name: string,
    price: number,
    category: string
}



// La CONSTANTE necesaria para crear el contexto 
export type UseProductsContextType = { products: ProductType[], setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>}
const initContextState: UseProductsContextType = { products: [], setProducts: () => { }}


/*____________________________________________________________________________________________________
1. CREAMOS CONTEXTO a partir del initContextState, el objeto con aquello que se va a compartir en el contexto. No me gusta un pelo nos nombres. Yo lo hubiese llamado ... sharedContext? o initStateContext?//*/

const ProductsContext = createContext<UseProductsContextType>(initContextState)



//2. FUNCION PROVEDORA, tiene una forma rarilla de hacer el fetch usa async await pero en lugar de setear en la propia función, setea al llamarla con then. Luego sería interesante provar como yo sé. Que me parece más claro. Lo que tipa es el aync 

type ChildrenType = { children?: ReactElement | ReactElement[] }

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
    const [products, setProducts] = useState<ProductType[]>(initState) 



    return (
        <ProductsContext.Provider value={{ products, setProducts }}>
            {children}
        </ProductsContext.Provider>
    )

}

export default ProductsContext 