<template>
  <el-button circle
             class="shadow fixed z-50 right-[4px] xl:right-[calc(50vw-600px)] bottom-16 lg:top-16"
             size="large" @click="visible = true">
    <el-icon size="30">
      <edit />
    </el-icon>
  </el-button>

  <el-button circle
             class="shadow fixed z-50 right-[4px] xl:right-[calc(50vw-600px)] bottom-32 lg:top-32"
             size="large" @click="deleteArticle">
    <el-icon size="30">
      <delete />
    </el-icon>
  </el-button>

  <el-button circle
             class="shadow fixed z-50 right-[4px] xl:right-[calc(50vw-600px)] bottom-48 lg:top-48"
             size="large" @click="prevArticle">
    <el-icon size="30">
      <arrow-left />
    </el-icon>
  </el-button>

  <el-button circle
             class="shadow fixed z-50 right-[4px] xl:right-[calc(50vw-600px)] bottom-64 lg:top-64"
             size="large" @click="nextArticle">
    <el-icon size="30">
      <arrow-right />
    </el-icon>
  </el-button>


  <el-drawer v-model="visible" :before-close="confirmEdit" :destroy-on-close="true" :withHeader="false" class=""
             size="90%"
             title="编辑文章" @opened="renderEditor">
    <div id="editContainer" class="shadow-2xl"></div>
  </el-drawer>

  <el-dialog
    v-model="diffVisible"
    title="修改预览"
    width="900px"
  >
    <Diff
      :current="editedArticle.content"
      :folding="true"
      :prev="article.content"
      mode="split"
      theme="light"
      virtual-scroll
    />
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="diffVisible = false">取 消</el-button>
      <el-button type="primary" @click="upsertArticle">上 传</el-button>
    </span>
    </template>
  </el-dialog>


  <div>
    <div id="previewContainer"></div>
  </div>

</template>
<script setup>

import { onActivated, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ArrowLeft, ArrowLeftBold, ArrowRight, ArrowRightBold, Delete, Edit, View } from "@element-plus/icons-vue";
import http from "@/utils/http";
import Cherry from "cherry-markdown";
import "cherry-markdown/dist/cherry-markdown.min.css";
import { ElMessageBox, ElNotification } from "element-plus";
import { Md5 } from "ts-md5";
import editor_config from "@/config/cherry-config";

const article = ref({ content: "" });
const editedArticle = ref({ content: "" });

const route = useRoute();
const router = useRouter();
const visible = ref(false);
const previewCherry = ref(null);
const editCherry = ref(null);
const diffVisible = ref(false);

const confirmEdit = (exit) => {
  editedArticle.value.content = editCherry.value.getValue();
  if (Md5.hashStr(editedArticle.value.content) === article.value.md5) {
    exit();
    return;
  }
  diffVisible.value = true;
  console.log(article, editedArticle);
  exit();

};

const prevArticle = () => {
  http.get("/article/prev", { params: { id: article.value.id } }).then(
    (res) => {
      router.push(`/article/${res.data}`);
    },
    () => {
    }
  );
};

const nextArticle = () => {
  http.get("/article/next", { params: { id: article.value.id } }).then(
    (res) => {
      router.push(`/article/${res.data}`);
    },
    () => {
    }
  );
};

const upsertArticle = () => {
  http.post("/article/upsert", editedArticle.value).then(
    (res) => {
      diffVisible.value = false;
      loadData();
      ElNotification({
        title: "已修改",
        message: "文章修改成功",
        type: "success"
      });
    },
    () => {
    }
  );
};

const deleteArticle = () => {
  ElMessageBox.confirm("确认删除文章?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "error"
  })
    .then(() => {
      http.post("/article/delete", article.value).then(
        (res) => {
          ElNotification({
            type: "success",
            message: "删除成功!"
          });
          router.push("/article/list");
        },
        () => {
        }
      );
    })
    .catch(() => {
      ElNotification({
        type: "info",
        message: "取消删除"
      });
    });

};

const loadData = () => {
  http.post(`/article/${route.params.id}`).then(
    (res) => {
      article.value = { ...res.data };
      editedArticle.value = { ...res.data };
      previewCherry.value.setValue("");
      previewCherry.value.setValue(article.value.content);
    },
    () => {
    }
  );
};

onMounted(() => {
  previewCherry.value = new Cherry({
    id: "previewContainer",
    value: "",
    toolbars: {
      toolbar: false
    },
    editor: {
      defaultModel: "previewOnly"
    },
    isPreviewOnly: true,
    forceAppend: false
  });
});

onActivated(() => {
  loadData();
});

const renderEditor = () => {
  editCherry.value = new Cherry({
    id: "editContainer",
    value: editedArticle.value.content,
    ...editor_config
  });
};


</script>

<style>
.el-drawer__body {
  padding: 0;
}

.cherry-previewer {
  border-left: none;
  background-color: white;
  padding: 0 16px 0 16px;
}

.cherry {
  box-shadow: none;
  background-color: white;
}
</style>

<style scoped>
.el-button {
  background-color: var(--el-button-bg-color, var(--el-color-white))
}
</style>