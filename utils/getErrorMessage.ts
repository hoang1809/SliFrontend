import get from 'lodash/get';
const getErrorMessage = (error: any) => {
  const errorMessage = get(error, 'response.data.message[0]');
  if (errorMessage && typeof errorMessage === 'object') {
    return errorMessage;
  } else {
    return get(error, 'response.data.message', get(error, 'message'));
  }
};

export default getErrorMessage;
