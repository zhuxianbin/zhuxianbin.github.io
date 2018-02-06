<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import $ from "jquery"
    export default {
        name: 'App',
        mounted(){
            //console.log(this.$czapi);
            //console.log($.cookie("userToken"));
            $('head').append('<link rel="stylesheet" href="static/css/admin.css">');
        }
    }
</script>

<style>

</style>
