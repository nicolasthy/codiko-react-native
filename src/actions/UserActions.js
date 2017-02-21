import { Actions } from 'react-native-router-flux';
import { apiRequest, checkStatus } from './api';

import {
  FETCH_CURRENT_USER
} from './types';

const getCurrentUser = (token, getState) => {
  const { host: apiHost, path: apiPath, headers } = getState().api.endpoint;
  const endpoint = `${apiHost}/api/users/me?access_token=${token}&included=*`;

  return apiRequest(endpoint, {
    headers,
    method: 'GET',
  });
}

export const fetchCurrentUser = (token) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      getCurrentUser(token, getState)
        .then(response => response.json())
        .then(({ data }) => {
          dispatch({ type: FETCH_CURRENT_USER, payload: data });
        })
    });
  };
}
