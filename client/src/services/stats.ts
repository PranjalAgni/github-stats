import { GithubStats } from '../interfaces/';

const fetchGithubStats = async (username: string): Promise<GithubStats[]> => {
  const API_URL = `${process.env.REACT_APP_API_URL}/github/stats/${username}`;
  let results = [];
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
    });
    const data = await response.json();
    if (response.ok) {
      results = data.result;
    } else {
      console.log(`Error occured: ${data.error}`);
    }
  } catch (error) {
    console.error(error);
  }

  return results;
};

export default fetchGithubStats;
