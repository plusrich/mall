<template>
    <div class="goods-list-wrapper">
        <div class="good" v-for="(item, index) in data" :key="index" v-show="data.length > 0">
            <img :src="'../../static/image/' + item.productImage" width="140" height="140" class="good-image">
            <p class="good-name">{{ item.productName }}</p>
            <p class="good-price">{{ item.price }}</p>
            <el-button type="danger" plain class="button" @click="goCart(item)">加入购物车</el-button>
        </div>
        <img class="lazyload" v-lazy="'../../static/image/loading.gif'" width="50" height="50" v-show="data.length < 1">
    </div>
</template>

<script>

export default {
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    methods: {
        goCart(item) {
            this.$emit('addCart', item)
        }
    }
}
</script>


<style lang="stylus" scoped>
@import '~common/stylus/variable'

.goods-list-wrapper
    position relative
    width 70%
    box-sizing border-box
    //border 1px solid red
    display inline-block
    //display flex
    //flex-wrap wrap
    //justify-content flex-start
    padding 20px 26px 0 26px
    z-index 100
    .good
        width 220px
        height 300px
        margin 0 26px 20px 26px
        border 1px solid $input-border-color
        box-sizing border-box
        text-align center
        padding 20px 40px 0 40px
        display inline-block
        float left
        .good-image
            border 1px solid $input-border-color
        .good-name, .good-price
            text-align left
    .lazyload
        position absolute
        left 50%
        top 30px
        transform translateX(-50%)
</style>

