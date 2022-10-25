import Grid from '@mui/material/Grid';
import { useTransition, animated } from 'react-spring';
import { ITest } from 'src/types/ITest';
import styles from './testList.module.scss';
import TestItem from './testItem/testItem';

interface TestListProps{
  testsData:ITest[];
}

const TestList = ({ testsData }:TestListProps) => {
  const transitions = useTransition(testsData, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 0,
    key: (item:ITest) => item.id,
  });
  return (
    <div className={styles.Test_List}>
      <Grid container spacing={3}>
        <div className="css-zow5z4-MuiGrid-root">
          {transitions(({ opacity }: any, item: any) => (
            <Grid item md={6} sm={6} lg={4} xs={12}>
              <animated.div
                style={{
                  opacity: opacity.to({ output: [0.2, 1], range: [0, 1] }),
                  transition: opacity
                    .to(() => 'opacity 100ms ease-in'),
                }}
              >
                <TestItem
                  key={item?.id}
                  testData={item}
                />
              </animated.div>
            </Grid>
          ))}
        </div>
      </Grid>
    </div>
  );
};
export default TestList;
