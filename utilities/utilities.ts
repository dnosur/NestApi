export const sendAnswer = (promise: Promise<any>) => {
  return promise
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};
