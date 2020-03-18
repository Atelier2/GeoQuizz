<template>
    <div id="app">
        <navbar></navbar>
        <router-view/>
    </div>
</template>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Raleway&display=swap');
    @import 'node_modules/bootstrap/scss/bootstrap';
    @import 'node_modules/bootstrap-vue/src/index.scss';

    body {
        margin: 0;

        #app {
            font-family: 'Raleway', sans-serif;
        }
    }
</style>
<script>
    import Navbar from "./components/Navbar";

    export default {
        components: {Navbar}
    }
</script>