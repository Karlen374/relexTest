import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
// import { IQuestion } from 'src/types/ITest';
import Button from '@mui/material/Button';
import styles from './testCreatingForm.module.scss';

const TestQuestion = () => {
  // const [question, setQuestion] = useState<IQuestion | null>();
  const [questionText, setQuestionText] = useState<string>('');
  const [correctAnswerId, setCorrectAnswerId] = useState<number>(1);
  const [answers, setAnswers] = useState<string[]>(['', '', '', '']);
  const onChangeAnswer = (e :React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index:number) => {
    const newAnswers = answers.map((item, id) => {
      if (id !== index) return item;
      else return e.target.value;
    });
    setAnswers(newAnswers);
  };
  const saveButton = (questionText && answers[0] && answers[1] && answers[2] && answers[3])
    ? <Button color="success" variant="contained" size="small">Сохранить</Button>
    : <Button disabled variant="contained" size="small">Сохранить</Button>;
  return (
    <div className={styles.question}>
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
