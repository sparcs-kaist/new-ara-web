const IN = 'Logged in';
const OUT = 'Logged out';
const ERROR = 'Error';

export default {
  state: {
    authStatus: localStorage.getItem('JWT') ? IN : OUT,
  },
  mutations: {
    authError(state) {
      state.authStatus = ERROR;
    },
  },
};
