import { mapState } from "vuex";
import moment from "moment";
export default {
  install(Vue) {
    Vue.mixin({
      data() {
        return {
          instance: undefined,
          textCont: "",
          businessTypeArr: [
            {name: "整租", value: "2"},
            {name: "长短租", value: "1"},
            {name: "日租", value: "5"},
            {name: "分时", value: "3"},
            {name: "集团", value: "4"}
          ],
          // 时间插件使用的配置参数
          pickerOptions2: {
            shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
          }
        }
      },
      computed: {
        ...mapState(['company', 'partner', 'maintenance'])
      },
      methods: {
        // 限制输入带小数点的数字
        limitNum(e) {
          const ele = e.target;
          ele.value = ele.value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g, '');
        },
        // 限制输入数字
        limitN(e) {
          const ele = e.target;
          ele.value = ele.value.replace(/[^\d]/g, '');
        },
        // 过滤业务的值，返回正确的value
        getBusinessType(arr) {
          const newArr = [];
          for (let i = 0; i < this.businessTypeArr.length; i++) {
            if (arr.includes(this.businessTypeArr[i].name)) {
              newArr.push(this.businessTypeArr[i].value);
            }
          }
          return newArr;
        },
        // 通过sn反写公司
        getCompanyName(sn) {
          let sname = '';
          if (this.company.comp || this.company.comp.length > 0) {
            const s = this.company.comp.findIndex(ele => {
              return ele.sn === sn;
            });
            sname = s === -1 ? '' : this.company.comp[s].companyName;
          }
          return sname;
        },
        // 通过id反写公司
        gainCompanyName(id) {
          let sname = '';
          if (this.company.comp || this.company.comp.length > 0) {
            const s = this.company.comp.findIndex(ele => {
              return ele.id == id;
            });
            sname = s === -1 ? '' : this.company.comp[s].companyName;
          }
          return sname;
        },
        // 时间过滤的方法得到 YYYY-MM-DD HH:mm:ss
        time(val, format) {
          return val ? moment(val).format(format || "YYYY-MM-DD HH:mm:ss") : "";
        },
        // textare换行添加自动换行
        wrapFun(e) {
          const cont = e.target.value.replace(/(\r\n)|(\n)/g, "</br>");
          e.target.value = cont;
          console.log(cont)
        },
        // 过滤formDataFun提交
        formDataFun(obj) {
          const param = {};
          for (const key in obj) {
            if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
              param[key] = obj[key];
            }
          }
          return param;
        },
        // 将时间戳转成时间格式
        timestampToTime(timestamp) {
          const date = new Date(timestamp);// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
          const Y = date.getFullYear() + '-';
          const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          const D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
          const h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
          const m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
          const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
          return Y + M + D + h + m + s;
        },
        capslockonoff(event) {
          const e = event || window.event
          const keyvalue = e.keyCode ? e.keyCode : e.which
          const shifKey = e.shiftKey ? e.shiftKey : this.isSift(keyvalue)
          const strlen = $(event.target).val().length
          if (strlen) {
              const uniCode = $(event.target).val().charCodeAt($(event.target).val().length - 1)
              if (keyvalue >= 65 && keyvalue <= 90) {
                if (((uniCode >= 65 && uniCode <= 90) && !shifKey) || ((uniCode >= 97 && uniCode <= 122) && shifKey)) {
                  // console.log('开启');
                  if (!this.instance) {
                    this.instance = this.$notify({
                      title: '提示',
                      message: '大写锁定',
                      duration: 0,
                      type: 'warning',
                      showClose: false
                    });
                  }
                  return true
                } else {
                  // console.log('未开启');
                  if (this.instance) {
                    this.instance.close()
                    this.instance = undefined
                  }
                  return false
                }
              }
          }
        },
        // 字符串转字符流
        s2ab (s) {
          if (typeof ArrayBuffer !== 'undefined') {
              const buf = new ArrayBuffer(s.length)
              const view = new Uint8Array(buf)
              for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
                return buf
              } else {
                const buf = new Array(s.length)
                for (let i = 0; i !== s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF
                return buf
              }
        },
        // 验证自符串的长度的返回
        WidthCheck(str, maxLen) {
          let w = 0;
          // const tempCount = 0;
          // length 获取字数数，不区分汉子和英文
          for (let i = 0; i < str.length; i++) {
            // charCodeAt()获取字符串中某一个字符的编码
            const c = str.charCodeAt(i);
            // 单字节加1
            if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
              w++;
            } else {
              w += 2;
            }
          }
          if (w > maxLen) {
            return false;
          } else {
            return true;
          }
        },
        // 处理字符串长度
        cutString(str, len) {
          // length属性读出来的汉字长度为1
          if (str.length * 2 <= len) {
              return str;
          }
          let strlen = 0;
          let s = "";
          for (let i = 0; i < str.length; i++) {
              s = s + str.charAt(i);
              if (str.charCodeAt(i) > 128) {
                  strlen = strlen + 2;
                  if (strlen >= len) {
                      return s.substring(0, s.length - 1) + "...";
                  }
              } else {
                  strlen = strlen + 1;
                  if (strlen >= len) {
                      return s.substring(0, s.length - 2) + "...";
                  }
              }
          }
          return s;
        },
        isSift(v) {
          if (v === 16) {
            return true
          } else {
            return false
          }
        },
        capClose() {
          if (this.instance) {
            this.instance.close()
            this.instance = undefined
          }
        }
      }
    });
  }
}
