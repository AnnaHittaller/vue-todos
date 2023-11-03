<script setup>
import { ref, watch, computed } from 'vue';
import { uid } from "uid"
import { Icon } from '@iconify/vue';
import TodoCreator from '../components/TodoCreator.vue';
import TodoItem from "../components/TodoItem.vue"

const todoList = ref([])

watch(todoList, () => { //like useEffect, first parameter is a reactive element which is watched, the second is a callback function (accepts two params: newValue, oldValue) which runs if there is a change in the reactive element. Useful, so we don't have to add e.g. the setTodoListLocalStorage() to every function which modifies the todos.
  setTodoListLocalStorage()
}, { //third param is an object for different options for the watch function
  deep: true,  //allows us to track changes deep within the todoList array. It is needed, otherwise the function won't detect changes at the properties of the object which is todoList
})

const todoCompleted = computed(()=> { //takes a getter function and returns a read-only-ref to the value of that getter. Automatically tracks the reactive dependencies.
 return todoList.value.every(todo => todo.isCompleted)
})

const fetchTodoList = () => {
  const savedTodoList = JSON.parse(localStorage.getItem("todoList"))
  if (savedTodoList) {
    todoList.value = savedTodoList
  }
}

fetchTodoList()

const setTodoListLocalStorage = () => {
  localStorage.setItem("todoList", JSON.stringify(todoList.value))
}

const createTodo = (todo) => { //this todo is a parameter for the params array form the emit
  todoList.value.push({  // we need .value because we are using the ref method, and without it we get the whole ref object back
    id: uid(),
    todo, // because the field and the actual passed parameter is the same, we can leave it like this
    isCompleted: null,
    isEditing: null,
  })

}

const toggleTodoComplete = (todoPos) => {
  todoList.value[todoPos].isCompleted = !todoList.value[todoPos].isCompleted
}

const toggleEditTodo = (todoPos) => {
  todoList.value[todoPos].isEditing = !todoList.value[todoPos].isEditing
}

const updateTodo = (todoVal, todoPos) => {
  todoList.value[todoPos].todo = todoVal
}

const deleteTodo = (todoId) => {
  todoList.value = todoList.value.filter(todo => todo.id !== todoId)
}

</script>

<template>
  <main>
    <h1>Create Todo</h1>
    <TodoCreator @create-todo="createTodo" />
    <!-- listening for the custom emitted event from the TodoCreator component-->
    <ul class="todo-list" v-if="todoList.length > 0">
      <TodoItem v-for="(todo, index) in todoList" :todo="todo" :index="index" @toggle-complete="toggleTodoComplete"
        @edit-todo="toggleEditTodo" @update-todo="updateTodo" @delete-todo="deleteTodo" />
    </ul>
    <p v-else class="todos-msg">
      <Icon icon="noto-v1:sad-but-relieved-face" width="22" />
      <span>You have no todos to complete - add one!</span>
    </p>
    <p v-if="todoCompleted && todoList.length > 0" class="todos-msg">
    <Icon icon="noto-v1:party-popper" width="22" />
        <span>You have completed all your todos!</span></p>
  </main>
</template>

<style lang="scss" scoped>
main {
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

  .todo-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin-top: 24px;
    gap: 20px;
  }

  .todos-msg {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
  }
}
</style>