const CHART_HEIGHT = 50;

export default class ColumnChart {
    chartHeight = CHART_HEIGHT;

    constructor({
        data = [],
        label = '',
        value = 0,
        link = '#',
        formatHeading = value => value,
    } = {}) {
        this.data = data;
        this.label = label;
        this.value = formatHeading
            ? formatHeading(value)
            : value;
        this.link = link;

        this.render();
    }

    update(data = []) {
        this.data = data;
        const body = this.element?.querySelector(
            '[data-element=body]'
        );
        if (body) {
            body.innerHTML = this.getBodyTemplate();
        }
    }

    getBodyTemplate() {
        const maxValue = Math.max(...this.data);

        return this.data.reduce(
            (accumulator, item) =>
                accumulator +
                `
            <div style="--value: ${Math.floor(
                (item / maxValue) * this.chartHeight
            )}" data-tooltip="${Math.round(
                    (item / maxValue) * 100
                )}%"></div>
        `,
            ''
        );
    }

    getTemplate() {
        return `
        <div class="column-chart" style="--chart-height:${
            this.chartHeight
        }">
            <div class="column-chart__title">
                Total ${this.label}
                ${
                    this.link
                        ? `<a href="${this.link}" class="column-chart__link">View all</a>`
                        : ''
                }
            </div>
            <div class="column-chart__container">
            <div data-element="header" class="column-chart__header">${
                this.value
            }</div>
            <div data-element="body" class="column-chart__chart">
                ${this.getBodyTemplate()}
            </div>
        </div>`;
    }

    render() {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = this.getTemplate();
        if (!this.data?.length) {
            wrapper.firstElementChild.classList.add(
                'column-chart_loading'
            );
        }

        this.element = wrapper.firstElementChild;
    }

    destroy() {
        this.remove();
        this.element = null;
    }

    remove() {
        this.element?.remove();
    }
}
