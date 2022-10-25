import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { getRegisteredUserData } from 'src/store/slices/authorizationSlice';
import TestList from 'src/components/testList/testList';
import TestHeader from 'src/components/testHeader/testHeader';
import Modal from 'src/components/modal/modal';
import TestCreatingForm from 'src/components/testCreatingForm/testCreatingForm';
import { getAllTests } from 'src/store/slices/testSlice';
import TestPerformanceForm from 'src/components/testPerformanceForm/testPerformance';

const TestsPage = () => {
  const dispatch = useAppDispatch();
  const { createTestModal, testPerformanceModal, tests } = useAppSelector((store) => store.test);
  const { registeredUserData } = useAppSelector((store) => store.authorization);
  useEffect(() => {
    const registeredUser = localStorage.getItem('registeredUserData');
    if (registeredUser) {
      dispatch(getRegisteredUserData(JSON.parse(registeredUser)));
      dispatch(getAllTests());
    }
  }, []);
  if (!registeredUserData || !tests) {
    return (
      <h2>
        для получения  полного доступа нужно зарегистрироваться
      </h2>
    );
  }
  return (
    <div>
      <TestHeader />
      <TestList testsData={tests} />
      <Modal active={createTestModal}>
        <TestCreatingForm />
      </Modal>
      <Modal active={testPerformanceModal}>
        <TestPerformanceForm />
      </Modal>
    </div>
  );
};
export default TestsPage;
