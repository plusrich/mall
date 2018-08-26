<template>
    <div class="list-wrapper">
        <h2 class="title">{{ title }}</h2>
        <ul class="list">
            <li v-for="(item, index) in data" :key="index" class="list-item">
                <p class="detail recipient">{{ item.recipient }}</p>
                <p class="detail address">{{ item.address }}</p>
                <p class="detail phone">{{ item.phone }}</p>
                <i class="icon-bin"></i>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'SHIPPING ADDRESS'
        },
        data: {
            type: Array,
            default: [{recipient: 'Jack', address: '啊好的卡刷卡金鲨看啥', phone: '123124123123'},
            {recipient: 'Jack', address: '啊好的卡刷卡金鲨看啥', phone: '123124123123'},
            {recipient: 'Jack', address: '啊好的卡刷卡金鲨看啥', phone: '123124123123'},
            {recipient: 'Jack', address: '啊好的卡刷卡金鲨看啥', phone: '123124123123'},
            {recipient: 'Jack', address: '啊好的卡刷卡金鲨看啥', phone: '123124123123'},
            {recipient: 'Jack', address: '啊好的卡刷卡金鲨看啥', phone: '123124123123'},
            {recipient: 'Jack', address: '啊好的卡刷卡金鲨看啥', phone: '123124123123'},
            {recipient: 'Jack', address: '啊好的卡刷卡金鲨看啥', phone: '123124123123'},
            {recipient: 'Jack', address: '啊好的卡刷卡金鲨看啥', phone: '123124123123'}
            ]
        }
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
</style>

