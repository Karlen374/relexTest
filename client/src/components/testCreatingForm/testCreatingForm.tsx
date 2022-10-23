import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import styles from './testCreatingForm.module.scss';
import TestQuestion from './testQuestion';

const TestCreatingForm = () => {
  const [name, setName] = useState<string>('');
  const onChangeName = (e :React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
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
      <TestQuestion />
    </div>
  );
};
export default TestCreatingForm;
