import { IRegisteredUser } from 'src/types/IRegisteredUsers';
import { ITestResultData } from 'src/types/ITestResultData';
import styles from './userItem.module.scss';
import UserTest from './userTest';

interface UserItemProps{
  userData:IRegisteredUser;
}
const UserItem = ({ userData }:UserItemProps) => {
  return (
    <div className={styles.userItem}>
      <h3>
        Имя пользователя -
        {userData.name}
      </h3>
      <h4>Пройденные тесты этого пользователя:</h4>
      <div>
        {userData.testsData.map((item:ITestResultData) => <UserTest key={item.testStartTime} testData={item} />)}
      </div>
    </div>
  );
};
export default UserItem;
