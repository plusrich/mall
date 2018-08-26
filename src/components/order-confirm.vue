<template>
    <div class="order-confirm-wrapper">
        <mall-header></mall-header>
        <mall-nav currentRoute="My Cart"></mall-nav>
        <order-progress></order-progress>
        <div class="order">
            <div class="row">
                <span class="items column">ORDER CONTENTS</span>
                <span class="price column">PRICE</span>
                <span class="quantity column">QUANTITY</span>
                <span class="subtotal column">SUBTOTAL</span>
            </div>
            <ul class="cart-list">
                <li v-for="(item, index) in  cart" :key="index" class="cart-item">
                    <div class="g-items g-column">
                        <img :src="'static/image/' + item.image" class="image" width="70" height="90">
                        <span class="name">{{ item.productName }}</span>
                    </div>
                    <div class="g-price g-column">
                        <span>{{ item.price }}</span>
                    </div>
                    <div class="g-quantity g-column">
                        <input class="input">
                    </div>
                    <div class="g-subtotal g-column">
                        <span></span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="buttons">
            <button type="submit" class="previous">PREVIOUS</button>
            <button type="submit" class="next" @click="goToOrderSuccess">PROCEED TO PAYMENT</button>
        </div>
        <mall-footer></mall-footer>
    </div>
</template>

<script>
import MallFooter from 'base/mall-footer/mall-footer'
import MallHeader from 'base/mall-header/mall-header'
import MallNav from 'base/mall-nav/mall-nav'
import OrderProgress from 'base/order-progress/order-progress'

export default {
    data() {
        return {
            cart: [{productName: '鞋子', price: 120, image: 'shoe.png'},
            {productName: 'T恤衫', price: 50, image: 't-shirt.png'},
            {productName: '眼镜', price: 80, image: 'glass.png'},
            {productName: '钱包', price: 100, image: 'bag.png'}]
        }
    },
    methods: {
        goToOrderSuccess() {
            this.$router.push('orderSuccess')
        }
    },
    components: {
        MallFooter,
        MallHeader,
        MallNav,
        OrderProgress
    }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '../common/stylus/style.css'
.order-confirm-wrapper
    background-color $background-content-color
    .order
        width 100vw
        background-color $background-content-color
        padding 0 20px 40px 20px
        box-sizing border-box
        .row
            background-color $background-column-color
            height 40px
            font-size $font-size-medium
            .column
                display inline-block
                color $input-border-color
                height 40px
                line-height 40px
                letter-spacing 2px
                box-sizing border-box
                float left
            .items
                width 40%
            .price, .quantity, .subtotal
                width 20%
        .cart-list
            list-style none
            padding 0
            margin 0
            background-color $background-color
            .cart-item
                height 140px
                padding 0
                margin 0
                .g-column
                    float left
                    height 140px
                    display inline-block
                    box-sizing border-box
                    display flex
                    justify-content center
                    align-items center
                    border 1px solid red
                .g-items
                    width 40%
                    justify-content flex-start
                    .icon-checkmark2
                        display inline-block
                        margin 0 30px 0 10px
                    .image
                        display inline-block
                        margin-right 10px
                .g-price, .g-quantity, .g-subtotal
                    width 20%
                    .icon-minus, .icon-plus
                        display inline-block
                        background-color $input-border-color
                        height 30px
                        width 30px
                        line-height 30px
                        cursor pointer
                        //font-size $font-size-large
                    .input
                        display inline-block
                        height 30px
                        line-height 30px
                        width 50px
                        box-sizing border-box
                        border 1px solid $background-nav-color
                        margin 0
                        font-size $font-size-medium-x
                        text-align center
    .buttons
            width 100%
            height 40px
            box-sizing border-box
            padding 0 20px
            display flex
            justify-content space-between
            margin-bottom 40px
            .next
                width 230px
                height 100%
                background-color $font-nav-color
                color $input-border-color
                border 0
            .previous
                width 150px
                height 100%
                background-color $background-color
                color $font-nav-color
                border 1px solid $font-nav-color
</style>


