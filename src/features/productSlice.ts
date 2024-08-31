
import { createSlice} from "@reduxjs/toolkit"

export interface Product {
    id: string | number;
    productName: string;
    productdescription: string;
    price: number;
    availability: boolean;
    productImage: string;
}

export interface ProductsState {
    value: {
        products: Product[] | null;
        isLoading: boolean
    }
}

const initialState: ProductsState ={
    value: {
        products: null,
        isLoading: true
    }
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setproducts: (state,action) => {
            state.value.products = action.payload;
            state.value.isLoading = false
        },
        clearproducts: (state) => {
            state.value.products = null;
            state.value.isLoading = false
        },
        updateproduct: (state,action) => {
            if(state.value.products){
                state.value.products.push(action.payload)
            }
        },
        deleteProducts: (state, action) => {
            const id = action.payload;
            if (state.value.products) {
                state.value.products = state.value.products.filter(po => po.id !== id);
            }
            state.value.isLoading = false;
        }
    }
})

export const { setproducts, clearproducts, deleteProducts,updateproduct } = productSlice.actions;
export default productSlice.reducer





