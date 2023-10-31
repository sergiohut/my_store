import { useMemo, useReducer, createContext, ReactElement } from "react"

/* ESTADO INICIAL: Es el carrito en si mismo, un objeto que estará compuesto por un lista de items.
Imaginarme los tipos como cajitas con requisitos, que simplemente limitan los datos aceptados para almacenarse.
El carrito es una cajita compuesta por otras cajitas que serian los productos, con unas propiedades.*/


const initCartState: CartStateType = { cart: [] }


type CartStateType = { cart: CartItemType[] }

export type CartItemType = {
    sku: string,
    name: string,
    price: number,
    qty: number,
}

/*------------------------------"FUCKING FUNCIÓN REDUCTORA"----------------------------------------------------

Para la función reductora, necesitamos por un lado el estado actual del carrito. Tal y como este, lleno, vacio, con tal productos. Y por otra parte necesitaresmos el item con el que vamos a operar y la operación en si misma. 
En función del tipo de acción pasarán unas cosas u otras. Basicamente es ver que cosas hay en el carrito y ver con que item se esta operando. 
*/

export type ReducerAction = {
    type: string,
    payload?: CartItemType,
}
const REDUCER_ACTION_TYPE = {
    ADD: "ADD",
    REMOVE: "REMOVE",
    QUANTITY: "QUANTITY",
    SUBMIT: "SUBMIT",
}
export type ReducerActionType = typeof REDUCER_ACTION_TYPE


const reducer = (state: CartStateType, action: ReducerAction): CartStateType => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.ADD: {
            if (!action.payload) {
                throw new Error('action.payload missing in ADD action')
            }
            const { sku, name, price } = action.payload
            const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku)
            const itemExists: CartItemType | undefined = state.cart.find(item => item.sku === sku)
            const qty: number = itemExists ? itemExists.qty + 1 : 1
            return { ...state, cart: [...filteredCart, { sku, name, price, qty }] }
        }

        case REDUCER_ACTION_TYPE.REMOVE: {
            if (!action.payload) {
                throw new Error('action.payload missing in REMOVE action')
            }
            const { sku } = action.payload
            const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku)
            return { ...state, cart: [...filteredCart] }
        }

        case REDUCER_ACTION_TYPE.QUANTITY: {
            if (!action.payload) {
                throw new Error('action.payload missing in QUANTITY action')
            }
            const { sku, qty } = action.payload
            const itemExists: CartItemType | undefined = state.cart.find(item => item.sku === sku)
            if (!itemExists) {
                throw new Error('Item must exist in order to update quantity')
            }
            const updatedItem: CartItemType = { ...itemExists, qty }
            const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku)
            return { ...state, cart: [...filteredCart, updatedItem] }
        }
        case REDUCER_ACTION_TYPE.SUBMIT: {
            return { ...state, cart: [] }
        }
        default:
            throw new Error('Unidentified reducer action type')
    }
}



/*------------------------------------------"FUNCIÓN GENERADORA"--------------------------------------

Aqui tenemos basicamente se hacen los calculos. Es la función que contiene las funciones y variables que nos interesa pasar por contexto.*/

const useCartContext = (carrito: CartStateType) => {
    const [state, dispatch] = useReducer(reducer, carrito)

    const REDUCER_ACTIONS = useMemo(() => {
        return REDUCER_ACTION_TYPE
    }, [])

    const totalItems = state.cart.reduce((previousValue, cartItem) => {
        return previousValue + cartItem.qty
    }, 0)

    const totalPrice = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(
        state.cart.reduce((previousValue, cartItem) => {
            return previousValue + (cartItem.qty * cartItem.price)
        }, 0)
    )

    const cart = state.cart.sort((a, b) => {
        const itemA = Number(a.sku.slice(-4))
        const itemB = Number(b.sku.slice(-4))
        return itemA - itemB
    })

    return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart }
}



/* Todas las cosas que retorna la función generadora (useCartContext los nombres me confunden). No sé, se ve que para crear un contexto necesito un objeto con keys de las cosas retornadas en la función generadora. */
export type UseCartContextType = {
    dispatch: React.Dispatch<ReducerAction>;
    REDUCER_ACTIONS: ReducerActionType;
    totalItems: number;
    totalPrice: string;
    cart: CartItemType[];
}

const initCartContextState: UseCartContextType = {
    dispatch: () => { },
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
    totalItems: 0,
    totalPrice: "",
    cart: [],
}

//CREAMOS CONTEXTO
const CartContext = createContext<UseCartContextType>(initCartContextState)

type ChildrenType = { children?: ReactElement | ReactElement[] }

// FUNCIÓN PROVEDORA 
export const CartProvider = ({ children }: ChildrenType): ReactElement => {
    return (
        <CartContext.Provider value={useCartContext(initCartState)}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext 


/*
Entonces si las partes habituales de un contexto eran la creación del contexto y la función proveedora con su return pues aqui hay más miga. 

- Para crear el contexto necesitamos un objeto que incluya todo lo que se retorna inicializado. 
- Para compartir lo que queremos compartir en este contexto tenemos que recurrir a la función "generadora" en cuyo return estarán todos esas variables que se comparten. 
*/