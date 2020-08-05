function gen() {
  return;
}

(g) =>
  ((f) => f(f))((self) => g((...args) => self(self).apply(this, args)))(
    (self) => {
      return (n) => (n > 0 ? gen()(n - 1) + n : 0);
    }
  )(100);
