import { createContext, useState,useContext } from "react";

interface Product {
    id: string | number;
    productName: string;
    productdescription: string;
    availability: boolean;
    price: number;
    productImage: string;
  }

interface ShopContextType {
    shop: Product[];
    setShop: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const ShopContext = createContext<ShopContextType>({
    shop: [],
    setShop: () => {}
});
export function ShopContextProvider({ children }: { children: React.ReactNode }) {
    const [shop,setShop] = useState<Product[]>([])

    return (
        <ShopContext.Provider value={{shop,setShop}}>
            {children}
        </ShopContext.Provider>
    )
}

export const useShopContext = () => useContext(ShopContext)