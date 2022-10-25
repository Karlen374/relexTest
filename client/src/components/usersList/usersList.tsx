import { IRegisteredUser } from 'src/types/IRegisteredUsers';
import Grid from '@mui/material/Grid';
import { useTransition, animated } from 'react-spring';
import UserItem from './userItem/userItem';
import styles from './usersList.module.scss';

interface UserListProps {
  usersData: IRegisteredUser[];
}

const UserList = ({ usersData }:UserListProps) => {
  const transitions = useTransition(usersData, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 0,
    key: (item:IRegisteredUser) => item.id,
  });

  return (
    <div className={styles.user_List}>
      <Grid container spacing={3}>
        <div className="css-zow5z4-MuiGrid-root">
          {transitions(({ opacity }: any, item: any) => (
            <Grid item md={6} sm={6} lg={6} xs={12}>
              <animated.div
                style={{
                  opacity: opacity.to({ output: [0.2, 1], range: [0, 1] }),
                  transition: opacity
                    .to(() => 'opacity 100ms ease-in'),
                }}
              >
                <UserItem
                  key={item?.id}
                  userData={item}
                />
              </animated.div>
            </Grid>
          ))}
        </div>
      </Grid>
    </div>
  );
};
export default UserList;
