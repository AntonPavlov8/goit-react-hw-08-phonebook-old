import { useDispatch, useSelector } from "react-redux";
import { ContactsItem } from "./ContactsItem";
import validator from "validator";
import { Search } from "./Search";
import { contactsSelector, filterSelector } from "redux/rootSelectors";
import { List, Modal } from "antd";
import { useState } from "react";
import { UpdateContactModal } from "./Modal";
import { updateContact } from "redux/rootOperators";

export const Contacts = (prop) => {
  const dispatch = useDispatch();

  const contacts = useSelector(contactsSelector);
  const filter = useSelector(filterSelector);

  const [isModalSubmitDisabled, setIsModalSubmitDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactId, setContactId] = useState(null);

  const [submitData, setSubmitData] = useState({
    id: null,
    name: null,
    number: null,
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    let number;
    if (submitData.number.phoneNumber) {
      number = `+${submitData.number.countryCode} (${
        submitData.number.areaCode
      }) ${[submitData.number?.phoneNumber].slice(0, 3)} ${[
        submitData.number?.phoneNumber,
      ]?.slice(3)}`;
    } else {
      function checkAreaCode(data) {
        if (data.areaCode) {
          return `(${data.areaCode})`;
        }
        return "";
      }
      number =
        `+${submitData.number.countryCode} ` + checkAreaCode(submitData.number);
    }
    dispatch(
      updateContact({
        id: contactId,
        name: submitData.name,
        number: number,
      })
    );
    console.log({
      id: contactId,
      name: submitData.name,
      number: number,
    });
  };

  const handleCancel = () => {
    setContactId(null);
    setIsModalOpen(false);
  };

  const showContacts = () => {
    function searchingResults() {
      function checkType(contact) {
        if (validator.isNumeric(filter)) {
          return contact.number;
        }
        return contact.name;
      }
      return contacts.filter((contact) => {
        return checkType(contact).includes(filter);
      });
    }

    let data = "";
    filter.length > 0 ? (data = searchingResults()) : (data = contacts);

    return data.length === 0 ? (
      <li>
        No contacts {filter.length > 0 && " found with this name or number"}
      </li>
    ) : (
      data.map((contact) => (
        <ContactsItem
          key={contact.id}
          contact={contact}
          showModal={showModal}
          setContactId={setContactId}
        />
      ))
    );
  };

  return (
    <div>
      {contacts.length !== 0 && <Search state={prop.state} />}
      <List
        style={{
          width: "300px",
          fontSize: "22px",
          padding: "0",
          listStyle: "none",
        }}
      >
        {showContacts()}
      </List>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled: isModalSubmitDisabled }}
      >
        <UpdateContactModal
          contactId={contactId}
          setIsModalSubmitDisabled={setIsModalSubmitDisabled}
          submitData={submitData}
          setSubmitData={setSubmitData}
        />
      </Modal>
    </div>
  );
};
