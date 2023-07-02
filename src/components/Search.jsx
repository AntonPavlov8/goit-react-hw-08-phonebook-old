import { useDispatch } from 'react-redux';
import { changeFilter } from 'redux/reducer';

export const Search = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <input
        type="text"
        name="search"
        onChange={e => dispatch(changeFilter(e.target.value.trim()))}
      />
    </div>
  );
};
