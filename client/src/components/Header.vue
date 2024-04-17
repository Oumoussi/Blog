<template>
    <header class="bg-gray-800 text-white body-font shadow w-full">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
            <nav class="flex lg:w-2/3 flex-wrap items-center text-base ">
              <a class="mr-5 hover:text-gray-900 cursor-pointer" href="/">Home</a>
              <a class="mr-5 hover:text-gray-900 cursor-pointer" href="/Category">Categories</a>
              <a class="mr-5 hover:text-gray-900 cursor-pointer">About</a>
              <div class="flex items-center justify-center flex-1 ">
                  <input type="text" placeholder="Search..." class="text-black bg-gray-100 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base mr-4">
              </div>
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
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>