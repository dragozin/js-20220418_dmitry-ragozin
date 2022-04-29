class MyComponent {
    constructor() {
        this.parentProp = 'parent';
    }

    hello() {
        console.log('hello from parent');
    }
}

class Component extends MyComponent {
    constructor() {
        super();
        this.prop = 'test';
    }

    hello() {
        super.hello();
    }
}

const user = new Component();

console.log(user.hello());
