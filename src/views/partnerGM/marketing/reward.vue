<template>
    <div>
        <el-form :model="rewardForm" label-width="140px" style="width: 1100px">
            <el-form-item label="开启合伙人奖励：">
                <el-row>
                    <el-radio v-model="rewardForm.obj1.isEnable" :label="1">开启</el-radio>
                    <el-radio v-model="rewardForm.obj1.isEnable" :label="0">不开启</el-radio>
                </el-row>
                <el-row>
                    <el-col :span="5">
                        <el-select v-model="rewardForm.obj1.bonusType" placeholder="选奖励方式" clearable>
                            <el-option label="优惠券" :value="1"></el-option>
                            <el-option label="金币" :value="2" disabled></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="5">
                        <el-select v-if="rewardForm.obj1.bonusType == 1" v-model="rewardForm.obj1.relateId" placeholder="选券" clearable>
                            <el-option v-for="item in coupons" 
                                :key="item.id"
                                :label="item.name" 
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <el-input v-model="rewardForm.obj1.bonusAmount" clearable v-else-if="rewardForm.obj1.bonusType == 2"></el-input>
                    </el-col>
                </el-row>       
            </el-form-item>

            <el-form-item label="受邀成功奖励：">
                <el-row>
                    <el-radio v-model="rewardForm.obj2.isEnable" :label="1">开启</el-radio>
                    <el-radio v-model="rewardForm.obj2.isEnable" :label="0">不开启</el-radio>
                </el-row>
                <el-row>
                    <el-col :span="5">
                        <el-select v-model="rewardForm.obj2.bonusType" placeholder="选奖励方式" clearable>
                            <el-option label="优惠券" :value="1"></el-option>
                            <el-option label="金币" :value="2" disabled></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="5">
                        <el-select v-if="rewardForm.obj2.bonusType == 1" v-model="rewardForm.obj2.relateId" placeholder="选券" clearable>
                            <el-option v-for="item in coupons" 
                                :key="item.id"
                                :label="item.name" 
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <el-input v-model="rewardForm.obj2.bonusAmount" clearable v-else-if="rewardForm.obj2.bonusType == 2"></el-input>
                    </el-col>
                </el-row>       
            </el-form-item>

            <el-form-item label="获得新粉丝奖励：">
                <el-row>
                    <el-radio v-model="rewardForm.obj3.isEnable" :label="1">开启</el-radio>
                    <el-radio v-model="rewardForm.obj3.isEnable" :label="0">不开启</el-radio>
                </el-row>
                <el-row>
                    <el-col :span="4">
                        <span>新增1个粉丝时获得奖励</span>
                    </el-col>
                    <el-col :span="4">
                        <el-select v-model="rewardForm.obj3.bonusType" placeholder="选奖励方式" style="width: 90%" clearable>
                            <el-option label="优惠券" :value="1" disabled></el-option>
                            <el-option label="金币" :value="2"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3">
                        <el-select v-if="rewardForm.obj3.bonusType == 1" v-model="rewardForm.obj3.relateId" style="width: 90%" placeholder="选券" clearable>
                            <el-option v-for="item in coupons" 
                                :key="item.id"
                                :label="item.name" 
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <el-input v-model="rewardForm.obj3.bonusAmount" clearable v-else-if="rewardForm.obj3.bonusType == 2" style="width: 90%"></el-input>
                    </el-col> 
                    <el-col :span="2.5">
                        <span>每日累加奖励</span>
                    </el-col>
                    <el-col :span="2">
                        <el-input v-model="rewardForm.obj3.dailyCountLimit" clearable></el-input>
                    </el-col> 
                    <el-col :span="1">
                        <span>次</span>
                    </el-col>        
                </el-row>    
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm4">保存</el-button>
            </el-form-item>      

        </el-form>    

    </div>
</template>

<script>

import { bonusConfigGet, bonusConfigUpdate } from "@/api/marketing";
export default {
    data() {
        return {
            rewardForm: {
                obj1: {
                    isEnable: 1,
                    bonusType: 1,
                    relateId: '',
                    bonusAmount: '',
                    configType: 1
                },
                obj2: {
                    isEnable: 1,
                    bonusType: 1,
                    relateId: '',
                    bonusAmount: '',
                    configType: 2
                },
                obj3: {
                    isEnable: 1,
                    bonusType: 2,
                    relateId: '',
                    bonusAmount: '',
                    fansCountLimit: 1,
                    dailyCountLimit: '',
                    configType: 3
                }
            },
            coupons: []

        }
    },
    mounted() {
        this.bonusConfigGet()
    },
    methods: {
        bonusConfigGet() {
            bonusConfigGet().then(res => {
                this.coupons = res.coupons;
                const bonusConfigs = res.bonusConfigs;
                bonusConfigs.forEach(element => {
                   if (element.configType == 1) {
                       // 开启合伙人
                       element.createTime = this.time(element.createTime);
                       element.updateTime = this.time(element.updateTime);
                       this.rewardForm.obj1 = {...element}
                   } else if (element.configType == 2) {
                       // 受邀成功
                       element.createTime = this.time(element.createTime);
                       element.updateTime = this.time(element.updateTime);
                       this.rewardForm.obj2 = {...element}
                   } else {
                       // 新粉丝奖励
                       element.createTime = this.time(element.createTime);
                       element.updateTime = this.time(element.updateTime);
                       this.rewardForm.obj3 = {...element}
                   }
                });
            })
        },
        submitForm4() {
            const arr = [];
            arr[0] = this.rewardForm.obj1;
            arr[1] = this.rewardForm.obj2;
            arr[2] = this.rewardForm.obj3;
            bonusConfigUpdate({bonusConfigsStr: JSON.stringify(arr)}).then(res => {
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

