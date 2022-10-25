import { IQuestion } from 'src/types/ITest';
import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { changeSelectedAnswer } from 'src/store/slices/testSlice';
import styles from './testPerformance.module.scss';

interface TestQuestionProps{
  data: IQuestion;
  index: number;
  scrollRef: any;
}

const Question = ({ data, index, scrollRef } :TestQuestionProps) => {
  const [value, setValue] = useState('female');
  const dispatch = useAppDispatch();
  const { testAnswers } = useAppSelector((store) => store.test);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    if (testAnswers) {
      let newTestAnswers = testAnswers;
      newTestAnswers = newTestAnswers.map((item, id) => {
        if (id !== index) return item;
        else return Number(event.target.value);
      });
      dispatch(changeSelectedAnswer(newTestAnswers));
    }
  };
  return (
    <div ref={scrollRef} className={styles.questions}>
      <h5>
        {index + 1}
        )
        {data.body.question}
      </h5>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        row
        sx={{ justifyContent: 'center' }}
        onChange={handleChange}
      >
        <FormControlLabel value={0} control={<Radio />} label={data.body.answers[0]} />
        <FormControlLabel value={1} control={<Radio />} label={data.body.answers[1]} />
        <FormControlLabel value={2} control={<Radio />} label={data.body.answers[2]} />
        <FormControlLabel value={3} control={<Radio />} label={data.body.answers[3]} />
      </RadioGroup>
    </div>
  );
};
export default Question;
