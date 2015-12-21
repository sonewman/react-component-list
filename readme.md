# React-Component-List
[![Code Climate](https://codeclimate.com/github/sonewman/react-component-list/badges/gpa.svg)](https://codeclimate.com/github/sonewman/react-component-list)

### Usage:
```javascript
import React, {PropTypes} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import createList from 'react-component-list';

const Wrapper = ({children}) => <ul>{children}</ul>;
Wrapper.propTypes = { children: PropTypes.node.isRequired };

const ComponentList = createList(Wrapper);
ComponentList.push(<li>{'abc'}</li>);
ComponentList.push(<li>{'def'}</li>);
ComponentList.push(<li>{'ghi'}</li>);

renderToStaticMarkup(<ComponentList />);
/**
 *  <ul>
 *    <li>abc</li>
 *    <li>def</li>
 *    <li>ghi</li>
 *  </ul>
 */
```
