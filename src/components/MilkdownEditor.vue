<template>
  <Milkdown />
</template>

<script>
import { defineComponent } from "vue";
import { Editor, rootCtx, defaultValueCtx, editorViewOptionsCtx } from "@milkdown/core";
import { nord } from "@milkdown/theme-nord";
import { Milkdown, useEditor } from "@milkdown/vue";
import { commonmark, headingAttr, paragraphAttr } from "@milkdown/preset-commonmark";
import { gfm } from "@milkdown/preset-gfm";
import { history } from "@milkdown/plugin-history";
import "@milkdown/theme-nord/style.css";

export default defineComponent({
  name: "MilkdownEditor",
  components: {
    Milkdown
  },
  setup: () => {
    const defaultValue = "# Hello milkdown";
    useEditor((root) =>
      Editor.make()
        .config((ctx) => {
          ctx.set(rootCtx, root);
          ctx.set(defaultValueCtx, defaultValue);
          ctx.update(editorViewOptionsCtx, (prev) => ({
            ...prev,
            attributes: { class: "milkdown-editor mx-auto outline-none", spellcheck: "true" }
          }));
          // // Add attributes to nodes and marks
          // ctx.set(headingAttr, (node) => {
          //   const level = node.attrs.level;
          //   if (level === 1) return { class: "text-4xl", "data-el-type": "h1" };
          //   if (level === 2) return { class: "text-3xl", "data-el-type": "h2" };
          //   // ...
          // });
          // ctx.set(paragraphAttr, () => ({ class: "text-lg" }));
        })
        .config(nord)
        .use(commonmark)
        .use(gfm)
        .use(history)
        .create()
    );
  }
});
</script>