import axios from 'axios';

export const axiosPost = (url, requestData, callBack) => {
  console.log('Calling Start');
  console.log(url);
  console.log(requestData);

  return axios
    .post(url, requestData, {
      headers: {
        'conent-type': 'application/json',
      },
    })
    .then(function (response) {
      response =
        typeof response.data === 'string'
          ? JSON.parse(response.data.trim())
          : response.data;
      callBack(response);
      console.log('Calling End from then : ', response);
      return response;
    })
    .catch((error) => {
      callBack(error);
      console.log('Calling End from catch : ', error);
      return error;
    });
};

export const axiosDelete = (url, callBack) => {
  console.log('Calling Start');
  console.log(url);
  return axios
    .delete(url, {
      headers: {
        'conent-type': 'application/json',
      },
    })
    .then(function (response) {
      response =
        typeof response.data === 'string'
          ? JSON.parse(response.data.trim())
          : response.data;
      callBack(response);
      console.log('Calling End from then : ', response);
      return response;
    })
    .catch((error) => {
      callBack(error);
      console.log('Calling End from catch : ', error);
      return error;
    });
};

export const axiosGet = (url,callBack) => {
  console.log('Calling Start');
  console.log(url);
  return axios
    .get(url)
    .then(function (response) {
      response =
        typeof response.data === 'string'
          ? JSON.parse(response.data.trim())
          : response.data;
      callBack(response);
    })
    .catch((error) => {
      callBack(error);
    });
};

export const axiosMultiPart = (url, requestData, callBack) => {
  console.log('Calling Start');
  console.log(url);
  return axios
    .post(url, requestData, {
      headers: {'Content-Type': 'multipart/form-data' },
    })
    .then(function (response) {
      response =
        typeof response.data === 'string'
          ? JSON.parse(response.data.trim())
          : response.data;
      callBack(response);
      console.log('Calling End from then : ', response);
      return response;
    })
    .catch((error) => {
      callBack(error);
      console.log('Calling End from catch : ', error);
      return error;
    });
};

export const axiosAll = (request1, request2) => {
  return axios.all([request1, request2]).then(
    axios.spread(function (response1, response2) {
      return {response1, response2};
    }),
  );
};
