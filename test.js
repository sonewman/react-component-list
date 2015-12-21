import {describe, it} from 'mocha';
import {Should} from 'chai';
import React, {PropTypes} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

import createList from './';

Should();

describe('React-Component-List', () => {
  it('should take a list of items and insert them into wrapper', () => {
    const Wrapper = ({children}) => (
      <ul>
        {children}
      </ul>
    );

    Wrapper.propTypes = { children: PropTypes.node.isRequired };

    const ComponentList = createList(Wrapper);
    ComponentList.push(<li>{'abc'}</li>);
    ComponentList.push(<li>{'def'}</li>);
    ComponentList.push(<li>{'ghi'}</li>);

    renderToStaticMarkup(<ComponentList />)
      .should.equal([
        '<ul>',
          '<li>abc</li>',
          '<li>def</li>',
          '<li>ghi</li>',
        '</ul>'
      ].join(''));
  });

  it('should return empty wrapper if no items added', () => {
    const Wrapper = ({children}) => (
      <ul>
        {children}
      </ul>
    );

    Wrapper.propTypes = { children: PropTypes.node.isRequired };

    const ComponentList = createList(Wrapper);

    renderToStaticMarkup(<ComponentList />)
      .should.equal([
        '<ul>',
        '</ul>'
      ].join(''));
  });

  it('should have length', () => {
    const Wrapper = ({children}) => (
      <ul>
        {children}
      </ul>
    );

    Wrapper.propTypes = { children: PropTypes.node.isRequired };

    const ComponentList = createList(Wrapper);
    ComponentList.length.should.equal(0);

    ComponentList.push(<li>{'abc'}</li>);
    ComponentList.push(<li>{'def'}</li>);
    ComponentList.push(<li>{'ghi'}</li>);

    ComponentList.length.should.equal(3);
  });

  it('should pop', () => {
    const Wrapper = ({children}) => (
      <ul>
        {children}
      </ul>
    );

    Wrapper.propTypes = { children: PropTypes.node.isRequired };

    const ComponentList = createList(Wrapper);
    ComponentList.push(<li>{'abc'}</li>);
    ComponentList.push(<li>{'def'}</li>);
    ComponentList.push(<li>{'ghi'}</li>);

    const last = ComponentList.pop();

    renderToStaticMarkup(<ComponentList />)
      .should.equal([
        '<ul>',
          '<li>abc</li>',
          '<li>def</li>',
        '</ul>'
      ].join(''));

    renderToStaticMarkup(<ul>{last}</ul>)
      .should.equal([
        '<ul>',
          '<li>ghi</li>',
        '</ul>'
      ].join(''));
  });

  it('should unshift', () => {
    const Wrapper = ({children}) => (
      <ul>
        {children}
      </ul>
    );

    Wrapper.propTypes = { children: PropTypes.node.isRequired };

    const ComponentList = createList(Wrapper);
    ComponentList.unshift(<li>{'ghi'}</li>);
    ComponentList.unshift(<li>{'def'}</li>);
    ComponentList.unshift(<li>{'abc'}</li>);

    renderToStaticMarkup(<ComponentList />)
      .should.equal([
        '<ul>',
          '<li>abc</li>',
          '<li>def</li>',
          '<li>ghi</li>',
        '</ul>'
      ].join(''));
  });

  it('should shift', () => {
    const Wrapper = ({children}) => (
      <ul>
        {children}
      </ul>
    );

    Wrapper.propTypes = { children: PropTypes.node.isRequired };

    const ComponentList = createList(Wrapper);
    ComponentList.push(<li>{'abc'}</li>);
    ComponentList.push(<li>{'def'}</li>);
    ComponentList.push(<li>{'ghi'}</li>);

    const first = ComponentList.shift();

    renderToStaticMarkup(<ComponentList />)
      .should.equal([
        '<ul>',
          '<li>def</li>',
          '<li>ghi</li>',
        '</ul>'
      ].join(''));

    renderToStaticMarkup(<ul>{first}</ul>)
      .should.equal([
        '<ul>',
          '<li>abc</li>',
        '</ul>'
      ].join(''));
  });

  it('should slice', () => {
    const Wrapper = ({children}) => (
      <ul>
        {children}
      </ul>
    );

    Wrapper.propTypes = { children: PropTypes.node.isRequired };

    const ComponentList = createList(Wrapper);
    ComponentList.push(<li>{'abc'}</li>);
    ComponentList.push(<li>{'def'}</li>);
    ComponentList.push(<li>{'ghi'}</li>);

    const Clone = ComponentList.slice(1);

    ComponentList.pop();
    ComponentList.pop();
    ComponentList.pop();

    renderToStaticMarkup(<ComponentList />)
      .should.equal([
        '<ul>',
        '</ul>'
      ].join(''));

    renderToStaticMarkup(<Clone />)
      .should.equal([
        '<ul>',
          '<li>def</li>',
          '<li>ghi</li>',
        '</ul>'
      ].join(''));
  });

  it('should create complete copy from slice', () => {
    const Wrapper = ({children}) => (
      <ul>
        {children}
      </ul>
    );

    Wrapper.propTypes = { children: PropTypes.node.isRequired };

    const ComponentList = createList(Wrapper);
    ComponentList.push(<li>{'abc'}</li>);
    ComponentList.push(<li>{'def'}</li>);
    ComponentList.push(<li>{'ghi'}</li>);

    const Clone = ComponentList.slice();

    ComponentList.pop();
    ComponentList.pop();
    ComponentList.pop();

    renderToStaticMarkup(<ComponentList />)
      .should.equal([
        '<ul>',
        '</ul>'
      ].join(''));

    renderToStaticMarkup(<Clone />)
      .should.equal([
        '<ul>',
          '<li>abc</li>',
          '<li>def</li>',
          '<li>ghi</li>',
        '</ul>'
      ].join(''));
  });

  it('should concat', () => {
    const Wrapper = ({children}) => (
      <ul>
        {children}
      </ul>
    );

    Wrapper.propTypes = { children: PropTypes.node.isRequired };

    const ComponentList = createList(Wrapper);
    ComponentList.push(<li>{'abc'}</li>);
    ComponentList.push(<li>{'def'}</li>);
    ComponentList.push(<li>{'ghi'}</li>);

    const SubList = createList(Wrapper);
    SubList.propTypes = Wrapper.propTypes;

    const NewList = ComponentList.concat(
      SubList,
      <li>{'123'}</li>,
      [<li>{'456'}</li>, <li>{'789'}</li>]
    );

    renderToStaticMarkup(<NewList />)
      .should.equal([
        '<ul>',
          '<li>abc</li>',
          '<li>def</li>',
          '<li>ghi</li>',
          '<li>123</li>',
          '<li>456</li>',
          '<li>789</li>',
        '</ul>'
      ].join(''));
  });
});
