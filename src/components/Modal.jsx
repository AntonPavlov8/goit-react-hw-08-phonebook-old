import AntdPhoneInput from "antd-phone-input";

import { Form, Input } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { contactsSelector } from "redux/rootSelectors";
import { useState } from "react";

export const UpdateContactModal = ({
  contactId,
  setIsModalSubmitDisabled,
  submitData,
  setSubmitData,
}) => {
  const allContacts = useSelector(contactsSelector);

  const [contact, setContact] = useState(
    allContacts.find((person) => person.id === contactId)
  );

  useEffect(() => {
    setContact(allContacts.find((person) => person.id === contactId));
  }, [contactId, allContacts]);

  useEffect(() => {
    function phoneInputValue() {
      let phoneInput = contact.number;
      phoneInput = phoneInput.split(" ");
      const newPhoneInput = {
        countryCode: Number(phoneInput[0].slice(1)),
        areaCode: Number(phoneInput[1]?.slice(1, phoneInput[1].length - 1)),
        phoneNumber: Number(phoneInput[2]),
      };
      return newPhoneInput;
    }
    setSubmitData({
      name: contact.name,
      number: phoneInputValue(),
    });
  }, [contact, setSubmitData]);

  const validator = (_, value) => {
    if (value && !value.valid) {
      return Promise.reject(new Error("Please enter valid phone number"));
    }
    return Promise.resolve();
  };

  function handleChange(e) {
    if (e.target?.name === "name") {
      setSubmitData((prev) => ({
        ...prev,
        name: e.target.value,
      }));
    } else {
      setSubmitData((prev) => ({
        ...prev,
        number: e,
      }));
    }
  }
  useEffect(() => {
    if (String(submitData.name).length === 0 || !submitData.number?.valid) {
      setIsModalSubmitDisabled(true);
    } else setIsModalSubmitDisabled(false);
  }, [submitData, setIsModalSubmitDisabled]);

  return (
    <>
      <Form style={{ marginTop: "36px" }}>
        <Form.Item
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input contact name!",
            },
          ]}
        >
          <Input
            value={submitData.name}
            onChange={(e) => handleChange(e)}
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
          />
        </Form.Item>
        <Form.Item
          label="Phone"
          rules={[
            {
              required: true,
              message: "Please input contact number!",
            },
            { validator: validator },
          ]}
        >
          <AntdPhoneInput
            required
            enableSearch
            value={submitData.number}
            onChange={(e) => handleChange(e)}
          />
        </Form.Item>
      </Form>
    </>
  );
};
