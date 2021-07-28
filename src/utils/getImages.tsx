import axios from 'axios';
//import dummyImage from '../dummyData/dummy-image.json'; // uncomment to use dummy image json rather than querying API

const getImages = async (type: string) => {
  try {
    const response = await axios.get('/' + type);
    //console.log(response);
    const data = await response.data;
    //console.log(response.data);
    //console.log(data[0]);
    //const data = dummyImage;
    const link = data[0].urls.thumb;
    const alt = data[0].alt_description;
    const userName = data[0].user.name;
    const userLink =
      data[0].user.links.html +
      '?utm_source=wordpress_lorem&utm_medium=referral';
    return { link, alt, userName, userLink };
  } catch (error) {
    console.log(error);
    return 'error';
  }
};

export default getImages;
