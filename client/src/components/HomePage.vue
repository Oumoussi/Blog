<template>
  <header class="bg-gray-800 text-white body-font shadow w-full">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
            <nav class="flex lg:w-2/3 flex-wrap items-center text-base ">
              <a class="mr-5 hover:text-gray-900 cursor-pointer" @click="home">Home</a>
              <a class="mr-5 hover:text-gray-900 cursor-pointer" @click="categorie">Categories</a>
              <a class="mr-5 hover:text-gray-900 cursor-pointer" @click="about">About</a>
              <div class="flex items-center justify-center flex-1 ">
                  <input type="text" placeholder="Search..." class="text-black bg-gray-100 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base mr-4">
              </div>
              <img class="logo" alt="Vue logo" src="../assets/logo.png" @click="home">

            </nav>
            <div v-if="!isLoggedIn" class="flex">
              <button class="inline-flex items-center bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-700 rounded text-base mt-4 md:mt-0" @click="SignIn">
                Sign in
              </button>
              <div style="width: 10px;"></div>
              <button class="inline-flex items-center bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-700 rounded text-base mt-4 md:mt-0" @click="SignUp">
                Sign up
              </button>
            </div>
          <div v-if="isLoggedIn"  class="flex">
            <span class="mr-5 py-1">Welcome, {{ userName }}</span>
            <button class="inline-flex items-center bg-red-500 border-0 py-1 px-3 focus:outline-none hover:bg-red-700 rounded text-base mt-2 md:mt-0" @click="SignOut">
              Sign out
            </button>
          </div>
        </div>
  </header>
  <div style="height: 20px;"></div>
  <div class="p-2 max-w-md mx-auto bg-white rounded-lg shadow-md" style="text-align: center;">
    <h2 class="text-lg font-bold text-gray-800">Hello !!!</h2>
    <p class="mt-1 text-black">This is a blog that I'm building to get to know the "Vue js" and the "Express Js"</p>
  </div>


<div>
  <h1>Posts</h1>
  <ul>
    <li v-for="post in posts" :key="post.id">{{ post.title }} - {{ post.content }} - {{ post.last_name }} {{ post.first_name }} - {{ formatDate(post.created_at) }} </li>
  </ul>
</div>

<transition name="fade">
  <div v-if="toastVisible" class="toast">
      {{ toastMessage }}
  </div>
</transition>

</template>

<script>
import axios from 'axios';
import eventBus from '../services/eventBus';
export default{
  data() {
    return {
      posts: [],
      toastVisible: false,
      toastMessage: '',
    };
  },
  mounted() {
    eventBus.on('show-toast', this.showToast);
  },
  beforeUnmount() {
    eventBus.off('show-toast', this.showToast);
  },
  methods: {
    formatDate(timestamp) {
              const date = new Date(timestamp);
              return date.toISOString().split('T')[0];
    },
    showToast() {
              this.toastMessage = "Welcome back";
              this.toastVisible = true;
              setTimeout(() => {
                  this.toastVisible = false;
              }, 3000);
    },
    about () {
              localStorage.setItem('loggedIn', 'true');
              localStorage.setItem('userName', this.userName);
              this.$router.push({ name: 'BlogAbout' });
    },
    categorie () {
              localStorage.setItem('loggedIn', 'true');
              localStorage.setItem('userName', this.userName);
              this.$router.push({ name: 'BlogCategory' });
    },
    SignUp () {
            this.$router.push({ name: 'SignUp' });
    },
    SignIn () {
              this.$router.push({ name: 'SignIn' });
    },
    SignOut() {
              localStorage.removeItem('loggedIn');
              localStorage.removeItem('userName');
              window.location.reload();
    },
    home () {
              localStorage.setItem('loggedIn', 'true');
              localStorage.setItem('userName', this.userName);
              this.$router.push({ name: 'Dashboard' });
    },
    async fetchPosts() {
              try {
                const response = await axios.get('http://localhost:8081/posts');
                this.posts = response.data;
              } catch (error) {
                console.error(error);
              }
    },

  },
  computed: {
    isLoggedIn() {
      return localStorage.getItem('loggedIn') === 'true';
    },
    userName() {
      return localStorage.getItem('userName') || 'User';
    }
  },
  created() {
    this.fetchPosts();
    document.title = "Dashboard";
}

}
</script>
<style>
.flex-1 input[type="text"] {
  margin: auto auto;
}
img {
  margin: auto auto;
  width: 60px;
  padding-bottom: 5px;
  cursor: pointer;
}
</style>