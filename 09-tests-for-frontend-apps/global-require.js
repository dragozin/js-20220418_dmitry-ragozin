function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`);
      }
    },
    toEqual(expected) {},
    toBeGreaterThan(expected) {},
  };
}

function test(title, callback) {
  try {
    callback();
    console.log(`\u2713${title}`);
  } catch (error) {
    console.error(`\u274c${title}`);
    console.error(error);
  }
}

global.test = test;
global.expect = expect;
