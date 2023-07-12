import { Button, Form, Input } from "antd";
import AntdPhoneInput from "antd-phone-input";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact, fetchContacts } from "redux/rootOperators";
import {
  contactsSelector,
  errorSelector,
  isLoadingSelector,
} from "redux/rootSelectors";
import { Contacts } from "./Contacts";

export const PhoneBook = () => {
  const dispatch = useDispatch();

  let formRef = useRef();

  const contacts = useSelector(contactsSelector);
  const isLoading = useSelector(isLoadingSelector);
  const error = useSelector(errorSelector);

  function handleSubmit(e) {
    const { phone, name } = e;
    let number = "";

    if (phone.phoneNumber) {
      number = `+${phone.countryCode} (${
        phone.areaCode
      }) ${phone?.phoneNumber?.slice(0, 3)} ${phone?.phoneNumber?.slice(3)}`;
    } else {
      function checkAreaCode(data) {
        if (data.areaCode) {
          return `(${data.areaCode})`;
        }
        return "";
      }
      number = `+${phone.countryCode} ` + checkAreaCode(phone);
    }
    dispatch(addContact({ contacts, name, number })).then((data) => {
      if (!data?.error) {
        formRef.current.resetFields();
      }
    });
  }

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const validator = (_, value) => {
    if (value && !value.valid) {
      return Promise.reject(new Error("Please enter valid phone number"));
    }
    return Promise.resolve();
  };

  return (
    <div style={{ padding: "24px" }}>
      <h2>Contacts</h2>
      <Form ref={formRef} onFinish={handleSubmit} style={{ maxWidth: "350px" }}>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input contact name!",
            },
          ]}
        >
          <Input
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
          />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            {
              required: true,
              message: "Please input contact number!",
            },
            { validator: validator },
          ]}
        >
          <AntdPhoneInput enableSearch />
        </Form.Item>
        <Button htmlType="submit">Add contact</Button>
      </Form>
      {error && <p style={{ color: "red", maxWidth: "300px" }}> {error}</p>}
      {isLoading ? <span>Loading...</span> : <Contacts />}
    </div>
  );
};
