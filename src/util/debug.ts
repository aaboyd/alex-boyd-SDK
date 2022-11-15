import type { Axios } from 'axios';

export const addAxiosDebugLogger = (axios: Axios) => {
  axios.interceptors.request.use((x) => {
    console.log(`${new Date().toLocaleString()} | Request : ${x.method?.toUpperCase()} | ${x.url}`);

    return x;
  });

  axios.interceptors.response.use((x) => {
    console.log(
      `${new Date().toLocaleString()} | Response: ${x.status} | ${JSON.stringify(x.data)}`
    );

    return x;
  });
};
