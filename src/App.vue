<script setup>

</script>

<template>
  <!--  <router-view v-slot='{ Component }'>-->
  <!--    <keep-alive>-->
  <!--      <component-->
  <!--        :is='Component'-->
  <!--        v-if='$route.meta.keepAlive'-->
  <!--        :key='$route.path'-->
  <!--      />-->
  <!--    </keep-alive>-->
  <!--    <component-->
  <!--      :is='Component'-->
  <!--      v-if='!$route.meta.keepAlive'-->
  <!--      :key='$route.path'-->
  <!--    />-->
  <!--  </router-view>-->
  <router-view></router-view>
</template>

<style scoped>

</style>