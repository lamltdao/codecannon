export default (enqueuer, message, variant, action = null) => enqueuer(
  message,
  {
    variant,
    autoHideDuration: 4000,
    preventDuplicate: true,
    anchorOrigin: {
      vertical: window.innerWidth > 600 ? 'top' : 'bottom',
      horizontal: 'right',
    },
    action,
  },
);
