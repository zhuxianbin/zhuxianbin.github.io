<template>
    <div>
        <el-form :model="signForm" label-width="100px" style="width: 900px"> 
            <el-form-item label="签到奖励：">
                <el-col :span="20">
                    <el-input v-model="signForm.arrGoldNum" clearable style="width: 95%"></el-input>
                </el-col>
                <el-col :span="2">
                    <span>金币</span>
                </el-col>       
            </el-form-item>

            <el-form-item label="是否启用：">
                <el-radio v-model="signForm.isEnable" :label="1">开启</el-radio>
                <el-radio v-model="signForm.isEnable" :label="0" disabled>不开启</el-radio>
            </el-form-item> 

            <el-form-item label="签到描述：">
                <el-input type="textarea" v-model="signForm.remarks" :rows="7"></el-input>
            </el-form-item> 

            <el-form-item>
                <el-button @click="submitForm5">保存</el-button>    
            </el-form-item>   
        </el-form>    
    </div>
</template>

<script>
import { signinConfigGetDetail, signinConfigUpdate } from "@/api/marketing";
export default {
    data() {
        return {
            signForm: {
                arrGoldNum: '',
                isEnable: 1,
                remarks: ''
            }
        }
    },
    mounted() {
        this.signinConfigGetDetail()
    },
    methods: {
        // 获取签到信息
        signinConfigGetDetail() {
            signinConfigGetDetail().then(res => {
                res.remarks = res.remarks.replace(/<br\/>/g, "\r\n");
                console.log(res)
                this.signForm = {...res};
            })
        },
        // 点击保存
        submitForm5() {
            this.signForm.createTime = this.time(this.signForm.createTime);
            this.signForm.updateTime = this.time(this.signForm.updateTime);
            const obj = {...this.signForm};
            obj.remarks = obj.remarks.replace(/(\r\n)|(\n)/g, "<br/>");
            signinConfigUpdate(obj).then(res => {
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
            })
        }
    }
}
</script>

<style>

</style>

