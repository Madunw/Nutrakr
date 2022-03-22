<template>
  <div :class="isShow ? 'fromBlock-show' : 'fromBlock-hide'">
    <!-- button -->aa{{$store.getters.ProteinNeeded}}bb{{$store.state.form.caloriesNeeded}}
    <div @click="handleDrawer" class="toggle">
      <el-button circle
        ><div class="arrow">
          <font-awesome-icon
            :icon="isShow ? 'chevron-right' : 'chevron-left'"
          /></div
      ></el-button>
    </div>
    <!-- form -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
    >
      <el-form-item label="性別" prop="gender">
        <el-radio-group v-model="ruleForm.gender">
          <el-radio border :label="1">男性</el-radio>
          <el-radio border :label="2">女性</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="年齢" prop="age">
        <div style="width: 200px; margin: 0 auto">
          <el-input v-model.number="ruleForm.age"></el-input>
        </div>
      </el-form-item>

      <el-form-item label="身長(cm)" prop="height">
        <div style="width: 200px; margin: 0 auto">
          <el-input v-model.number="ruleForm.height"></el-input>
        </div>
      </el-form-item>

      <el-form-item label="体重(kg)" prop="weight">
        <div style="width: 200px; margin: 0 auto">
          <el-input v-model.number="ruleForm.weight"></el-input>
        </div>
      </el-form-item>

      <el-form-item label="身体活動レベル" prop="pal">
        <el-radio-group v-model="ruleForm.pal">
          <el-tooltip
        effect="light"
        content="生活の大部分が座位で、静的な活動が中心の場合"
        placement="top-start"
      >
            <el-radio :label="1" border>低い</el-radio>
          </el-tooltip>
          <el-tooltip placement="top" effect="light" content="座位中心の仕事だが、職場内での移動や立位での作業・接客等、あるいは通勤・買物・家事、軽いスポーツ等のいずれかを含む場合">
            
            <el-radio :label="2" border>ふつう</el-radio>
          </el-tooltip>
          <el-tooltip placement="top" effect="light" content="移動や立位の多い仕事への従事者。あるいは、スポーツなど余暇における活発な運動習慣をもっている場合">
          
            <el-radio :label="3" border>高い</el-radio>
          </el-tooltip>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >Submit</el-button
        >
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Form',
  data () {
    
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年齢を入力してください'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('半角数字で入力してください'))
        } else {
          if ((value < 5) | (value > 150)) {
            callback(new Error('正し年齢を入力してください'))
          } else {
            callback()
          }
        }
      })
    }
    var checkHeight = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('身長を入力してください'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('半角数字で入力してください'))
        } else {
          if ((value < 120) | (value > 250)) {
            callback(new Error('正し身長を入力してください'))
          } else {
            callback()
          }
        }
      })
    }
    var checkWeight = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('体重を入力してください'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('半角数字で入力してください'))
        } else {
          if ((value < 30) | (value > 350)) {
            callback(new Error('正し体重を入力してください'))
          } else {
            callback()
          }
        }
      })
    }
    return {
      isShow: true,
      formIsOK: true,
      bmr: 0,
        ruleForm: {
          gender: '',
          height: 0,
          weight: 0,
          age: 0,
          pal: ''
        },
      // 表单规则
      rules: {
        gender: [
          {
            required: true,
            message: '性別を選択してください',
            trigger: 'change'
          }
        ],
        age: [{ validator: checkAge, trigger: 'blur' }],
        height: [{ validator: checkHeight, trigger: 'blur' }],
        weight: [{ validator: checkWeight, trigger: 'blur' }],
        pal: [
          {
            required: true,
            message: '身体活動レベルを選択してください',
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState({
    "caloriesNeeded": state => state.form.caloriesNeeded,
    bmrmale () {
      // 男性のBMRを算出
      return Math.round(
        ((0.0481 * this.ruleForm.weight +
          0.0234 * this.ruleForm.height -
          0.0138 * this.ruleForm.age -
          0.4235) *
          1000) /
          4.186
      )

    },
    bmrfemale () {
      // 女性のBMRを算出
      return Math.round(
        ((0.0481 * this.ruleForm.weight +
          0.0234 * this.ruleForm.height -
          0.0138 * this.ruleForm.age -
          0.9708) *
          1000) /
          4.186
      )
    },
})
},
  methods: {
     
    // FormDawerの開け閉め
    handleDrawer () {
      this.isShow = !this.isShow
    },
    // Formが正しかを判断
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          this.formCalculate()
          // hide formDrawer
          this.handleDrawer()
          } 
        });
      },
    // 重置form
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    formCalculate(){
          this.bmrCalculate() // bmr計算
          this.$store.commit('getRequired',this.bmr,this.ruleForm.pal) // 把bmr传给vuex的方法getRequired
        },
        // 算出した値をbmrに与える
    bmrCalculate () {
      if (this.ruleForm.gender === 1) {
        this.bmr = this.bmrmale
      } else {
        this.bmr = this.bmrfemale
      }
    },
  }
}
</script>
<style scoped>
  .fromBlock-show {
    animation: show 1.5s;
  }
  .fromBlock-hide {
    animation: hide 1.5s;
    left: 514px;
  }
  .toggle {
    position: absolute;
    cursor: pointer;
    top: calc(50% - 40px);
    left: -20px;
    border-radius: 50%;
    border: 5px solid black;
  }
  .arrow {
    height: 15px;
    width: 15px;
  }
  /* hide animation */
  @keyframes hide {
    0% {
      transform: translateX(-489px);
    }
    100% {
      transform: translateX(0px);
    }
  }
  /* show animation */
  @keyframes show {
    0% {
      transform: translateX(489px);
    }
    100% {
      transform: translateX(0px);
    }
  }
  </style>