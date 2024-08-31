
import { createSlice} from "@reduxjs/toolkit"

export interface Accounts {
    id: string | number;
    username: string;
    email: string;
    address: string;
    phoneNumber: string;
    orders: string;
}

export interface AccountsState {
    value: {
        accounts: Accounts[] | null;
        isLoading: boolean
    }
}

const initialState: AccountsState ={
    value: {
        accounts: null,
        isLoading: true
    }
}

export const accountsSlice = createSlice({
    name: "accounts",
    initialState,
    reducers: {
        setaccounts: (state,action) => {
            state.value.accounts = action.payload;
            state.value.isLoading = false
        },
        clearaacounts: (state) => {
            state.value.accounts = null;
            state.value.isLoading = false
        },
        deleteaccounts: (state, action) => {
            const id = action.payload;
            if (state.value.accounts) {
                state.value.accounts = state.value.accounts.filter(po => po.id !== id);
            }
            state.value.isLoading = false;
        }
    }
})

export const { setaccounts, clearaacounts, deleteaccounts } = accountsSlice.actions;
export default accountsSlice.reducer





