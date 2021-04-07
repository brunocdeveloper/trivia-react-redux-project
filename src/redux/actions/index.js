import { fetchAsks } from '../../services/triviaApi';

export const USER_LOGIN = 'USER_LOGIN';

export const userLogin = (name, email) => ({
  type: USER_LOGIN,
  name,
  email,
});

export const triviaFetching = () => async (dispatch) => {
  const asks = await fetchAsks();
  dispatch(asks);
};
