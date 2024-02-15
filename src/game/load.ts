export {};

declare global {
  interface Array<T> {
    draw(): T;
  }  
}

Array.prototype.draw = function() {
  return this[Math.floor(Math.random() * this.length)];
};
