import { useAppSelector } from 'src/hooks/hooks';
import Modal from 'src/components/modal/modal';
import SignUpForm from 'src/components/signUpForm/SignUpForm';
import SignInForm from 'src/components/signInForm/signInForm';

const AuthorizationModals = () => {
  const { signUpModal, signInModal } = useAppSelector((store) => store.authorization);
  return (
    <>
      <Modal active={signUpModal}>
        <SignUpForm />
      </Modal>
      <Modal active={signInModal}>
        <SignInForm />
      </Modal>
    </>
  );
};
export default AuthorizationModals;
