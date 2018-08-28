<template>
    <div class="footer-wrapper">
        <el-row class="footer">
            <el-col :span="1" class="label-wrapper">
                <span class="label">Region</span>
            </el-col>
            <el-col :span="2" class="select-wrapper">
                <el-select v-model="value" placeholder="请选择" class="select" size="mini">
                    <el-option v-for="item in regions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-col>
            <el-col :span="15" class="term-wrapper">
                <div class="terms">
                    <span class="term" v-for="item in terms" :key="item">{{ item }}</span>
                </div>
            </el-col>
      </el-row>
    </div>
</template>

<script>
export default {
  data() {
    return {
      regions: [
        {
          value: '选项一',
          label: '中国'
        },
        {
          value: '选项二',
          label: '美国'
        }
      ],
      value: ''
    }
  },
  props: {
      terms: {
          type: Array,
          default: () => {
              return ['Copyright © 2017 IMooc All Rights Reserved.', 'About Us', 'Terms & Conditions', 'Privacy Policy']
          }
      }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable'

.footer-wrapper
    width 100vw
    max-width 100vw
    height 100px
    font-size $font-size-medium
    overflow hidden
    background-color $background-content-color
    padding 0 30px
    box-sizing border-box
    margin 0
    border-top 1px solid $font-light-color
    .footer
        position relative
        height 40px
        margin-top 30px
        box-sizing border-box
        .label-wrapper
            margin-right 5px
            .label
                height 40px
                line-height 40px
                color $font-light-color
                font-size $font-size-medium
        .select-wrapper
            margin-top 6px
        .term-wrapper
            position absolute
            right 0
            display flex
            justify-content flex-end
            .terms
                width 100%
                display flex
                justify-content space-between
                .term
                    display inline-block
                    height 40px
                    line-height 40px
                    color $font-light-color
                    font-size $font-size-medium
</style>


