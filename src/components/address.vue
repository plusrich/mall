<template>
    <div class="address-wrapper">
        <mall-header></mall-header>
        <mall-nav currentRoute="Address"></mall-nav>
        <order-progress></order-progress>
        <list class="list" :data="currentAddressList" @addAddress="addAddress" @deleteAddress="deleteAddress"></list>
        <div class="show-more">
            <span class="more" @click="switchAddressList">{{showMoreFlag ? 'more' : 'less' }}</span>
            <i :class="[showMoreFlag ? 'icon-circle-down' : 'icon-circle-up']"></i>
        </div>
        <div class="buttons">
            <button type="submit" class="previous">PREVIOUS</button>
            <button type="submit" class="next" @click="goToOrderConfirm">NEXT</button>
        </div>
        <mall-footer></mall-footer>
        <modal ref="modalAddressDelete">
            <div slot="content"></div>
            <div slot="button">
                <button slot="button">取消</button>
                <button slot="button">确认</button>
            </div>
        </modal>
        <modal ref="modalAddressAdd" class="add-adddress-modal">
            <el-form slot="content" ref="form" class="add-form" label-width="50px" label-position="right" size="small">
                <el-form-item label="recipient" class="item">
                    <el-input v-model="address.recipient" class="input" placeholder="请填写收件人"></el-input>
                </el-form-item>
                <el-form-item label="location" class="item">
                    <el-input v-model="address.location" class="input" placeholder="请填写地址"></el-input>
                </el-form-item>
                <el-form-item 
                    label="phone" 
                    class="item"
                    :rules="[
                        {required: true, message: '电话不能为空', trigger: 'blur'},
                        {type: 'number', message: '电话必须为数字', trigger: 'blur'}
                    ]"
                >
                    <el-input v-model.number="address.phone" class="input" placeholder="请填写联系电话"></el-input>
                </el-form-item>
                <el-form-item label="default" class="item item-checkbox" required>
                    <el-checkbox v-model="address.isDefault" class="checkbox">设为默认地址</el-checkbox>
                </el-form-item>
            </el-form>
            <div slot="button" class="add-address-btn-group">    
                <el-button type="info" class="cancel-address-btn" @click="cancelAddAddress">取消</el-button>        
                <el-button type="primary" class="add-address-btn" @click="confirmAddAddress">添加</el-button>
            </div>
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
import {getAddress, addOneAddress, deleteOneAddress} from 'common/js/api.js'
import {mapGetters} from 'vuex'

export default {
    data() {
        return {
            AddressList: [],
            fullAddressList: [],
            showMoreFlag: true,
            address: {
                recipient: '',
                location: '',
                phone: null,
                isDefault: false
            }
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
        this.init()
    },
    methods: {
        init() {
            setTimeout(async () => {
                let obj = await getAddress(this.id)
                this.fullAddressList = obj.data.addressList
                this.AddressList = this.fullAddressList.slice(0, 3)
                //console.log(this.AddressList)
                //console.log(this.fullAddressList)
            }, 20)
        },
        goToOrderConfirm() {
            this.$router.push('/orderConfirm')
        },
        switchAddressList() {
            this.showMoreFlag = !this.showMoreFlag
        },
        addAddress() {
            //addOneAddress(this.id)
            this.$refs.modalAddressAdd.show()
        },
        async confirmAddAddress() {
            let obj = await addOneAddress(this.address, this.id)
            this.fullAddressList = obj.data.addressList
            this.AddressList = this.fullAddressList.slice(0, 3)
        },
        cancelAddAddress() {
            return
        },
        async deleteAddress(item) {
            let obj = await deleteOneAddress(item.addressId, this.id)
            console.log(obj)
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
    .add-form
        width 80%
        margin 5% auto 0 auto
        .item-checkbox
            margin 0
        .item
            width 100%
            .input, .checkbox
                width 90%
            .checkbox
                text-align left
    .add-address-btn-group
        width 100%
        display flex
        justify-content center
        .cancel-address-btn, .add-address-btn
            width 80px
        .cancel-address-btn
            margin-right 10px
        .add-address-btn
            margin-left 10px

</style>

