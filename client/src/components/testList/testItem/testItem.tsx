import { ITest } from 'src/types/ITest';
import styles from './testItem.module.scss';

interface TestItemProps{
  testData: ITest;
}

const TestItem = ({ testData }:TestItemProps) => {
  return (
    <div className={styles.testItem}>
      <h1>{testData.questions[0].body.question}</h1>
    </div>
  );
};
export default TestItem;
