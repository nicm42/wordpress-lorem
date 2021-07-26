import axios from 'axios';

const getPosts = async () => {
  const link =
    'https://public-api.wordpress.com/rest/v1.1/sites/nictesting935058505.wordpress.com/posts/?pretty=true';
  // Uncomment below to test errors
  //const link = 'http://httpstat.us/404';
  try {
    //const response = await fetch(link);
    //console.log(response);
    //const data = await response.json();
    const data = await axios.get(link);
    //console.log(data.posts);
    return data;
  } catch (error) {
    console.log(error);
    return 'error';
  }
};

export default getPosts;
