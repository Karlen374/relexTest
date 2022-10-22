import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import styles from './appHeader.module.scss';

const AppNavigation = () => {
  return (
    <div className={styles.navigation}>
      <Link to="/">
        <Button color="secondary">Тесты</Button>
      </Link>
      <Link to="/userPage">
        <Button color="secondary">Пользователи</Button>
      </Link>
    </div>
  );
};
export default AppNavigation;
