import { useSelector, useDispatch } from 'react-redux';
import BlockIcon from '@mui/icons-material/Block';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import { blockUsers, deleteUsers, unblockUsers } from "../../store/user-actions";

const Toolbar = () => {
  const users = useSelector(state => state.user.users);
  const dispatch = useDispatch();

  const deleteHandler = () => {
    dispatch(deleteUsers(users.filter(user => user.isChecked)));
  };

  const blockHandler = () => {
    dispatch(blockUsers(users.filter(user => user.isChecked)));
  };

  const unblockHandler = () => {
    dispatch(unblockUsers(users.filter(user => user.isChecked)));
  }

  return (
    <div className="mb-3">
      <BlockIcon
        fontSize="large"
        sx={{ color: red[500] }}
        style={{cursor: 'pointer'}}
        onClick={blockHandler}
      />
      <LockOpenIcon
        fontSize="large"
        color="success"
        style={{cursor: 'pointer'}}
        onClick={unblockHandler}
      />
      <DeleteIcon
        fontSize="large"
        style={{cursor: 'pointer'}}
        onClick={deleteHandler}
      />
    </div>
  );
};

export default Toolbar;