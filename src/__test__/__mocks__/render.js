import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../../redux/store';

const customRender = (ui, options) => render(ui, {
  wrapper: ({ children }) => (
    <MemoryRouter>
      <Provider store={store}>{children}</Provider>
    </MemoryRouter>
  ),
  ...options,
});

export default customRender;
