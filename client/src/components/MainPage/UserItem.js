import { useDispatch } from 'react-redux';
import { userActions } from '../../store/user-slice';

const UserItem = ({ info }) => {
  const dispatch = useDispatch();

  const changeHandler = () => {
    dispatch(userActions.toggleUser({ id: info.id }))
  };

  return (
    <tr>
      <td>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={changeHandler}
            checked={info.isChecked}
          />
        </div>
      </td>
      <td>{info.id}</td>
      <td>{info.name}</td>
      <td>{info.email}</td>
      <td>{new Date(info.registrationDate).toUTCString()}</td>
      <td>{new Date(info.lastLoginDate).toUTCString()}</td>
      <td>{info.isBlocked ? 'Blocked' : 'non-Blocked'}</td>
    </tr>
  );
};

export default UserItem;