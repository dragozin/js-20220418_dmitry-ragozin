export default class Page {
  element;

  subElements = {};

  components = {};

  get template() {
    return `<div>Not found</div>`;
  }

  renderComponents() {
    Object.keys(this.components).forEach(component => {
      const root = this.subElements[component];

      const { element } = this.components[component];

      root.append(element);
    });
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = this.template;

    this.element = element.firstElementChild;

    return this.element;
  }

  remove() {
    this.element?.remove();
  }

  destroy() {
    this.remove();
  }
}
