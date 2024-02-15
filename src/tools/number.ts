const random = (max: number, min: number  = 0) => Math.round(Math.random() * (max - min) + min);

export default {
  random,
};