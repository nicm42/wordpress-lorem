import axios from 'axios';

const getPosts = async () => {
  const link =
    'https://public-api.wordpress.com/rest/v1.1/sites/nictesting935058505.wordpress.com/posts/?pretty=true';
  // Uncomment below to test errors
  //const link = 'http://httpstat.us/404';
  try {
    const response = await axios.get(link);
    //console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return 'error';
  }
};

export default getPosts;
