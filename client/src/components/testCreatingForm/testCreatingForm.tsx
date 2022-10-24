import TextField from '@mui/material/TextField';
import React, { useRef, useState } from 'react';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import { changeTestModal, createTest } from 'src/store/slices/testSlice';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { v4 as uuid } from 'uuid';
import styles from './testCreatingForm.module.scss';
import TestQuestion from './testQuestion';

const TestCreatingForm = () => {
  const dispatch = useAppDispatch();
  const { questions } = useAppSelector((store) => store.test);
  const [name, setName] = useState<string>('');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [showQuestions, setShowQuestions] = useState<boolean>(false);
  const [questionArray, setQuestionArray] = useState<number[]>([1, 2, 3, 4, 5]);
  const scrollRef = useRef(null);
  const onChangeName = (e :React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setQuestionCount(newValue);
    }
  };
  const saveQuestionCount = () => {
    setShowQuestions(true);
    const arr = [];
    for (let i = 1; i <= questionCount; i++) {
      arr.push(i);
    }
    setQuestionArray(arr);
  };
  const cancelTestCreating = () => {
    setShowQuestions(false);
    dispatch(changeTestModal(false));
  };
  const addNewTest = () => {
    if (questions) {
      dispatch(createTest({
        id: uuid(), status: true, name, questions,
      }));
    }
    dispatch(changeTestModal(false));
  };
  const saveButton = (questions && questions.length > 4 && name)
    ? <Button color="success" onClick={addNewTest} variant="outlined">Сохранить</Button>
    : <Button color="success" disabled variant="outlined">Сохранить</Button>;
  return (
    <div className={styles.test}>
      <TextField
        id="outlined-basic"
        label="Название теста"
        variant="outlined"
        value={name}
        onChange={onChangeName}
        sx={{ marginBottom: 3 }}
      />
      {!showQuestions && (
        <>
          <h4>Выберите количество вопросов</h4>
          <Slider
            aria-label="Always visible"
            onChange={handleChange}
            step={1}
            min={5}
            max={15}
            value={questionCount}
            valueLabelDisplay="auto"
          />
          <Button onClick={saveQuestionCount} variant="outlined">Сохранить</Button>
        </>
      )}
      {showQuestions && (
      <div className={styles.test_question}>
        {questionArray.map((item) => <TestQuestion scrollRef={scrollRef} key={item} index={item} />)}
      </div>
      )}
      <div className={styles.test_buttons}>
        <Button color="error" onClick={cancelTestCreating} variant="outlined">Отменить</Button>
        {saveButton}
      </div>
    </div>
  );
};
export default TestCreatingForm;
