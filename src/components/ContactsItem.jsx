import { useDispatch } from 'react-redux';
import { deleteContact, fetchContacts } from 'redux/operators';

export const ContactsItem = ({ contact }) => {
  const dispatch = useDispatch();

  return (
    <li>
      {contact.name}
      {': '}
      {contact.phone}

      <button
        type="button"
        onClick={() =>
          dispatch(deleteContact(contact.id)).then(() => {
            dispatch(fetchContacts());
          })
        }
      >
        Delete
      </button>
    </li>
  );
};
