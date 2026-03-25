import { useCallback, useState } from "react";

export interface CartItem {
  name: string;
  price: number;
  qty: number;
}

let cartItems: CartItem[] = [];
const listeners: Set<() => void> = new Set();

function notifyListeners() {
  for (const l of listeners) l();
}

export function useCartStore() {
  const [, forceUpdate] = useState(0);

  const subscribe = useCallback(() => {
    const listener = () => forceUpdate((n) => n + 1);
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);

  useState(() => {
    const unsub = subscribe();
    return unsub;
  });

  const addToCart = useCallback((item: Omit<CartItem, "qty">) => {
    const existing = cartItems.find((i) => i.name === item.name);
    if (existing) {
      cartItems = cartItems.map((i) =>
        i.name === item.name ? { ...i, qty: i.qty + 1 } : i,
      );
    } else {
      cartItems = [...cartItems, { ...item, qty: 1 }];
    }
    notifyListeners();
  }, []);

  const removeFromCart = useCallback((name: string) => {
    cartItems = cartItems.filter((i) => i.name !== name);
    notifyListeners();
  }, []);

  return { cartItems, addToCart, removeFromCart };
}
