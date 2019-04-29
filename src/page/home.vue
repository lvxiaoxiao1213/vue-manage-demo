<template>
    <div>
        <head-top></head-top>
        <tendency :sevenDate="sevenDate" :sevenDay="sevenDay"></tendency>
    </div>
</template>

<script>
import headTop from '@/components/headTop'
import tendency from '@/components/tendency'

export default {
    name: 'Home',
    data() {
        return {
            sevenDay: [],
            sevenDate: [[], [], []]
        }
    },
    components: {
        headTop,
        tendency
    }
}
</script>