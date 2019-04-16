<template>
    <div class="hehe">
        <p>{{content}}</p>
        <div class="dd">
            <button @click="increment">+</button>
            <button @click="decrement">-</button>
            {{count}}
        </div>
    </div>
</template>

<script>
export default {
    props: ['content'],
    methods: {
        increment() {
            this.$store.commit('increment')
        },
        decrement() {
            this.$store.commit('decrement')
        }
    },
    computed: {
        count(){
            return this.$store.state.count;
        }
    }
}
</script>

<style scoped lang="scss">
    .hehe{
        .dd{
            border: 1px solid #000;
            color: red;
        }
    }
</style>
