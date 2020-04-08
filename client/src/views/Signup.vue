<template>
  <div class="container">
    <h1 class="title">Sign Up</h1>
    <div v-if="signingup">
      <img src="../assets/loading.gif" alt="loading">
    </div>
    <form v-if="!signingup" @submit.prevent="signup">
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

      <div class="row">
        <div class="six columns">
          <label for="password">Password</label>
          <input
            v-model="user.password"
            class="u-full-width"
            type="password"
            name="password"
            placeholder="Enter a password"
            required
          />
        </div>
        <div class="six columns">
          <label for="confirm-password">Confirm password</label>
          <input
            v-model="user.confirmPassword"
            class="u-full-width"
            type="password"
            name="confirm-password"
            placeholder="Confirm password"
            required
          />
        </div>
      </div>

      <button class="button">Sign up</button>
    </form>
  </div>
</template>

<script>
import Joi from '@hapi/joi';

const SINGUP_API_URL = 'http://localhost:5000/auth/signup';
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
      confirmPassword: '',
    },
    signingup: false,
  }),
  watch: {
    user: {
      handler() {
        this.errorMessage = '';
      },
      deep: true,
    },
  },
  name: 'Signup',
  methods: {
    signup() {
      if (this.validUser()) {
        const body = {
          email: this.user.email,
          password: this.user.password,
        };
        this.signingup = true;
        fetch(SINGUP_API_URL, {
          method: 'POST',
          body: JSON.stringify(body),
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
        }).then(() => {
          this.signingup = false;
          this.$router.push('/login');
        }).catch((error) => {
          this.signingup = false;
          console.log(error);
        });
      }
    },
    validUser() {
      if (this.user.confirmPassword !== this.user.password) {
        this.errorMessage = 'Passwords must match. 🙈';
        return false;
      }
      const result = schema.validate(this.user);
      if (result.error) {
        console.log(result.error);
        // TODO update messages
        if (result.error.message.includes('email')) {
          this.errorMessage = 'Email is invalid. 😢';
        }
        if (result.error.message.includes('password')) {
          this.errorMessage = 'Password is invalid. 🙈';
        }
        return false;
      }
      this.errorMessage = '';
      return true;
    },
    sendData() {},
  },
};
</script>
