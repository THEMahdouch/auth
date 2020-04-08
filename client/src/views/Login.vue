<template>
  <div class="container">
      <h1 class="title">Login</h1>
      <div v-if="loginin">
        <img src="../assets/loading.gif" alt="loading">
      </div>
      <form v-if="!loginin" @submit.prevent="login">
      <div
        v-if="errorMessage"
        class="alert u-full-width"
        role="alert">
        {{ errorMessage }}
      </div>
      <label for="email">Email</label>
      <input
        v-model="user.email"
        class="u-full-width"
        type="text"
        name="email"
        placeholder="Enter an Email"
        required
      />

      <label for="password">Password</label>
      <input
        v-model="user.password"
        class="u-full-width"
        type="password"
        name="password"
        autocomplete="current-password"
        placeholder="Enter your password"
        required
      />

      <button class="button">Login</button>
    </form>
  </div>
</template>

<script>
import Joi from '@hapi/joi';

const LOGIN_API_URL = 'http://localhost:5000/auth/login';

const schema = Joi.object({

  // TODO : update the regex for the email
  email: Joi.string()
    .trim()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr', 'be'] } })
    .required(),

  // TODO : update the regex for the password
  password: Joi.string()
    .trim()
    .pattern(new RegExp('^[a-zA-Z0-9_]{10,50}$'))
    .required(),
  confirmPassword: Joi.string(),
})
  .with('email', 'password')
  .xor('password');

export default {
  data: () => ({
    errorMessage: '',
    user: {
      email: '',
      password: '',
    },
    loginin: false,
  }),
  watch: {
    user: {
      handler() {
        this.errorMessage = '';
      },
      deep: true,
    },
  },
  name: 'Login',
  methods: {
    login() {
      const validation = schema.validate(this.user);
      if (validation.error) {
        this.errorMessage = 'Invalid email or password.';
      } else {
        this.loginin = true;
        fetch(LOGIN_API_URL, {
          method: 'POST',
          body: JSON.stringify(this.user),
          headers: {
            'content-type': 'application/json',
          },
        }).then((response) => {
          if (response.ok) {
            return response.json();
          }
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        }).then((result) => {
          localStorage.token = result.token;
          this.loginin = false;
          this.$router.push('/dashboard');
        }).catch(() => {
          this.loginin = false;
          this.errorMessage = 'Invalid email or password.';
        });
      }
    },
  },
};
</script>
