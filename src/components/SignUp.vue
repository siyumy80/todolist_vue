<template>
   <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
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

    <v-btn
      color="warning"
      @click="reset"
    >
      Reset Form
    </v-btn>
    
    <v-btn
      @click="cancel"
    >
      cancel
    </v-btn>
  </v-form>
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
        if(this.password !== this.passwordConfirm) {
          alert('비밀번호가 일치하지 않습니다.');
          return false;
        }
        let param = {
            email : this.email,
            password : this.password

        }
        this.$api.signUp(param)
      },
      cancel() {
          this.$router.push({name:'home'})
      }
    }
}
</script>
