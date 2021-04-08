export const fetchToken = async () => {
  try {
    const tokenResponse = await fetch('https://opentdb.com/api_token.php?command=request');
    const token = await tokenResponse.json();
    return token;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAsks = async () => {
  try {
    const generateToken = await fetchToken();
    localStorage.setItem('token', generateToken.token);
    const asksResponse = await fetch(`https://opentdb.com/api.php?amount=5&token=${generateToken.token}`);
    const asks = await asksResponse.json();
    return asks;
  } catch (error) {
    console.error(error);
  }
};
