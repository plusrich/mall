<template>
    <div class="address-wrapper">
        <mall-header></mall-header>
        <mall-nav currentRoute="Address"></mall-nav>
        <order-progress></order-progress>
        <list class="list" :data="currentAddressList" @addAddress="addAddress"></list>
        <div class="show-more">
            <span class="more" @click="switchAddressList">{{showMoreFlag ? 'more' : 'less' }}</span>
            <i :class="[showMoreFlag ? 'icon-circle-down' : 'icon-circle-up']"></i>
        </div>
        <div class="buttons">
            <button type="submit" class="previous">PREVIOUS</button>
            <button type="submit" class="next" @click="goToOrderConfirm">NEXT</button>
        </div>
        <mall-footer></mall-footer>
        <modal ref="modalAddress">
            <div slot="content"></div>
            <button slot="button">添加</button>
        </modal>
    </div>
</template>


<script>
import MallFooter from 'base/mall-footer/mall-footer'
import MallHeader from 'base/mall-header/mall-header'
import MallNav from 'base/mall-nav/mall-nav'
import OrderProgress from 'base/order-progress/order-progress'
import List from 'base/list/list'
import Modal from 'base/modal/modal'
import {getAddress} from 'common/js/api.js'
import {mapGetters} from 'vuex'

export default {
    data() {
        return {
            AddressList: [],
            fullAddressList: [],
            showMoreFlag: true
        }
    },
    computed: {
        currentAddressList() {
            if (this.showMoreFlag) {
                return this.AddressList
            } else {
                return this.fullAddressList
            }
        },
        ...mapGetters([
            'id'
        ])
    },
    mounted() {
        setTimeout(async () => {
            let obj = await getAddress(this.id)
            this.fullAddressList = obj.data.addressList.slice()
            this.AddressList = this.fullAddressList.slice(0, 3)
        }, 20)
    },
    methods: {
        goToOrderConfirm() {
            this.$router.push('/orderConfirm')
        },
        switchAddressList() {
            this.showMoreFlag = !this.showMoreFlag
        },
        addAddress() {
            this.$refs.modalAddress.show()
            console.log(1)
        }
    },
    components: {
        MallFooter,
        MallHeader,
        MallNav,
        OrderProgress,
        List,
        Modal
    }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '../common/stylus/style.css'

.address-wrapper
    width 100vw
    background-color $background-content-color
    .show-more
        width 100vw
        box-sizing border-box
        height 25px
        display flex
        align-items center
        justify-content center
        .more, .icon-circle-down, .icon-circle-up
            color $font-emphasize-color
            font-size $font-size-medium-x
        .more
            margin-right 5px
        .more:hover
            cursor pointer
        .icon-circle-down, .icon-circle-up
            margin-left 5px
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

