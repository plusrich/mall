<template>
    <div>
        <mall-header></mall-header>
        <div class="success">
            <h2 class="checkout">CHECK OUT</h2>
            <order-progress></order-progress>
            <i class="icon-smile"></i>
            <div class="text">
                <p class="cong">Congratulaitons!</p>
                <p class="proc">Your order is under processing!</p>
                <p class="order-detail">Order ID:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Order total:</p>
            </div>
            <div class="buttons">
                <button type="button" class="cart" @click="goToCart">CART LIST</button>
                <button type="button" class="goods" @click="goToGoods">GOODS LIST</button>
            </div>        
        </div>
    </div>
</template>


<script>
import MallHeader from 'base/mall-header/mall-header'
import OrderProgress from 'base/order-progress/order-progress'
import {mapMutations} from 'vuex'

export default {
    mounted() {
        this.clearCartList()
        this.setOrder({})
    },
    methods: {
        goToCart() {
            this.$router.push('/cart')
        },
        goToGoods() {
            this.$router.push('/')
        },
        ...mapMutations({
            clearCartList: 'CLEAR_CARTLIST',
            setOrder: 'SET_ORDER'
        })
    },
    components: {
        MallHeader,
        OrderProgress
    }
}
</script>

<style lang="stylus" scoped>
@import '../common/stylus/variable'
@import '../common/stylus/style.css'

.success
    background-color $background-content-color
    width 100vw
    height calc(100vh - 70px)
    box-sizing border-box
    padding-top 30px
    .checkout
        width 100%
        box-sizing border-box
        padding-left 20px
        letter-spacing 2px
        word-spacing 10px
        text-align left
        margin 0
    .icon-smile
        color $font-emphasize-color
        font-size 8em
    .text
        box-sizing border-box
        margin-top 10px
        .cong, .proc
            box-sizing border-box
            font-size $font-size-medium-x
        .cong
            margin-bottom 5px
        .proc
            margin 0 0 15px 0
        .order-detail
            box-sizing border-box
            color $font-light-color
            font-size $font-size-medium
    .buttons
        box-sizing border-box
        height 40px
        display flex
        justify-content center
        margin-top 40px
        .cart, .goods
            width 150px
            height 40px
            border 1px solid $font-nav-color
            box-sizing border-box
            font-size $font-size-medium
            line-height 40px
            color $font-nav-color
            margin 0 20px
            background-color $background-color
            font-weight bold
            letter-spacing 1px
            word-spacing 5px
            cursor pointer
</style>

