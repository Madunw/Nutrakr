<!-- form componet to calculate nutrition needs -->
<template class="form">
  <!-- form -->
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
    <el-form-item label="性別" prop="gender">
      <div class="form-item">
        <el-radio-group v-model="ruleForm.gender">
          <el-radio-button label="male"
            >&emsp;&nbsp;&nbsp;&thinsp;男性&emsp;&nbsp;&nbsp;&thinsp;</el-radio-button
          >
          <el-radio-button label="female"
            >&emsp;&nbsp;&nbsp;&thinsp;女性&emsp;&nbsp;&nbsp;&thinsp;</el-radio-button
          >
        </el-radio-group>
      </div>
    </el-form-item>

    <el-form-item label="年齢" prop="age">
      <div class="form-item">
        <el-input v-model.number="ruleForm.age"></el-input>
      </div>
    </el-form-item>

    <el-form-item label="身長(cm)" prop="height">
      <div class="form-item">
        <el-input v-model.number="ruleForm.height"></el-input>
      </div>
    </el-form-item>

    <el-form-item label="体重(kg)" prop="weight">
      <div class="form-item">
        <el-input v-model.number="ruleForm.weight"></el-input>
      </div>
    </el-form-item>

    <el-form-item label="身体活動レベル" prop="active">
      <div class="form-item">
        <el-radio-group v-model="ruleForm.active">
          <el-tooltip
            effect="light"
            content="生活の大部分が座位で、静的な活動が中心の場合"
            placement="top-start"
          >
            <el-radio-button label="low">&ensp;低い&ensp;</el-radio-button>
            <!-- button tooltip -->
          </el-tooltip>
          <el-tooltip
            placement="top"
            effect="light"
            content="座位中心の仕事だが、職場内での移動や立位での作業・接客等、あるいは通勤・買物・家事、軽いスポーツ等のいずれかを含む場合"
          >
            <el-radio-button label="medium">ふつう</el-radio-button>
          </el-tooltip>
          <el-tooltip
            placement="top"
            effect="light"
            content="移動や立位の多い仕事への従事者。あるいは、スポーツなど余暇における活発な運動習慣をもっている場合"
          >
            <el-radio-button label="high">&ensp;高い&ensp;</el-radio-button>
          </el-tooltip>
        </el-radio-group>
      </div>
    </el-form-item>

    <el-form-item label="目標体重(kg)" prop="goalWeight">
      <div class="form-item">
        <el-input v-model.number="ruleForm.goalWeight"></el-input>
      </div>
    </el-form-item>

    <el-form-item>
      <el-button round type="primary" @click="submitForm('ruleForm')"
        >Submit</el-button
      >
      <el-button round @click="resetForm('ruleForm')">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState } from 'vuex';
import { userInfoAddress, userInfoABI } from '../../smart_contracts/contract';
export default {
  name: 'Form',
  data() {
    // validate if age-input is 'empty','halfwidth-number','range:5~150'
    var validateAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年齢を入力してください'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('半角数字で入力してください'));
        } else {
          if ((value < 5) | (value > 150)) {
            callback(new Error('正し年齢を入力してください'));
          } else {
            callback();
          }
        }
      });
    };
    // validate if heigh-input is 'empty','halfwidth-number','range:120~260'
    var validateHeight = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('身長を入力してください'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('半角数字で入力してください'));
        } else {
          if ((value < 120) | (value > 260)) {
            callback(new Error('正し身長を入力してください'));
          } else {
            callback();
          }
        }
      });
    };
    // validate if weight-input is 'empty','halfwidth-number','range:30~300'
    var validateWeight = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('体重を入力してください'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('半角数字で入力してください'));
        } else {
          if ((value < 30) | (value > 300)) {
            callback(new Error('正し体重を入力してください'));
          } else {
            callback();
          }
        }
      });
    };
    // validate if GoalWeight-input is 'empty','halfwidth-number'
    var validateGoalWeight = (rule, value, callback) => {
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('半角数字で入力してください'));
        } else {
            callback();
          }
        
      });
    };
    return {
      bmr: 0,
      caloriesNeeded: 0,
      // 表单数据 Form Data
      ruleForm: {
        gender: '',
        height: 0,
        weight: 0,
        age: 0,
        active: '',
        goalWeight: 0,
      },
      // 表单规则 Form rules
      rules: {
        gender: [
          {
            required: true,
            message: '性別を選択してください',
            trigger: 'change',
          },
        ],
        age: [{ validator: validateAge, trigger: 'blur' }],
        height: [{ validator: validateHeight, trigger: 'blur' }],
        weight: [{ validator: validateWeight, trigger: 'blur' }],
        active: [
          {
            required: true,
            message: '身体活動レベルを選択してください',
            trigger: 'change',
          },
        ],
        goalWeight: [{ validator: validateGoalWeight, trigger: 'blur' }],
      },
    };
  },
  computed: {
    bmrmale() {
      // 男性のBMRを算出
      return Math.round(
        ((0.0481 * this.ruleForm.weight +
          0.0234 * this.ruleForm.height -
          0.0138 * this.ruleForm.age -
          0.4235) *
          1000) /
          4.186
      );
    },
    bmrfemale() {
      // 女性のBMRを算出
      return Math.round(
        ((0.0481 * this.ruleForm.weight +
          0.0234 * this.ruleForm.height -
          0.0138 * this.ruleForm.age -
          0.9708) *
          1000) /
          4.186
      );
    },
  },
  methods: {
    // Formが正しかを判断
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.caloriesNeeded = this.caloriePerDayCalculate(
            this.ruleForm.gender
          );
          this.$store.state.form.caloriesNeeded = this.caloriesNeeded; // 把caloriePerDay传给vuex的方法getCaloriesNeeded
          this.$store.state.form.weight = this.ruleForm.weight; // 把weight传给vuex的方法getWeight
          this.$store.state.form.goalWeight = this.ruleForm.goalWeight; // 把weightGoal传给vuex的方法getWeightGoal
        }
      });
      this.$emit('isSubmitted', true); // 把isSubmitted传给父组件
    },
    // reset form
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 算出した値をbmrに与える
    caloriePerDayCalculate(gender) {
      if (gender === 'male') {
        this.bmr = this.bmrmale;
      } else if (gender === 'female') {
        this.bmr = this.bmrfemale;
      }
      if (this.ruleForm.active == 'low') {
        return Math.round(
          this.bmr * 1.5 + ((this.ruleForm.goalWeight-this.ruleForm.weight) * 7700) / 28
        );
      } else if (this.ruleForm.active == 'medium') {
        return Math.round(
          this.bmr * 1.75 + ((this.ruleForm.goalWeight-this.ruleForm.weight) * 7700) / 28
        );
      } else if (this.ruleForm.active == 'high') {
        return Math.round(
          this.bmr * 2 + ((this.ruleForm.goalWeight-this.ruleForm.weight) * 7700) / 28
        );
      }
    },
  },
};
</script>
<style scoped>
.form-item {
  width: 250px;
  padding-left: 30px;
}
.el-form-item__content button {
  margin-right: 50px;
}
</style>
