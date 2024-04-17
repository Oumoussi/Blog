<template>
  <!-- Header -->
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
  <!-- About -->
  <div class="about-page">
      <div class="header">
          <h1>Welcome to Global Glimpse!</h1>
      </div>
      <div class="content">
          <p>Hi, I'm Oumoussi Abderrahim, the creator behind Global Glimpse. Explore a vibrant collection of articles ranging from tech tutorials to literary reviews, and much more. Join us as we delve into the vast landscape of human knowledge and passions.</p>
          <h2>About Me</h2>
          <p>As a curious explorer from Paris with a degree in Computer Engineering, I am passionate about technology, arts, sciences, and humanities. Join me on this journey of discovery and lifelong learning.</p>
          <h2>Why This Blog?</h2>
          <p>Global Glimpse was born from a desire to share diverse stories and knowledge. Whether you're seeking advice, deep dives into niche topics, or simply a good story, there's something here for everyone.</p>
          <h2>Connect With Me</h2>
          <ul>
              <li>Email: abderahimamoussi1@gmail.com</li>
              <li>LinkedIn: abderrahim-oumoussi</li>
          </ul>
          <h2>Join the Journey</h2>
          <p>Subscribe to stay updated on our latest adventures. Let's explore the endless possibilities together!</p>
      </div>
  </div>


</template>

<script>
  export default {
      data() {
          return {
              categories: [],
              posts: [],
              showPosts: false,
          };
      },
      created() {
        document.title = "About";
      },
      methods: {
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
          categorie () {
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('userName', this.userName);
            this.$router.push({ name: 'BlogCategory' });
          },
          about () {
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('userName', this.userName);
            this.$router.push({ name: 'BlogAbout' });
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

  }
</script>

<style>
.about-page {
  max-width: 960px;
  margin: 50px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 8px 8px rgba(0,0,0,0.1);
  font-family: 'Arial', sans-serif;
}

.header h1 {
  font-size: 28px;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
}

.content {
  font-size: 16px;
  line-height: 1.8;
  color: #243547;
}

.content h2 {
  color: #16a085;
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 22px;
}

.content p {
  margin-bottom: 20px;
}

.content ul {
  list-style-type: none;
  padding-left: 20px;
}

.content li {
  padding: 5px 0;
  position: relative;
}

.content li::before {
  content: '•';
  position: absolute;
  left: -20px;
  color: #16a085;
  font-size: 20px;
}

</style>