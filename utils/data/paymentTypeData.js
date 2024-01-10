import { clientCredentials } from '../client';

const getPaymentTypes = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/paymenttypes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getPaymentTypes;
