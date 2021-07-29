import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import DefaultCodecannonTheme from '../../components/theme/DefaultCodecannonTheme';
import Login from '../../containers/Login';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <ThemeProvider theme={DefaultCodecannonTheme}>
      <Login />
    </ThemeProvider>,
    document.querySelector('#login'),
  );
});
