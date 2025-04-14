"use client";

import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } =
    useCart();
  const router = useRouter();

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    updateQuantity(id, quantity);
  };

  if (totalItems === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button onClick={() => router.push("/")}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 border-b">
              <img
                src={item.image}
                alt={item.title_fa}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.title_fa}</h3>
                <p className="text-gray-600">{item.title_en}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    className="px-2 py-1 border rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {new Intl.NumberFormat("fa-IR", {
                    style: "currency",
                    currency: "IRR",
                  }).format(item.price)}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 text-sm mt-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="md:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Items:</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total Price:</span>
                <span>
                  {new Intl.NumberFormat("fa-IR", {
                    style: "currency",
                    currency: "IRR",
                  }).format(totalPrice)}
                </span>
              </div>
            </div>
            <Button className="w-full mt-6">Proceed to Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
