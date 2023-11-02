<script setup></script>

<template>
    <button>
        <slot>Create</slot> <!--if you have more slots, they can have a name attribute eg. name="button", here it's not necessary. Inside the slot is a default value, in case we don't define anything -->
    </button>
</template>

<style lang="scss" scoped>
button {
    padding: 8px 16px;
    border: none;
}
</style>
