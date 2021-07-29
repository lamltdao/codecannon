import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import DefaultCodecannonTheme from '../../components/theme/DefaultCodecannonTheme';
import SignUp from '../../containers/SignUp';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <ThemeProvider theme={DefaultCodecannonTheme}>
      <SignUp />
    </ThemeProvider>,
    document.querySelector('#sign-up'),
  );
});
