import { clientCredentials } from '../client';

const getOrders = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getOrders;
