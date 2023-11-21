const delayMs = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('ok');
    }, ms);
  });
};

export default delayMs;
