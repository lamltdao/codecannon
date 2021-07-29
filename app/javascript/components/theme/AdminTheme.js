import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#00D998',
      contrastText: '#fff',
    },
    secondary: {
      main: '#D90041',
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
      color: '#000',
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
