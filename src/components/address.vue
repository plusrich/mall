<template>
    <div class="address-wrapper">
        <mall-header></mall-header>
        <mall-nav currentRoute="Address"></mall-nav>
        <order-progress></order-progress>
        <list class="list" :data="addressList"></list>
        <div class="buttons">
            <button type="submit" class="previous">PREVIOUS</button>
            <button type="submit" class="next" @click="goToOrderConfirm">NEXT</button>
        </div>
        <mall-footer></mall-footer>
    </div>
</template>


<script>
import MallFooter from 'base/mall-footer/mall-footer'
import MallHeader from 'base/mall-header/mall-header'
import MallNav from 'base/mall-nav/mall-nav'
import OrderProgress from 'base/order-progress/order-progress'
import List from 'base/list/list'
import {getAddress} from 'common/js/api.js'
import {mapGetters} from 'vuex'

export default {
    data() {
        return {
            addressList: []
        }
    },
    computed: {
        ...mapGetters([
            'id'
        ])
    },
    mounted() {
        setTimeout(async () => {
            let obj = await getAddress(this.id)
            this.addressList = obj.data.addressList
            console.log(this.addressList)
        }, 20)
    },
    methods: {
        goToOrderConfirm() {
            this.$router.push('/orderConfirm')
        }
    },
    components: {
        MallFooter,
        MallHeader,
        MallNav,
        OrderProgress,
        List
    }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.address-wrapper
    width 100vw
    background-color $background-content-color
    .buttons
        width 100%
        height 40px
        box-sizing border-box
        padding 0 20px
        display flex
        justify-content space-between
        margin-bottom 40px
        .next
            width 150px
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

