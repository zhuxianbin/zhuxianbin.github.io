<template>
    
    <div class="ant-layout">
        <layout-header></layout-header>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
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
