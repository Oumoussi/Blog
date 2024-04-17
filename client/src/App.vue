<template>
  <div id="app">
    <div class="content-wrapper">
      <main>
        <router-view />
      </main>
    </div>

  </div>
  <footer class="footer">
      <Footer />
  </footer>
</template>

<script>
import Footer from './components/Footer.vue';
export default {
  name: 'App',
  components: {
    Footer
  },
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  min-height: 83.2vh;
}
.content-wrapper {
  flex: 1;
}
.footer {
  background-color: #171d29;
  text-align: center;
  padding:  15px;
  margin-top: 10px;
  color: whitesmoke
}
</style>
