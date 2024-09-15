// import { CartContext } from "../context/CartContext";
// import { useContext } from "react";
import { useCart } from "../context/CartContext";
import { useTitle } from "../hooks/useTitle";
import { CartCard } from "../components/CartCard";

export const Cart = () => {
  // const { total } = useContext(CartContext);

  const { total, cartList } = useCart();
  useTitle("Cart");

  return (
    <main>
      <section className="cart">
        <h1>
          Cart Items: {cartList.length} / ${total}
        </h1>
        {cartList.map((product, index) => (
          <CartCard key={`${product.id}-${index}`} product={product} />
        ))}
      </section>
    </main>
  );
};

// const products = [
//   {
//     "id": 1,
//     "name": "Sony Wh-Ch510 Bluetooth Wireless",
//     "price": 149,
//     "image": "/assets/images/1001.png"
//   },
//   {
//     "id": 2,
//     "name": "boAt Rockerz 450",
//     "price": 49,
//     "image": "/assets/images/1002.png"
//   }
// ];
