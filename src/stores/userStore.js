import { reactive } from 'vue';

export const userStore = reactive({
  current_user: {
    name: 'John',
    lastName: 'Doe',
    nick: 'Johnny',
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
    if (email.includes('@')) {
      this.current_user.email = email;
      this.current_user.nick = 'Johnny';
    } else {
      this.current_user.nick = email;
      this.current_user.email = 'john.doe@example.com';
    }
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
    this.current_user.nick = '';
    this.current_user.isAuthenticated = false;
  },
});
