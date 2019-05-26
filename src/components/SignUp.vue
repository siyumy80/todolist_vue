<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs6>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="userId"
          placeholder="vue@vue.com"
          hint="vue@vue.com"
          required
        ></v-text-field>
        <v-text-field
            v-model="password"
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
        ></v-text-field>
        <v-text-field
            v-model="passwordConfirm"
            :append-icon="show2 ? 'visibility' : 'visibility_off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="passwordConfirm"
            hint="At least 8 characters"
            counter
            @click:append="show2 = !show2"
        ></v-text-field>
        <v-btn color="success" @click="signUp()">
          Sing Up
        </v-btn>
        <v-btn color="warning"
          @click="reset">
          Reset Form
        </v-btn>
        <v-btn  @click="cancel">
          cancel
        </v-btn>
      </v-form>
    </v-flex>    
  </v-layout>
</template>
<script>
export default {
    name :'signUp',
    data() {
        return{
            valid: true,
            show1: false,
            show2: false,
            password: '',
            passwordConfirm: '',
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters',
                emailMatch: () => ('The email and password you entered don\'t match')
            },
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
           
        }
    },
    methods: {
      validate() {
        return true;
      },
      reset() {
        this.$refs.form.reset()
      },
      signUp() {
        if(this.email === '') {
          alert('비밀번호가 일치하지 않습니다.');
          return false;
        }
        if(this.password === '' || this.passwordConfirm === '') {
          alert('비밀번호가 일치하지 않습니다.');
          return false;
        }
      
        if(this.password !== this.passwordConfirm) {
          alert('비밀번호가 일치하지 않습니다.');
          return false;
        }
        let param = {
            user_id  : this.email,
            password : this.password

        }

        this.$api.chkDupUser(this.email)
        .then(response => {
          if( 0 < response.data.totCnt) {
            alert('이미 계정이 있는 사용자입니다.');
            this.email = '';
            return false;
            //this.$router.push('/')
          }
        }).then(() => {
          this.$api.signIn(param)
          .then((data) => {
            alert('Welcome!! 로그인 해주시오')
            this.$router.push('/')
          })
        })
      },
      cancel() {
          this.$router.push({name:'home'})
      }
    }
}
</script>
