const result = {};
const elements = element.querySelectorAll('[data-element]');

for (const subElement of elements) {
  const name = subElement.dataset.element;

  result[name] = subElement;
}

console.log(result);
