export default class Router {
  constructor() {
    this.routes = [];

    this.initEventListeners();
  }

  static instance() {
    if (!Router._instance) {
      Router._instance = new Router();
    }

    return this._instance;
  }

  navigate(path) {
    history.pushState(null, '', path);

    this.route();
  }

  addRoute(pattern, path) {
    this.routes.push({ pattern, path });

    return this;
  }

  listen() {
    window.addEventListener('popstate', () => {
      this.route();
    });

    this.route();
  }

  async route() {
    const path = window.location.pathname;

    let foundPath;

    for (const route of this.routes) {
      const match = path.match(route.pattern);

      if (match) {
        foundPath = route.path;
        break;
      }
    }

    const { default: Page } = await import(foundPath ?? this.notFoundPagePath);

    const page = new Page();
    this.page?.destroy();

    this.page = page;

    const element = await page.render();

    const contentNode = document.getElementById('content');

    contentNode.append(element);
  }

  setNotFoundPagePath(path) {
    this.notFoundPagePath = path;

    return this;
  }

  initEventListeners() {
    document.addEventListener('click', event => {
      const link = event.target.closest('a');

      if (!link) {
        return;
      }

      const href = link.getAttribute('href');

      if (href && href.startsWith('/')) {
        event.preventDefault();

        this.navigate(href);
      }
    });
  }
}
