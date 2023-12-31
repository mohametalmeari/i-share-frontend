import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';

const customRender = (ui, options) => render(ui, {
  wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
  ...options,
});

export default customRender;