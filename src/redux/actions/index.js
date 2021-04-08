export const USER_LOGIN = 'USER_LOGIN';
export const CREATE_ASKS = 'CREATE_ASKS';

export const userLogin = (name, email) => ({
  type: USER_LOGIN,
  name,
  email,
});

export const createAsks = (asks) => ({
  type: CREATE_ASKS,
  asks,
});

export const triviaFetching = () => async (dispatch) => {
  const tokenResponse = await fetch('https://opentdb.com/api_token.php?command=request');
  const token = await tokenResponse.json();
  localStorage.setItem('token', token.token);
  const asksResponse = await fetch(`https://opentdb.com/api.php?amount=5&token=${token.token}`);
  const asks = await asksResponse.json();
  dispatch(createAsks(asks.results));
};
