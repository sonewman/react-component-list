const React = require('react');
const createElement = React.createElement;
const cloneElement = React.cloneElement;
const COMPONENT_LIST_TYPE = Symbol('@@ComponentList');

function createClone(Comp, children, st, en) {
  const newWrap = createListWrap(Comp);
  
  for (let i = st - 1; ++i <= en;)
    newWrap.push(children[i]);

  return newWrap;
}

function createListWrap(Comp) {
  let key = -1;
  const components = [];
  const ComponentList = props => createElement(Comp, props, components);
  ComponentList.type = COMPONENT_LIST_TYPE;

  function iterateAdd(args, cb) {
    for (let i = -1; ++i < args.length;)
      cb(cloneElement(args[i], { key: ++key }));
    return args.length;
  }

  ComponentList.push = function push_() {
    return iterateAdd(arguments, el => components.push(el));
  };

  ComponentList.pop = function pop_() {
    return components.pop();
  };

  ComponentList.shift = function shift_() {
    return components.shift();
  };

  ComponentList.unshift = function unshift_() {
    return iterateAdd(arguments, el => components.unshift(el));
  };

  ComponentList.slice = function slice_(st, en) {
    st = st || 0;
    en = en || components.length - 1;
    return createClone(Comp, components, st, en);
  };

  function append(r, n) {
    if (n.type && n.type === COMPONENT_LIST_TYPE) {
      const c = n.slice();
      for (let i = -1; ++i < c.length;)
        r.push(c);
    } else {
      r.push(n);
    }
  }

  ComponentList.concat = function concat_() {
    const clone = createClone(Comp, components, 0, components.length - 1);

    for (let i = -1; ++i < arguments.length;) {
      if (Array.isArray(arguments[i])) {
        for (let j = -1; ++j < arguments[i].length;)
          clone.push(arguments[i][j]);
      } else {
        append(clone, arguments[i]);
      }
    }

    return clone;
  };

  ComponentList.splice = function splice_() {
    return components.splice.apply(components, arguments);
  };

  Object.defineProperty(ComponentList, 'length', {
    get() { return components.length; },
    set(v) { components.length = v; }
  });

  return ComponentList;
}

module.exports = createListWrap;
module.exports['default'] = createListWrap;
