<template>
  <div id="editor"></div>
</template>

<script setup>

import { defaultValueCtx, Editor, rootCtx } from "@milkdown/core";
import { commonmark } from "@milkdown/preset-commonmark";
import { history } from "@milkdown/plugin-history";
import { nord } from "@milkdown/theme-nord";
import "@milkdown/theme-nord/style.css";

Editor
  .make()
  .config(nord)
  .config((ctx) => {
    ctx.set(rootCtx, "#editor");
    ctx.set(defaultValueCtx, "# gitlab runner\n" +
      "\n" +
      "---\n" +
      "\n" +
      "## 安装gitlab runner\n" +
      "\n" +
      "```bash\n" +
      "docker run -d --name gitlab-runner --restart always --env TZ=CN \\\n" +
      "-v /docker/gitlab-runner/config:/etc/gitlab-runner \\\n" +
      "-v /var/run/docker.sock:/var/run/docker.sock \\\n" +
      "gitlab/gitlab-runner:latest\n" +
      "```\n" +
      "\n" +
      "注意第二个挂载是让其与宿主docker的守护进程通信,不可更改,从而后续的CI/CD过程通过新建容器来实现\n" +
      "\n" +
      "## gitlab上配置runner\n" +
      "\n" +
      "主要是填写url和token,注意勾选执行untagged的任务\n" +
      "\n" +
      "## gitlab runner配置\n" +
      "\n" +
      "```bash\n" +
      "gitlab-runner register\n" +
      "```\n" +
      "\n" +
      "需要注意的是执行器填写docker,执行器版本可以写alpine:latest");
  })
  .use(commonmark)
  .use(history)
  .create();
</script>


<style scoped>

</style>