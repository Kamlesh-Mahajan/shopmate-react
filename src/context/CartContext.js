import { createContext, useContext, useEffect, useReducer } from "react";
import { cartReducer } from "../reducer/cartReducer";

const initialState = {
  cartList: JSON.parse(localStorage.getItem("cartList")) || [],
  total: 0
};

const CartContext = createContext(initialState);

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    updateTotal(state.cartList);
  }, [state.cartList]);

  const addToCart = (product) => {
    const updatedCartList = state.cartList.concat(product);
    updateTotal(updatedCartList);
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        products: updatedCartList
      }
    });

    localStorage.setItem("cartList", JSON.stringify(updatedCartList));
  };

  const removeFromCart = (product) => {
    const updatedCardList = state.cartList.filter(
      (current) => current.id !== product.id
    );
    updateTotal(updatedCardList);

    dispatch({
      type: "REMOVE_FROM_CART",
      payload: {
        products: updatedCardList
      }
    });

    localStorage.setItem("cartList", JSON.stringify(updatedCardList));
  };

  const updateTotal = (products) => {
    let total = 0;
    products.forEach((product) => (total += product.price));

    dispatch({
      type: "UPDATE_TOTAL",
      payload: {
        total
      }
    });
  };

  const value = {
    total: state.total,
    cartList: state.cartList,
    addToCart,
    removeFromCart,
    updateTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  return context;
};
