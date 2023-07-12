import { Button, List, Space } from "antd";
import { useDispatch } from "react-redux";
import { deleteContact, fetchContacts } from "redux/rootOperators";

export const ContactsItem = ({ contact, showModal, setContactId }) => {
  const dispatch = useDispatch();
  return (
    <List.Item style={{ width: "600px" }}>
      <Space
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <b>{contact.name}: </b>
          {contact.number}
        </div>
        <Space>
          <Button
            danger
            onClick={() =>
              dispatch(deleteContact(contact.id)).then(() => {
                dispatch(fetchContacts());
              })
            }
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              setContactId(contact.id);
              showModal();
            }}
          >
            Update
          </Button>
        </Space>
      </Space>
    </List.Item>
  );
};
