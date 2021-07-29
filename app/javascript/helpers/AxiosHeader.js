export default ({
  'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').content,
});
