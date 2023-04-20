<script setup lang="ts">
import type { ErrorObject } from "@vuelidate/core";

defineProps({
    errors: {
        type: Array<ErrorObject>,
        required: true,
    },
});
</script>

<template>
    <div v-for="error in errors" :key="error.$uid">
        <p class="error">{{ error.$message }}</p>
    </div>
</template>

<style scoped lang="scss">
.error {
    color: red;
    margin: unset;
    font-size: 1rem;
    text-transform: uppercase;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    margin-top: 0.4rem;
}
</style>
