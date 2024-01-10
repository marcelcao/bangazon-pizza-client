import { clientCredentials } from '../client';

const getOrderCategories = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/ordercategories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getOrderCategories;
