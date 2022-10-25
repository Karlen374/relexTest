import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { getRegisteredUserData, getUsers } from 'src/store/slices/authorizationSlice';
import UserList from 'src/components/usersList/usersList';
import { useEffect } from 'react';

const UsersPage = () => {
  const dispatch = useAppDispatch();
  const { registeredUserData, registeredUsers } = useAppSelector((store) => store.authorization);
  useEffect(() => {
    const registeredUser = localStorage.getItem('registeredUserData');
    if (registeredUser) {
      dispatch(getRegisteredUserData(JSON.parse(registeredUser)));
      dispatch(getUsers());
    }
  }, []);
  if (registeredUserData?.role !== 'ADMIN') return <h1>У Вас нет доступа !</h1>;
  return (
    <div>
      {(registeredUserData && registeredUsers) && <UserList usersData={registeredUsers} />}
    </div>
  );
};
export default UsersPage;
