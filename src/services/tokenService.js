export default {
    getToken() {
      const token = window.localStorage.getItem("access_token");
      if (token) {
        return JSON.parse(token);
      }
      return null;
    },
    setToken(value) {
      window.localStorage.setItem("access_token", value);
    }
  };
  