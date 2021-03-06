/* from https://stackoverflow.com/questions/52154917/vue-stoppropagation-not-working-child-to-parent */
export default {
  bind(el, { value }) {
    el._handler = e => {
      if (!el.contains(e.target)) {
        value(e);
      }
    };

    document.addEventListener('click', el._handler);
  },

  unbind(el) {
    document.removeEventListener('click', el._handler);
  }
};
