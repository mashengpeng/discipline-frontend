<template>
  <MilkdownProvider>
    <MilkdownEditor />
  </MilkdownProvider>
</template>

<script>
import { defineComponent } from "vue";
import { MilkdownProvider } from "@milkdown/vue";
import MilkdownEditor from "@/components/MilkdownEditor.vue";

export default defineComponent({
  name: "MilkdownEditorWrapper",
  components: {
    MilkdownEditor,
    MilkdownProvider
  },
  setup: () => {
  }
});
</script>