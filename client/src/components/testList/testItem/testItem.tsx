import { ITest } from 'src/types/ITest';
import React from 'react';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import {
  changeTestPerformanceModal,
  changeTestStatus,
  delTestById,
  getSelectedTestData,
} from 'src/store/slices/testSlice';
import styles from './testItem.module.scss';

interface TestItemProps{
  testData: ITest;
}

const TestItem = ({ testData }:TestItemProps) => {
  const dispatch = useAppDispatch();
  const { registeredUserData } = useAppSelector((store) => store.authorization);
  const handleChange = () => {
    dispatch(changeTestStatus(testData.id));
  };
  const startTest = () => {
    dispatch(changeTestPerformanceModal(true));
    dispatch(getSelectedTestData(testData));
  };
  const delTest = () => {
    dispatch(delTestById(testData.id));
  };
  const startButton = (testData.status === true)
    ? (
      <Button
        variant="contained"
        color="success"
        onClick={startTest}
      >
        Начать тест
      </Button>
    )
    : (
      <Button
        variant="contained"
        color="error"
        disabled
      >
        Тест заблокирован
      </Button>
    );
  const testButton = (registeredUserData?.role === 'ADMIN')
    ? (
      <>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
          <Typography>отключить</Typography>
          <Switch
            checked={testData.status}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <Typography>включить</Typography>
        </Stack>
        <Button variant="contained" color="error" onClick={delTest}>
          Удалить тест
        </Button>
      </>
    ) : startButton;

  return (
    <div className={styles.testItem}>
      <h1>
        Название теста -
        {' '}
        {testData.name}
      </h1>
      <h5>
        Количество Вопросов -
        {' '}
        {testData.questions.length}
      </h5>
      {testButton}
    </div>
  );
};
export default TestItem;
