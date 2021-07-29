import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#E15E4D',
      contrastText: '#fff',
    },
    secondary: {
      main: '#4DD0E1',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: 'monospace',
    htmlFontSize: 16,
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
    h2: {
      fontSize: '4rem',
      color: '#fff',
    },
    h3: {
      fontSize: '3rem',
    },
    h4: {
      fontSize: '2.5rem',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 700,
      textTransform: 'uppercase',
    },
  },
});
