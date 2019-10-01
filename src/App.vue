<template>
  <b-container fluid id="app" class="text-center">
    <router-link to="/">HOME</router-link>
    <router-view :key="$route.fullPath" />
  </b-container>
</template>

<style>
.highlightRow {
  background-color: #17a2b8;
  color: white;
  cursor: pointer;
}
</style>
