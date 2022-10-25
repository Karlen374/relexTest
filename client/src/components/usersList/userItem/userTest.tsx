import { ITestResultData } from 'src/types/ITestResultData';
import styles from './userItem.module.scss';

interface IUserTest{
  testData:ITestResultData;
}
const UserTest = ({ testData }: IUserTest) => {
  let style = styles.userTest;
  if (testData.correctAnswersCount / testData.generalAnswerCount >= 0.8) {
    style = styles.userTest_good;
  }
  if (testData.correctAnswersCount / testData.generalAnswerCount < 0.8) {
    style = styles.userTest_normally;
  }
  if (testData.correctAnswersCount / testData.generalAnswerCount < 0.4) {
    style = styles.userTest_bad;
  }
  return (
    <div className={style}>
      <h4>
        Название теста:
        {' '}
        {testData.testName}
      </h4>
      <p>
        время начала теста -
        {' '}
        {testData.testStartTime.slice(0, 21)}
      </p>
      <p>
        затраченное время на тест -
        {testData.testEndTime}
        {' '}
        мин.
      </p>
      <p>
        Количество Правильных ответов -
        {' '}
        {testData.correctAnswersCount}
        /
        {testData.generalAnswerCount}
      </p>
    </div>
  );
};
export default UserTest;
