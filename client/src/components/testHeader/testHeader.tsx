import Button from '@mui/material/Button';
import { useAppDispatch } from 'src/hooks/hooks';
import { changeTestModal } from 'src/store/slices/testSlice';
import styles from './testHeader.module.scss';

const TestHeader = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.header}>
      <h2>Test Page</h2>
      <Button
        variant="contained"
        color="success"
        onClick={() => dispatch(changeTestModal(true))}
      >
        Создать
      </Button>
    </div>
  );
};
export default TestHeader;
