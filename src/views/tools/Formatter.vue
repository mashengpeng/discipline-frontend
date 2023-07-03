<template>
  <JsonEditorVue
      v-model="value"
      class="h-[1000px]"
      lang="zh"
      v-bind="{}"
  />
</template>

<script setup>
import JsonEditorVue from 'json-editor-vue'
import {ref} from "vue";

const value = ref()
</script>

<style scoped>

</style>