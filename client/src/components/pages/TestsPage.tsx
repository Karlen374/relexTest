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
  const { createTestModal, testPerformanceModal } = useAppSelector((store) => store.test);
  const { tests } = useAppSelector((store) => store.test);
  useEffect(() => {
    const registeredUserData = localStorage.getItem('registeredUserData');
    if (registeredUserData) {
      dispatch(getRegisteredUserData(JSON.parse(registeredUserData)));
      dispatch(getAllTests());
    }
  }, []);
  return (
    <div>
      <TestHeader />
      {tests && <TestList testsData={tests} />}
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
