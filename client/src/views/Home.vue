<template>
  <div class="container">
    <h1>Home</h1>
    <div class="container">
      <div class="row">
        <router-link class="button" :to="{name:'Signup'}" role="button">
          Sign Up
        </router-link>
        <a class="button" href="#">Sign In</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>
