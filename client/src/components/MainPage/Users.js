import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import UserItem from "./UserItem";
import { getUsers } from "../../store/user-actions";
import { userActions } from "../../store/user-slice";

const Users = () => {
  const users = useSelector(state => state.user.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const toggleAllHandler = event => {
    dispatch(userActions.toggleAllUsers({ checked: event.target.checked }));
  };

  return (
    <table className="table table-hover table-bordered">
      <thead>
      <tr>
        <th>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={users.every(user => user.isChecked)}
              onChange={toggleAllHandler}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Select All
            </label>
          </div>
        </th>
        <th>Id</th>
        <th>Name</th>
        <th>Email</th>
        <th>Registration Date</th>
        <th>Last Login Date</th>
        <th>Status</th>
      </tr>
      </thead>
      <tbody>
      {users.map(user => <UserItem
        key={user.id}
        info={user}
        isChecked={user.isChecked}
      />)}
      </tbody>
    </table>
  );
};

export default Users;