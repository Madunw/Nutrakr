<template >
  <div
    style="margin-top: 30px"
    :class="isShow ? 'fromBlock-show' : 'fromBlock-hide'"
  >
    <!-- button -->
    <div @click="handleDrawer">
    <drawer ></drawer>
    </div>
    <!-- form -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="性別" prop="gender">
        <el-radio-group v-model="ruleForm.gender">
          <el-radio border:label="1">男性</el-radio>
          <el-radio border:label="2">女性</el-radio>
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
          <el-tooltip placement="top" effect="light">
            <div slot="content">
              生活の大部分が座位で、<br />静的な活動が中心の場合
            </div>
            <el-radio :label="1" border>低い</el-radio>
          </el-tooltip>
          <el-tooltip placement="top" effect="light">
            <div slot="content">
              座位中心の仕事だが、職場内での移動や立位<br />での作業・接客等、あるいは通勤・買物・家<br />事、軽いスポーツ等のいずれかを含む場合
            </div>
            <el-radio :label="2" border>ふつう</el-radio>
          </el-tooltip>
          <el-tooltip placement="top" effect="light">
            <div slot="content">
              移動や立位の多い仕事への従事者。<br />あるいは、スポーツなど余暇における<br />活発な運動習慣をもっている場合
            </div>
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
import bus from "../assets/eventBus";
import Drawer from "../components/Drawer";

export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年齢を入力してください"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("半角数字で入力してください"));
        }
      });
    };
    var checkHeight = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("身長を入力してください"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("半角数字で入力してください"));
        }
      });
    };
    var checkWeight = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("体重を入力してください"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("半角数字で入力してください"));
        }
      });
    };
    return {
      isShow: true,
      bmr: 0,
      CaloriesNeeded: 0,
      ruleForm: {
        gender: "",
        height: 0,
        weight: 0,
        age: 0,
        pal: "",
      },
      rules: {
        gender: [
          {
            required: true,
            message: "性別を選択してください",
            trigger: "change",
          },
        ],
        age: [{ validator: checkAge, trigger: "blur" }],
        height: [{ validator: checkHeight, trigger: "blur" }],
        weight: [{ validator: checkWeight, trigger: "blur" }],
        pal: [
          {
            required: true,
            message: "身体活動レベルを選択してください",
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {
    bmrmale() {
      //男性のBMRを算出
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
      //女性のBMRを算出
      return Math.round(
        ((0.0481 * this.ruleForm.weight +
          0.0234 * this.ruleForm.height -
          0.0138 * this.ruleForm.age -
          0.9708) *
          1000) /
          4.186
      );
    },
    ProteinNeeded() {
      //1日のタンパク質摂取量を算出
      return Math.round((this.CaloriesNeeded * 0.17) / 4);
    },
    CarbNeeded() {
      //1日の炭水化物摂取量を算出
      return Math.round((this.CaloriesNeeded * 0.28) / 9);
    },
    FatNeeded() {
      //1日の脂質摂取量を算出
      return Math.round((this.CaloriesNeeded * 0.58) / 4);
    },
  },
  methods: {
    handleDrawer() {
      this.isShow = !this.isShow;
    },
    submitForm(formName) {
      // 算出した値をbmrに与える
      if (this.ruleForm.gender == 1) {
        this.bmr = this.bmrmale;
      } else {
        this.bmr = this.bmrfemale;
      }
      //身体活動レベルを掛け、1日カロリを算出
      if (this.ruleForm.pal == 1) {
        this.CaloriesNeeded = Math.round(this.bmr * 1.5);
      } else if (this.ruleForm.pal == 2) {
        this.CaloriesNeeded = Math.round(this.bmr * 1.75);
      } else {
        this.CaloriesNeeded = Math.round(this.bmr * 2);
      }
      //eventBusにパラメータを渡す
      bus.$emit("Cal", this.CaloriesNeeded);
      bus.$emit("Carb", this.CarbNeeded);
      bus.$emit("Prot", this.ProteinNeeded);
      bus.$emit("Fat", this.FatNeeded);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          comsole.console.log("submit!");
        } else {
          alert("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  components: {
    Drawer,
  },
};
</script>

<style scoped>
.fromBlock-show {
  position: relative;
  display: flex;
  float: right;
  justify-content: center;
  align-items: center;
  background-color: pink;
  height: 80%;
  width: 27%;
  border-radius: 16px;
  animation: show 1.5s;
}
.fromBlock-hide {
  position: relative;
  display: flex;
  float: right;
  justify-content: center;
  align-items: center;
  background-color: pink;
  height: 80%;
  width: 27%;
  border-radius: 16px;
  animation: dwawerHide 3s;
  animation: hide 1.5s;
  left: 500px;
}
/* hide animation */
@keyframes hide {
    0% {
        transform: translateX(-500px);
    }
    100% {
        transform: translateX(0px);
    }

}
/* show animation */
@keyframes show {
    0% {
        transform: translateX(500px);
    }
    100% {
        transform: translateX(0px);
    }

}
</style>