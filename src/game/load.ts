export {};

declare global {
  interface Array<T> {
    draw(): T;
    intersect(fn: (a: T, b: T) => void, forEach?: (i: T) => void): void;
  }  
}

Array.prototype.draw = function() {
  return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.intersect = function(fn, forEach = () => {}) {
  for (let i = 0; i < this.length; i++) {
    forEach(this[i]);
    for (let j = i + 1; j < this.length; j++) {
      fn(this[i], this[j]);
    }
  }
};
