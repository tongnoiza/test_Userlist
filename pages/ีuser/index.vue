<template>
    <div>
      <a-card size="small" class="card"> <a-form ref="formRef" :rules="rules" :model="formState" name="formuser">
          <a-form-item label="Username" name="name" :rules="[{ required: true, message: 'Please input your username!' }]">
            <a-input v-model:value="formState.name" />
          </a-form-item>
          <a-form-item label="Lastname" name="lastname"
            :rules="[{ required: true, message: 'Please input your lastname!' }]">
            <a-input v-model:value="formState.lastname" />
          </a-form-item>
  
          <a-form-item label="Activity form" name="desc">
            <a-textarea v-model:value="formState.desc" />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="onSubmit">Create</a-button>
            <a-button style="margin-left: 10px" @click="formRef.resetFields()">Cancel</a-button>
          </a-form-item>
        </a-form></a-card>
  
    </div>
  </template>
  
  
  <script>
  export default {
    name: "CreateUserdetail",
    async setup() {
      const formRef = ref()
      return {
        formRef,
      }
    },
  
    data() {
  
      return {
        rules: {
          name: [
            { required: true, message: 'Please input Activity name', trigger: 'change' },
            { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
          ],
          lastname: [{ required: true, message: 'Please select activity resource', trigger: 'change' }],
        },
        formState: reactive({ lastname: '', name: '', desc: '' }),
        id: useRoute().query.id,
        mode: useRoute().query.mode,
      };
    },
   async mounted(){
        console.log('useRoute().query.id ',useRoute().query.id);
      if (useRoute().query.id) {
        const { data} = await useFetch('/User/findByPk', {
          method: 'POST',
          baseURL: 'http://localhost:3002',
          body: { id: useRoute().query.id}
        })
        this.formState = data.value
      }
    },
    async created(){
    
    },
    computed: {
      Createmode: () => useRoute().query.mode == 'create'
    },
    methods: {
      async onSubmit() {
        if (this.Createmode){
              this.formRef
            .validate()
            .then(async () => {
              const { data } = await useFetch('User/save', {
                method: 'POST',
                body: this.formState,
                baseURL: 'http://localhost:3002'
              })
              console.log('values', formState, toRaw(formState));
            })
            .catch(error => {
              console.log('error', error);
            });
        }else {
          const { data } = await useFetch('User/save', {
                method: 'POST',
                body: this.formState,
                baseURL: 'http://localhost:3002'
              })
         
          
        }
      
  
  
      },
    },
  };
  </script>
  <style>
  .card {
    margin-top: 5% !important;
    width: 40%;
    margin: auto;
    padding: 10px;
  }
  </style>
  