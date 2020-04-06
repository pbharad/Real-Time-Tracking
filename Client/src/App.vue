<template>
  <div>
    <TopBand></TopBand>
    <div style="">
      <router-view/>
    </div>
  </div>
</template>

<script>
import TopBand from '@/components/TopBand'
export default {
  name: 'App',
  components:{
    TopBand
  },
  methods:{
    
  }
}
</script>

<style>
#app {
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html,body {
  font-family: "Georgia", serif;
  font-size: 14px;
  font-weight: 300;
}
.notificationMsg {
    background-color: white;
    border-radius: 3px;
    padding: 0.5rem 2.5rem 0.5rem 1.5rem;
    position: relative;
    margin-bottom: 0.2rem;
    margin:0 auto;
    text-align: center;
    width: 500px;
}
.notificationMsg.is-primary {
    color: #000000;
    border: 1px solid #00d1b2;
}
.notificationMsg.is-danger {
    color: #000000;
    border: 1px solid #ff3860;
}
.panel-icon.is-primary{
  color: #00d1b2;
}
.panel-icon.is-danger{
  color: #ff3860;
}

</style>
