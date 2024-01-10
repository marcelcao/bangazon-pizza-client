import { clientCredentials } from '../client';

const getMenuItems = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/menuitems`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getMenuItems;
