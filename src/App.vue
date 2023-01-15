<script setup>

</script>

<template>
  <header>
  
    <div class="wrapper">
      <img class="logo" src="/src/assets/slogo.png" alt="Website logo" />
      <h1 class="title">Secret Server</h1>
    </div>
  </header>

  <main>
    <router-view />
  </main>
</template>

<style scoped>


  .logo {
    height: 100px;
    display: block;
    padding-right: 2.5rem;
  }

header {
  line-height: 1.5;
  display: flex;
  justify-content: center;
}

header .wrapper {
  flex-wrap: wrap;
  padding: 1rem;
  place-items: center;
  display: flex;
  align-content: center;
}

.title {
  font-size:2.5rem;
  font-weight: 700;
  color: var(--background-color);
}
</style>
