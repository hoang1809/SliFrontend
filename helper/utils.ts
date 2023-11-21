export const isServer = (): boolean => typeof window === 'undefined';

export const sayHello = () => {
  const currentHours = new Date().getHours();
  if (currentHours < 13) {
    return 'GOOD MORNING!';
  } else if (currentHours < 18) {
    return 'GOOD AFTERNOON!';
  } else {
    return 'GOOD EVENING!';
  }
};
