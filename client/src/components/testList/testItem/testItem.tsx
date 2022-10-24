import { ITest } from 'src/types/ITest';
import React from 'react';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from 'src/hooks/hooks';
import { changeTestPerformanceModal, changeTestStatus } from 'src/store/slices/testSlice';
import styles from './testItem.module.scss';

interface TestItemProps{
  testData: ITest;
}

const TestItem = ({ testData }:TestItemProps) => {
  const dispatch = useAppDispatch();
  const handleChange = () => {
    dispatch(changeTestStatus(testData.id));
  };
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
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
        <Typography>отключить</Typography>
        <Switch
          checked={testData.status}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <Typography>включить</Typography>
      </Stack>
      <Button
        variant="contained"
        color="success"
        onClick={() => dispatch(changeTestPerformanceModal(true))}
      >
        Начать тест
      </Button>
    </div>
  );
};
export default TestItem;
