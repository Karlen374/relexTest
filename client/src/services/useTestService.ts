import { useHttp } from 'src/hooks/useHttp';
import { ITest } from 'src/types/ITest';

const useTestServices = () => {
  const _apiBase = 'http://localhost:5000/test';
  const { request } = useHttp();

  const createNewTest = async (data:ITest) => {
    const res = await request(`${_apiBase}/createTest`, 'POST', JSON.stringify(data));
    return res;
  };
  const getTests = async () => {
    const res = await request(`${_apiBase}/getTests`, 'GET');
    return res;
  };
  const changeStatus = async (id:string) => {
    const res = await request(`${_apiBase}/changeStatus`, 'PUT', JSON.stringify({ testId: id }));
    return res;
  };
  return {
    createNewTest,
    getTests,
    changeStatus,
  };
};

export default useTestServices;
