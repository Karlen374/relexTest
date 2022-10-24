import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { getRegisteredUserData, getUsers } from 'src/store/slices/authorizationSlice';
import UserList from 'src/components/usersList/usersList';
import { useEffect } from 'react';

const UsersPage = () => {
  const dispatch = useAppDispatch();
  const { registeredUsers } = useAppSelector((store) => store.authorization);
  useEffect(() => {
    const registeredUserData = localStorage.getItem('registeredUserData');
    if (registeredUserData) {
      dispatch(getRegisteredUserData(JSON.parse(registeredUserData)));
      dispatch(getUsers());
    }
  }, []);
  return (
    <div>
      {registeredUsers && <UserList usersData={registeredUsers} />}
    </div>
  );
};
export default UsersPage;
