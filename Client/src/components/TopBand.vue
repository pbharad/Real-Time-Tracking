<template>
  <nav class="navbar is-black" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item">
    </a>
  </div>
    <div class="navbar-menu">
      <div class="navbar-start">
      <a class="navbar-item" style="color:red;">
      <span class="is-red is-bold" style="font-weight:700;">
          {{msg}}
        </span>
      </a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
      </div>
      </div>
    </div>
</nav>

</template>

<script>
export default {
  name: 'TopBand',
  data () {
    return {
      msg: 'Staples'
    }
  },
  methods:{
  }
}
</script>
