<template>
    <div class="list-wrapper">
        <h2 class="title">{{ title }}</h2>
        <ul class="list">
            <li v-for="(item, index) in data" :key="index" :class="['list-item', item.isDefault === true ? 'default' : '']">
                <p class="detail recipient" :ref="'recipient' + index">收件人：{{ item.recipient }}</p>
                <p class="detail address">送货地址：{{ item.location }}</p>
                <p class="detail phone">联系电话：{{ item.phone }}</p>
                <p :class="item.isDefault ? 'default-address' : 'make-default'" @click="dft(item)">{{ item.isDefault ? 'default address' : 'make default' }}</p>
                <i class="icon-bin" @click="del(item)"></i>
            </li>
            <li class="addAddress">
                <i class="el-icon-circle-plus-outline" @click="add"></i>
                <p class="text">添加收货地址</p>
            </li>
        </ul>
    </div>
</template>

<script>
import Modal from 'base/modal/modal'

export default {
    props: {
        title: {
            type: String,
            default: 'SHIPPING ADDRESS'
        },
        data: {
            type: Array,
            default: []
        }
    },
    methods: {
        add() {
            this.$emit('addAddress')
        },
        del(item) {
            this.$emit('deleteAddress', item)
        },
        dft(item) {
            if (item.isDefault) {
                return
            }
            this.$emit('makeDefault', item)
        }
    },
    components: {
        Modal
    }
}
</script>


<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '../../common/stylus/style.css'

.list-wrapper
    width 100vw
    background-color $background-content-color
    box-sizing border-box
    padding 0 20px
    .title
        letter-spacing 2px
        word-spacing 10px
        padding 0
        margin 0
        text-align left
    .list
        width 100%
        padding 0
        margin 0
        //border 1px solid red
        list-style none
        display flex
        flex-wrap wrap
        justify-content flex-start
        .list-item
            width calc(25% - 40px)
            height 160px
            background-color $background-color
            padding 15px 0 0 20px
            margin 0 20px 20px 0
            position relative
            .detail
                width 100%
                text-align left
                margin 0
            .address
                margin-top 10px
            .phone
                margin-top 40px
            .icon-bin
                font-size $font-size-medium-x
                color $font-middle-color
                position absolute
                bottom 15px
                right 20px
                cursor pointer
            .default-address
                text-align left
                color $font-emphasize-color
            .make-default
                text-align left
                color $font-emphasize-color
                cursor pointer
        .default
            width calc(25% - 20px)
            border 1px solid $font-emphasize-color
            height 175px
            box-sizing border-box
            .detail
                width 100%
                text-align left
                margin 0
            .address
                margin-top 10px
            .phone
                margin-top 40px
            .icon-bin
                font-size $font-size-medium-x
                color $font-middle-color
                position absolute
                bottom 15px
                right 20px
                cursor pointer
            .default-address
                text-align left
                color $font-emphasize-color
            .make-default
                text-align left
                color $font-emphasize-color
                cursor pointer
        .addAddress
            width calc(25% - 20px)
            height 175px
            background-color $background-color
            margin 0 20px 20px 0
            position relative
            .el-icon-circle-plus-outline
                border 1px dashed $font-emphasize-color
                font-size 2.5rem
                width 60px
                height 40px
                padding 40px
                color $font-light-color
                position absolute
                left 0
                right 0
                top 0
                bottom 0
                margin auto
            .el-icon-circle-plus-outline:hover
                cursor pointer
            .text
                margin-top 115px

</style>

