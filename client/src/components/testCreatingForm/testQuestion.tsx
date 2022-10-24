import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Button from '@mui/material/Button';
import { useAppDispatch } from 'src/hooks/hooks';
import { addQuestion } from 'src/store/slices/testSlice';
import styles from './testCreatingForm.module.scss';

interface ITestQuestionProps{
  scrollRef:any;
  index:number;
}
const TestQuestion = ({ scrollRef, index } :ITestQuestionProps) => {
  const dispatch = useAppDispatch();
  const [questionText, setQuestionText] = useState<string>('');
  const [save, setSave] = useState<boolean>(false);
  const [correctAnswerId, setCorrectAnswerId] = useState<number>(1);
  const [answers, setAnswers] = useState<string[]>(['', '', '', '']);
  const onChangeAnswer = (e :React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, i:number) => {
    const newAnswers = answers.map((item, id) => {
      if (id !== i) return item;
      else return e.target.value;
    });
    setAnswers(newAnswers);
  };
  const saveQuestion = () => {
    setSave(true);
    dispatch(addQuestion({
      id: uuid(),
      body: { question: questionText, answers, correctAnswerId: correctAnswerId - 1 },
    }));
  };
  const saveButton = (questionText && answers[0] && answers[1] && answers[2] && answers[3])
    ? <Button color="success" onClick={saveQuestion} variant="contained" size="small">Сохранить</Button>
    : <Button disabled variant="contained" size="small">Сохранить</Button>;

  if (save) {
    return (
      <div className={styles.question_ready}>
        <h5>
          {index}
          )
          {questionText}
        </h5>
      </div>
    );
  }
  return (
    <div ref={scrollRef} className={styles.question}>
      <p>
        Вопрос Номер №
        {index}
      </p>
      <TextField
        id="outlined-basic"
        label="Вопрос"
        variant="outlined"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        size="small"
      />
      <h5>Варианты ответов</h5>
      <div className={styles.question_answers}>
        <input
          value={answers[0]}
          onChange={(e) => onChangeAnswer(e, 0)}
          placeholder="Ответ № 1"
          type="text"
        />
        <input
          value={answers[1]}
          onChange={(e) => onChangeAnswer(e, 1)}
          placeholder="Ответ № 2"
          type="text"
        />
        <input
          value={answers[2]}
          onChange={(e) => onChangeAnswer(e, 2)}
          placeholder="Ответ № 3"
          type="text"
        />
        <input
          value={answers[3]}
          onChange={(e) => onChangeAnswer(e, 3)}
          placeholder="Ответ № 4"
          type="text"
        />
      </div>
      <div className={styles.question_correctAnswerBlock}>
        <h5>Вариант Правильного ответа</h5>
        <input
          value={correctAnswerId}
          onChange={(e) => setCorrectAnswerId(+e.target.value)}
          min={1}
          max={4}
          type="number"
          className={styles.question_correctAnswer}
        />
      </div>
      {saveButton}
    </div>
  );
};
export default TestQuestion;
