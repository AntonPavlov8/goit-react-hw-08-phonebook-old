import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.herokuapp.com";

export const fetchContacts = createAsyncThunk("contacts/fetchAll", async () => {
  try {
    const response = await axios.get("contacts");
    return response.data;
  } catch (err) {
    return err;
  }
});
export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async (data) => {
    try {
      const response = await axios.patch(`contacts/${data.id}`, {
        name: data.name,
        number: data.number,
      });
      return response.data;
    } catch (err) {
      return err;
    }
  }
);
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (data) => {
    const { contacts, name, number } = data;

    try {
      if (contacts.filter((person) => person.name === name).length !== 0) {
        throw new Error(`${name} is already in contacts`);
      } else if (
        contacts.filter((person) => person.phone === number).length !== 0
      ) {
        throw new Error(`Person with number ${number} is already in contacts`);
      } else {
        const response = await axios.post("contacts", { name, number });
        return response.data;
      }
    } catch (err) {
      throw new Error(err);
    }
  }
);
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (userId) => {
    try {
      const response = await axios.delete(`contacts/${userId}`);
      return response.data;
    } catch (err) {
      return err;
    }
  }
);
