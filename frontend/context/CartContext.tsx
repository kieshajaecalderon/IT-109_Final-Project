
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type CartItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
  canteenId: number;
  canteenName: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  updateQuantity: (id: number, canteenId: number, quantity: number) => void;
  removeFromCart: (id: number, canteenId: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved cart from localStorage.
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("canteenhub-cart");

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        }
      }
    } catch {
      localStorage.removeItem("canteenhub-cart");
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart whenever it changes.
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("canteenhub-cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems((previousItems) => {
      const existingItem = previousItems.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.canteenId === item.canteenId
      );

      if (existingItem) {
        return previousItems.map((cartItem) =>
          cartItem.id === item.id &&
          cartItem.canteenId === item.canteenId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...previousItems, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (
    id: number,
    canteenId: number,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(id, canteenId);
      return;
    }

    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item.id === id && item.canteenId === canteenId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (id: number, canteenId: number) => {
    setCartItems((previousItems) =>
      previousItems.filter(
        (item) =>
          !(item.id === id && item.canteenId === canteenId)
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
