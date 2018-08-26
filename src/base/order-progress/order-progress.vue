<template>
    <div class="progress-wrapper">
        <ul class="progress">
            <li v-for="(item, index) in progressList" :key="index" class="progress-item">
                <p class="progress-text">{{ item }}</p>
                <div class="progress-bar"></div>
                <span class="progress-circle"></span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            progressList: ['Confirm Address', 'View Your Order', 'Make Payment', 'Order Confirmation']
        }
    }
}
</script>


<style lang="stylus" scoped>
@import '~common/stylus/variable'

.progress-wrapper
    width 100vw
    height 80px
    box-sizing border-box
    background-color $background-content-color
    margin-bottom 40px
    .progress
        width 100%
        height 100%
        box-sizing border-box
        list-style none
        padding 0
        margin 0
        .progress-item
            width 25%
            height 100%
            box-sizing border-box
            float left
            .progress-text
                color $font-light-color
            .progress-bar
                width 100%
                height 2px
                background-color $font-light-color
            .progress-circle
                display inline-block
                width 14px
                height 14px
                border-radius 50%
                background-color $font-light-color
                transform translateY(-8px)
</style>

