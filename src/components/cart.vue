<template>
    <div>
        <mall-header></mall-header>
        <mall-nav currentRoute="My Cart"></mall-nav>
        <div class="cart">
            <h1 class="title">MY  CART</h1>
            <div class="row">
                <span class="items column">ITEMS</span>
                <span class="price column">PRICE</span>
                <span class="quantity column">QUANTITY</span>
                <span class="subtotal column">SUBTOTAL</span>
                <span class="edit column">EDIT</span>
            </div>
            <ul class="cart-list">
                <li v-for="(item, index) in cartList" :key="index" class="cart-item">
                    <div class="g-items g-column">
                        <i :class="['icon-checkmark2', item.checked ? 'checked' : '']" @click="toggleCheckStatus(item)"></i>
                        <img :src="'static/image/' + item.productImage" class="image" width="70" height="90">
                        <span class="name">{{ item.productName }}</span>
                    </div>
                    <div class="g-price g-column">
                        <span>{{ item.price }}</span>
                    </div>
                    <div class="g-quantity g-column">
                        <i class="icon-minus" @mousedown="changeQuantityBefore" @mouseup="minusQuantity(item, index)"></i>
                        <input class="input" ref="quantityInput" v-model="item.quantity" @change="changeQuantity(item, index)">
                        <i class="icon-plus" @mousedown="changeQuantityBefore" @mouseup="plusQuantity(item, index)"></i>
                    </div>
                    <div class="g-subtotal g-column">
                        <span>{{ item.subtotal }}</span>
                    </div>
                    <div class="g-edit g-column">
                        <i class="icon-bin"></i>
                    </div>
                </li>
            </ul>
            <div class="confirm">
                <div class="select">
                    <i class="icon-checkmark2"></i>
                    <span class="all">Select all</span>
                    <span class="clear" @click="deletedSeleted">Delete selected</span>
                </div>
                <div class="checkout">
                    <span class="total">item total: 
                        <strong class="t-price">{{ total }}</strong>
                    </span>
                    <button type="submit" class="checkout-button" @click="goCheckout">CHECKOUT</button>
                </div>
            </div>
        </div>
        <mall-footer></mall-footer>
        <modal ref="orderModal">
            <p slot="content">您还未选择任何商品</p>
        </modal>
    </div>
</template>

<script>
import MallFooter from 'base/mall-footer/mall-footer'
import MallHeader from 'base/mall-header/mall-header'
import MallNav from 'base/mall-nav/mall-nav'
import Modal from 'base/modal/modal'
import {mapGetters, mapMutations} from 'vuex'

export default {
    data() {
        return {
            purchase: {
                index: 0,
                quantity: 0
            }
        }
    },
    computed: {
        total() {
            let total = 0
            for (var i = 0;i < this.cartList.length;i++) {
                total += this.cartList[i].subtotal
            }
            return total
        },
        ...mapGetters([
            'id',
            'name',
            'cartList',
            'order'
        ])
    },
    mounted() {
        setTimeout(() => {
            if (this.order.goods) {
                return
            }
            this.initializeOrder()
        }, 20)
    },
    methods: {
        changeQuantityBefore(e) {
            //e.target.style.transform = 'scale(0.9, 0.9)'
        },
        minusQuantity(item, index) {
            let p = Object.assign({}, item)
            if (p.quantity === 0) {
                return
            }
            p.quantity = Number(p.quantity)
            p.quantity -= 1
            p.subtotal -= p.price
            this.setCartList(p)
            this.purchase.index = index
            this.purchase.quantity = p.quantity
        },
        plusQuantity(item, index) {
            let p = Object.assign({}, item)
            p.quantity = Number(p.quantity)
            p.quantity += 1
            p.subtotal += p.price
            this.setCartList(p)
            this.purchase.index = index
            this.purchase.quantity = p.quantity
        },
        changeQuantity(item, index) {
            let value = Number(this.$refs.quantityInput[index].value)
            let p = Object.assign({}, item)
            if (isNaN(value) || Number(value) <= 0) {
                p.quantity = 0
                p.subtotal = 0
                this.setCartList(p)
                this.$refs.quantityInput[index].value = 0
            } else {
                p.quantity = value
                p.subtotal = p.quantity * p.price
                this.setCartList(p)
            }
            this.purchase.index = index
            this.purchase.quantity = p.quantity
        },
        toggleCheckStatus(item) {
            item.checked = !item.checked
        },
        deletedSeleted() {
            for (var i = 0;i < this.cartList.length;i++) {
                let item = this.cartList[i]
                let p = Object.assign({}, item)
                p.quantity = 0
                p.checked = false
                this.setCartList(p)
            }
        },
        initializeOrder() {
            let order = {
                date: '',
                goods: [],
                address: '',
                totalPrice: 0,
                user: {
                    id: this.id,
                    name: this.name
                }
            }
            this.setOrder(order)
        },
        goCheckout() {
            let {...odr} = this.order
            console.log(odr)
            for (var i = 0;i < this.cartList.length;i++) {
                let item = this.cartList[i]
                if (item.checked) {
                    odr.goods.push(item)
                }
            }
            if (odr.goods.length === 0) {
                this.$refs.orderModal.show()
                return
            }
            this.setOrder(odr)
            this.$router.push('/address')
        },
        ...mapMutations({
            setCartList: 'SET_CARTLIST',
            setOrder: 'SET_ORDER'
        })
    },
    watch: {
        purchase: {
            handler(newVal) {
                if (newVal.quantity === 0) {
                    this.cartList[newVal.index].checked = false
                } else {
                    this.cartList[newVal.index].checked = true
                }
            },
            deep: true
        }
    },
    components: {
        MallFooter,
        MallHeader,
        MallNav,
        Modal
    }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '../common/stylus/style.css'

.cart
    width 100vw
    background-color $background-content-color
    padding 40px 20px
    box-sizing border-box
    .title
        font-size $font-size-large
        text-align left
        letter-spacing 4px
        word-spacing 8px
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
            width 36%
        .price, .quantity, .subtotal, .edit
            width 16%
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
            .g-items
                width 36%
                justify-content flex-start
                .icon-checkmark2
                    display inline-block
                    margin 0 30px 0 10px
                .checked
                    color $font-emphasize-color
                .image
                    display inline-block
                    margin-right 10px
            .g-price, .g-quantity, .g-subtotal, .g-edit
                width 16%
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
                .icon-bin
                    font-size $font-size-large
                    color $font-middle-color
                .icon-bin:hover
                    cursor pointer
    .confirm
        width 100%
        height 50px
        box-sizing border-box
        background-color $background-color
        font-size $font-size-medium
        margin-top 20px
        padding-left 10px
        display flex
        justify-content space-between
        align-items center
        .select
            .icon-checkmark2
                margin-right 20px
            .all, .clear
                height 100%
                line-height 100%
                margin-right 20px
                cursor pointer
        .checkout
            height 100%
            .total
                display inline-block
                height 100%
                margin-right 20px
                .t-price
                    color $font-nav-color
                    font-size 1.1em
            .checkout-button
                display inline-block
                height 100%
                width 150px
                letter-spacing 2px
                font-size $font-size-medium-x
                background-color $font-nav-color
                text-align center
                color $input-border-color
                border 0
</style>

