<template>
  <a-layout>
    <a-layout-header class="bg-amber-50">Header</a-layout-header>
    <a-layout class="flex">
      <a-layout-sider class="bg-amber-50">Sider</a-layout-sider>
      <a-layout-content class="h-screen"><router-view></router-view></a-layout-content>
    </a-layout>
    <a-layout-footer>Footer</a-layout-footer>
  </a-layout>
</template>
<script>
</script>
<style>

</style>