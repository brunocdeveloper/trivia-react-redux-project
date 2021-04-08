const fetchGravatar = async (hash) => {
  const responseGravatar = await fetch(`https://www.gravatar.com/avatar/${hash}`);
  const gravatar = await responseGravatar.json();
  return gravatar;
};

export default fetchGravatar;
