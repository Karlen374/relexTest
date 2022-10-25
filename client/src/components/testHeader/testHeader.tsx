import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { changeTestModal } from 'src/store/slices/testSlice';
import styles from './testHeader.module.scss';

const TestHeader = () => {
  const dispatch = useAppDispatch();
  const { registeredUserData } = useAppSelector((store) => store.authorization);
  return (
    <div className={styles.header}>
      <h2>Test Page</h2>
      {registeredUserData?.role === 'ADMIN' && (
      <Button
        variant="contained"
        color="success"
        onClick={() => dispatch(changeTestModal(true))}
      >
        Создать
      </Button>
      )}
    </div>
  );
};
export default TestHeader;
