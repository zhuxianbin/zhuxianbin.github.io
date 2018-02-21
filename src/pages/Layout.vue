<template>
    
    <div class="ant-layout">
        <layout-header></layout-header>
        <router-view></router-view>
    </div>
    
</template>

<script>
import layoutHeader from "@/components/header.vue";

export default {
  name: "Layout",
  components: { layoutHeader }
};
</script>

<style>

</style>
