import RangePicker from '../../components/range-picker/src/index.js';
import ColumnChart from '../../components/column-chart/src/index.js';

export default class Page {
  element;

  subElements = {};

  components = {};

  updateComponents(from, to) {
    this.components.ordersChart.update(from, to);
  }

  get template() {
    return `<div class="dashboard">
      <div data-element="rangePicker"></div>
      <div data-element="ordersChart" class="dashboard__chart_orders"></div>
    </div>`;
  }

  initComponents() {
    const now = new Date();
    const to = new Date();

    const from = new Date(now.setMonth(now.getMonth() - 1));

    const rangePicker = new RangePicker({ from, to });
    const ordersChart = new ColumnChart({
      url: 'api/dashboard/orders',
      range: {
        from,
        to,
      },
      label: 'order',
      link: '#',
    });

    this.components = {
      rangePicker,
      ordersChart,
    };
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

    this.subElements = this.getSubElements(this.element);

    this.initComponents();

    this.initEventListeners();

    this.renderComponents();

    return this.element;
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  handleDateSelect = event => {
    const { from, to } = event.detail;

    this.updateComponents(from, to);
  };

  initEventListeners() {
    this.components.rangePicker.element.addEventListener('date-select', this.handleDateSelect);
  }

  remove() {
    this.element?.remove();
  }

  destroy() {
    this.remove();
    this.subElements = {};
    this.element = null;
    this.components.rangePicker.element.removeEventListener('date-select', this.handleDateSelect);

    for (const component of Object.values(this.components)) {
      component.destroy();
    }
  }
}
