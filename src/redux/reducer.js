import {
  fetchContacts,
  addContact,
  deleteContact,
  updateContact,
} from "./rootOperators";
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  contacts: {
    items: [],
    error: null,
  },
  isLoading: true,

  filter: "",
};
const rootReducer = createSlice({
  name: "root",
  initialState,
  reducers: {
    loadingFalse: (state) => {
      state.isLoading = false;
    },
    changeFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //     //fetch all contacts
      .addCase(fetchContacts.pending, (state) => {
        state.contacts.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.items = action.payload;
        state.contacts.isLoading = false;
        state.contacts.error = null;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.contacts.error = action.payload;
        state.contacts.isLoading = false;
      })
      //add new contact
      .addCase(addContact.pending, (state) => {
        state.contacts.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.items = [...state.contacts.items, action.payload];
        state.contacts.isLoading = false;
        state.contacts.error = null;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.contacts.error = action.error.message;
        state.contacts.isLoading = false;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.contacts.items = state.contacts.items.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              name: action.payload.name,
              number: action.payload.number,
            };
          }
          return item;
        });
        state.contacts.isLoading = false;
        state.contacts.error = null;
      })
      //delete contact
      .addCase(deleteContact.pending, (state) => {
        state.contacts.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.contacts.error = action.payload;
        state.contacts.isLoading = false;
      });
  },
});
export const { changeFilter, setContacts, loadingFalse } = rootReducer.actions;

export default rootReducer.reducer;
