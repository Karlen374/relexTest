import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import Button from '@mui/material/Button';
import { useRef } from 'react';
import { addResult } from 'src/store/slices/authorizationSlice';
import { changeTestPerformanceModal } from 'src/store/slices/testSlice';
import Question from './question';
import styles from './testPerformance.module.scss';

const TestPerformanceForm = () => {
  const { selectedTest, testStartTime, testAnswers } = useAppSelector((store) => store.test);
  const { registeredUserData } = useAppSelector((store) => store.authorization);
  const dispatch = useAppDispatch();
  const scrollRef = useRef(null);
  const saveTestResult = () => {
    if (testAnswers && selectedTest && registeredUserData && testStartTime) {
      let correctAnswersCount = 0;
      for (let i = 0; i < testAnswers?.length; i++) {
        if (testAnswers[i] === selectedTest.questions[i].body.correctAnswerId) correctAnswersCount++;
      }
      dispatch(addResult({
        userId: registeredUserData.id,
        testId: selectedTest?.id,
        testName: selectedTest.name,
        testStartTime,
        testEndTime: String(new Date()),
        correctAnswersCount,
        generalAnswerCount: selectedTest?.questions.length,
      }));
      dispatch(changeTestPerformanceModal(false));
    }
  };
  return (
    <div className={styles.test}>
      <h3>{selectedTest?.name}</h3>
      {selectedTest && (
      <div className={styles.test_question}>
        {selectedTest.questions.map((item, id) => <Question scrollRef={scrollRef} index={id} key={item.id} data={item} />)}
      </div>
      )}
      <div className={styles.test_buttons}>
        <Button color="error" variant="outlined">Отменить</Button>
        <Button color="success" onClick={saveTestResult} variant="outlined">Сохранить</Button>
      </div>
    </div>
  );
};
export default TestPerformanceForm;
