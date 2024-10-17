import { reactive } from 'vue';

export const userStore = reactive({
  current_user: {
    name: 'John',
    lastName: 'Doe',
    email: '',
    isAuthenticated: false,
    status: '',
  },

  updateUser(key, value) {
    if (key in this.current_user) {
      this.current_user[key] = value;
    } else {
      console.warn(`Key "${key}" does not exist in current_user`);
    }
  },

  login(email, password) {
    this.current_user.email = email;
    this.current_user.isAuthenticated = true;
    password;
    this.current_user.status = 'Offline';
    return true;
  },

  logout() {
    this.current_user.name = '';
    this.current_user.lastName = '';
    this.current_user.status = '';
    this.current_user.email = '';
    this.current_user.isAuthenticated = false;
  },
});
