import axios from 'axios';

const post = (url: string, payload?: any) => {
  return axios.post(url, {
    ...payload,
  })
};

const get = (url: string, payload?: any) => {
  return axios.get(url, {
    ...payload,
  })
};

const useRequest = () => {
  return {
    get,
    post
  }
};

export default useRequest;