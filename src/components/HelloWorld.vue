<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <hehe :content="dd"></hehe>
  </div>
</template>

<script>
import hehe from './hehe';
export default {
  name: 'HelloWorld',
  components: {
    hehe: hehe
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      dd: 'dd'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
