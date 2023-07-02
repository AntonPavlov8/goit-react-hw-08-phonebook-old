import { useSelector } from 'react-redux';
import { ContactsItem } from './ContactsItem';
import validator from 'validator';
import { Search } from './Search';

export const Contacts = prop => {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filter);

  const showContacts = () => {
    function searchingResults() {
      function checkType(contact) {
        if (validator.isNumeric(filter)) {
          return contact.phone;
        }
        return contact.name;
      }
      return contacts.filter(contact => {
        return checkType(contact).includes(filter);
      });
    }

    let data = '';
    filter.length > 0 ? (data = searchingResults()) : (data = contacts);

    return data.length === 0 ? (
      <li>
        No contacts {filter.length > 0 && ' found with this name or number'}
      </li>
    ) : (
      data.map(contact => <ContactsItem key={contact.id} contact={contact} />)
    );
  };

  return (
    <div>
      <h4>Contacts</h4>
      <Search state={prop.state} />
      <ul
        style={{
          width: '300px',
          fontSize: '22px',
          padding: '0',
          listStyle: 'none',
        }}
      >
        {showContacts()}
      </ul>
    </div>
  );
};
