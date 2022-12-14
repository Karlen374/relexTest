import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { openSignInModal, signOut } from 'src/store/slices/authorizationSlice';
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';
import styles from './appHeader.module.scss';
import AppNavigation from './appNavigation';
import AuthorizationModals from './authorizationModal';

const AppHeader = () => {
  const dispatch = useAppDispatch();
  const { registeredUserData } = useAppSelector((store) => store.authorization);
  return (
    <header className={styles.header}>
      <AppNavigation />
      {!registeredUserData && (
      <Button
        onClick={() => dispatch(openSignInModal())}
        color="success"
        variant="outlined"
      >
        Вход
      </Button>
      )}
      {registeredUserData
      && (
      <div>
        <Chip
          sx={{ color: '#fff' }}
          icon={<FaceIcon sx={{ color: '#fff' }} />}
          label={registeredUserData?.name}
          variant="outlined"
        />
        <Button
          onClick={() => dispatch(signOut())}
          color="error"
        >
          Выйти
        </Button>
      </div>
      )}
      <AuthorizationModals />
    </header>
  );
};
export default AppHeader;
