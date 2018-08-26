<template>
    <transition name="modal-wrapper">
        <div class="modal-wrapper" v-show="showWrapperFlag" @click="hide">
            <span class="before"></span>
            <transition name="modal">
                <div class="modal" v-show="showFlag">
                    <i class="icon-cross" @click="hide"></i>
                    <slot name="content"></slot>
                    <slot name="button"></slot>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            showFlag: false,
            showWrapperFlag: false
        }
    },
    methods: {
        hide() {
            this.showFlag = false
            this.showWrapperFlag = false
        },
        show() {
            this.showWrapperFlag = true
            this.showFlag = true
        }
    }
}
</script>


<style lang="stylus" scoped>
@import '../../common/stylus/variable'
@import '../../common/stylus/style.css'

.modal-wrapper-leave-to
    transition-delay .1s
.modal-wrapper
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    background-color $background-cover-color
    z-index 1000
    .before
        content ''
        width 0
        height 100%
        display inline-block
        vertical-align middle
    .modal-enter-active
        transition all .3s
    .modal-leave-active
        transition all .1s
    .modal-enter, .modal-leave-to
        opacity 0
        transform translateY(100px)
    .modal
        width 46vw
        height 44vh
        background-color $background-color
        position relative
        display inline-block
        vertical-align middle
        z-index 200
        .icon-cross
            color $font-light-color
            position absolute
            top 10px
            right 10px
</style>

