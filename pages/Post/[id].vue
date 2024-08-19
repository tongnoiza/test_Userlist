<template>
  <div>
    <v-btn @click="$router.back()">
      Back
    </v-btn>
    <v-container>
      <v-row no-gutters>
        <!-- {{ PostDetail }} -->
        <v-col>
          <div>
            <v-expansion-panels v-model="panel" :disabled="disabled" multiple>
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <v-row>
                    <div>
                      <h2>{{ PostDetail.PostHeader }}</h2>
                    </div><br>
                    <!-- <div> <h3>{{ PostDetail?.PostHeader }}</h3></div> -->
                  </v-row>
                  <!-- โพสต์วันที่   -->
                </v-expansion-panel-title>   <v-textarea
                  label="Label"
                  v-model="PostDetail.PostMsg"
                  variant="filled"
                  auto-grow
                ></v-textarea>
                <!-- <v-expansion-panel-text style="min-height: 250px;">
               
           
                </v-expansion-panel-text> -->
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </v-col>
      </v-row>
      <!-- {{ PostDetail }} -->
    </v-container>
    <v-container v-for="obj in PostDetail?.Comments">
      <v-row no-gutters>
        <v-col> <v-card :text="'แสดงความคิดเห็นโดย ' + obj.commentby" variant="tonal">
            <div style="padding-left: 10px;">{{ obj.createdAt.split('T')[0].split('-').reverse().join('/') }}</div>
            <div style="padding: 10px;">{{ obj.msg }}</div>
          </v-card></v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row no-gutters>
        <v-col> <v-textarea v-model="msg" label="Comment"></v-textarea></v-col>
      </v-row> <v-btn @click="SendComment">Comment</v-btn>
    </v-container>
  </div>
</template>

<script>
export default {
 async  created() {
    const { data } = useFetch(`http://localhost:3002/post/getpost/${useRoute().params.id}`, { method: 'get', })
    this.PostDetail = await data
  },
  data() {
    return {
      PostDetail: {},
      data: {},
      disabled: true,
      panel: [0, 1],
      // PostDetail: {}
    };
  },
  methods: {
   async SendComment() {
      useFetch(() => `http://localhost:3002/post//comment`, {
        method: 'POST',
        body: { msg: this.msg, PostId: useRoute().params.id, commentby: this.PostDetail.Username }
      })
      const { data } = useFetch(() => `http://localhost:3002/post/getpost/${useRoute().params.id}`, { method: 'get', })
      this.PostDetail = await data
    }
  },
}
</script>
<style>
.card {
  margin-top: 5% !important;
  width: 40%;
  margin: auto;
  padding: 10px;
}
</style>
