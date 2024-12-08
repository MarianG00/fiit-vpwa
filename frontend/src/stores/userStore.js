import { reactive } from 'vue';

export const userStore = reactive({
  current_user: {
    id: 0,
    name: 'John',
    lastName: 'Doe',
    nick: 'Johnny',
    email: '',
    isAuthenticated: false,
    status: '',
    avatar: '../src/assets/default_avatar1.jpg',
    options: {
      notifications: '1',
      status: 'Online'
    },
  },

  updateUser(key, value) {
    if (key in this.current_user) {
      this.current_user[key] = value;
    } else {
      console.warn(`Key "${key}" does not exist in current_user`);
    }
  },

  login(user, token) {
    this.current_user.id = user.id;
    this.current_user.email = user.email;
    this.current_user.isAuthenticated = true;
    this.current_user.nick = user.username;
    this.current_user.name = user.firstName;
    this.current_user.lastName = user.lastName;
    this.current_user.token = token;
    this.current_user.options = user.options;
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
