<template>
  <div @click.prevent.stop>
    <div :id="containerId">
    </div>
  </div>

</template>

<script setup>
import {onMounted, onUnmounted, ref} from 'vue'
import Cherry from 'cherry-markdown'
import 'cherry-markdown/dist/cherry-markdown.min.css'

const props = defineProps({
  containerId: {
    type: String,
    default: "cherry-container",
  },
  previewOnly: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: String,
    default: "",
  },
})
const cherryInstance = ref(null);

let config = null;

const baseConfig = {
  id: props.containerId,
}

const previewConfig = {
  value: props.modelValue,
  toolbars: {
    toolbar: false,
  },
  editor: {
    defaultModel: 'previewOnly',
  },
  previewer: {
    className: 'previewer',
  },
  isPreviewOnly: true,
  forceAppend: false,

}

config = Object.assign(baseConfig, props.previewOnly ? previewConfig : {})

onMounted(() => {
  cherryInstance.value = new Cherry(config)
  console.log("mounted")
})
onUnmounted(() => {
  console.log("unmounted")

})
</script>


<style scoped>

</style>