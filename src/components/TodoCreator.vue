
<script setup>
import { reactive, ref } from 'vue';
import TodoButton from "./TodoButton.vue"

const emit = defineEmits(["create-todo"])

//const todo = ref("")
//console.log(todo.value) will get us the actual value of the todo const, but in the template {{ todo }} is enought to get the value

const todoState = reactive({ // the reactive method can not have primitive data type, must be an object
    todo: "",
    invalid: null,
    errMsg: ""
})

const createTodo = () => {
    todoState.invalid = null
    if (todoState.todo !== "") {
        emit("create-todo", todoState.todo) // every time the button is clicked, this function runs and it will emit the "create-todo", which has 3 properties - see in vue.js devtools:
        // component (which emitted the event), event: here "create-todo", and params, which is an array and will contain the todo.value
        todoState.todo = "";
        return
    }

    todoState.invalid = true
    todoState.errMsg = "Todo value cannot be empty"
}

</script>

<!-- slots: pass template data to your components to make them more dynamic -->

<template>
    <div class="input-wrap" :class="{ 'input-err': todoState.invalid }">
        <!--class-binding: apply a dynamic class, only when a certain condition is true-->
        <!-- <input type="text" v-model="todo"> -->
        <input type="text" v-model="todoState.todo">
        <!-- <button @click="createTodo()">Create</button> shorthand for the v-on directive, button extracted to a separate component to show usage of slots -->
        <TodoButton @click="createTodo()">
            <!-- here comes custom slot content if there's any, if not, we could have the button component as self-closing -->
        </TodoButton>
    </div>
    <!-- <p v-if="todoState.invalid" class="err-msg">{{ todoState.errMsg }}</p> -->
    <!-- v-if doesn't render the element to the DOM if the condition is not true, v-show renders is but with style="display: none" if it is false -->
    <!-- v-if has higher toggle cost, so if the element is toggled often, go with v-show -->
    <p v-show="todoState.invalid" class="err-msg">{{ todoState.errMsg }}</p>
</template>

<style lang="scss" scoped>
.input-wrap {
    display: flex;
    transition: 250ms ease;
    border: 2px solid #41b080;

    &.input-err {
        border-color: red;
    }

    &:focus-within {
        box-shadow: 0 -4px 6px -1px rgb(0 0 0 / 0.1),
            0 -2px 4px -2px rgb(0 0 0 / 0.1);
    }

    input {
        width: 100%;
        padding: 8px 6px;
        border: none;

        &:focus {
            outline: none;
        }
    }


}

.err-msg {
    margin-top: 16px;
    font-size: 12px;
    text-align: center;
    color: red;
}
</style>

