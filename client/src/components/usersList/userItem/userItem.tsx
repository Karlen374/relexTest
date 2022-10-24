import { IRegisteredUser } from 'src/types/IRegisteredUsers';
import styles from './userItem.module.scss';

interface UserItemProps{
  userData:IRegisteredUser;
}
const UserItem = ({ userData }:UserItemProps) => {
  return (
    <div className={styles.userItem}>
      <h1>{userData.name}</h1>
    </div>
  );
};
export default UserItem;
