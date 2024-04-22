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

  <div v-if="!showPosts" class="categories-container">
    <div
      v-for="category in categories"
      :key="category.id"
      class="category-card"
      @click="fetchPostsForCategory(category.id)">
      <h3>{{ category.name }}</h3>
    </div>
  </div>

  <div v-if="showPosts" class="posts-container">
    <button @click="showPosts = false">Back to Categories</button>
    <div v-for="post in posts" :key="post.id" class="post-card">
      <h3>{{ post.title }}</h3>
    </div>
  </div>

</template>

<script>
  import axios from 'axios';
  export default {
      data() {
          return {
              categories: [],
              posts: [],
              showPosts: false,
          };
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
          about () {
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('userName', this.userName);
            this.$router.push({ name: 'BlogAbout' });
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
          fetchItems() {
            axios.get('http://localhost:8081/categories')
            .then(response => {
              this.categories = response.data;
            })
            .catch(error => {
              console.error(error);
            });
          },
          fetchPostsForCategory(categoryId) {
            axios.get(`http://localhost:8081/posts?category=${categoryId}`)
              .then(response => {
                this.posts = response.data;
                this.showPosts = true;
              })
              .catch(error => console.error(error));
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
    this.fetchItems();
    document.title = "Categories";
  }
  }
</script>

<style>
.categories-container {
display: flex;
flex-wrap: wrap;
gap: 20px;
padding: 20px;
}

.category-card {
flex: 0 1 calc(33.333% - 20px);
box-shadow: 0 2px 4px rgba(0,0,0,0.1);
padding: 20px;
border-radius: 8px;
background: #fff;
transition: transform 0.2s;
}

.category-card:hover {
transform: translateY(-5px);
cursor: pointer;
background-color: rgb(159, 236, 211);
}

@media (max-width: 768px) {
.category-card {
  flex: 0 1 calc(50% - 20px);
}
}

@media (max-width: 480px) {
.category-card {
  flex: 0 1 100%;
}
}

.posts-container {
display: flex;
flex-wrap: wrap;
gap: 20px;
padding: 20px;
}

.post-card {
flex: 0 1 calc(33.333% - 20px);
box-shadow: 0 2px 4px rgba(0,0,0,0.1);
padding: 20px;
border-radius: 8px;
background: #fff;
transition: transform 0.2s;
}

.post-card:hover {
transform: translateY(-5px);
cursor: pointer;
}

@media (max-width: 768px) {
.post-card {
  flex: 0 1 calc(50% - 20px);
}
}

@media (max-width: 480px) {
.post-card {
  flex: 0 1 100%;
}
}
</style>