<template>
    <div class="startPage">
        <div class="start-container">
            <p>Pour placer les marqueurs, il suffit de cliquer sur la carte !</p>
            <button @click="startGame" class="btn btn-primary">Démarrer la partie !</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "startPage",
        methods:{
            startGame(){
                this.$bus.$emit("startGame");
            }
        }
    }
</script>

<style scoped>
    .startPage{
        width: 100%;
    }
    .start-container{
        text-align: center;
        margin-top: 50vh;
        transform: translateY(-50%);
    }
</style>