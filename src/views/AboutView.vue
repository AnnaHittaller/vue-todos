<template>
  <div class="about">
    <h1>About Vue Todos</h1>
    <p>Vue Todos is a simple CRUD-based todo app, built based on the tutorial of John Komarnicki.</p>
    <p>You can add, save, delete and edit todos, which are saved to local storage.</p>
    <p>Some additional functions may be added to the app later to enhance user experience.</p>
  </div>
</template>

<style lang="scss" scoped>
.about {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 16px;

  h1 {
    margin-bottom: 16px;
    text-align: center;
  }
  p{
    text-align: center;
    margin: 12px 0;
  }
}
</style>
