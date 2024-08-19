<template>
  <div>
    <v-btn @click="useRouter().back()">
      goto back
    </v-btn>
    <v-btn class="pe-2 pl-2" variant="flat">
      <div class="text-none font-weight-regular">
        New Post
      </div>
      <v-dialog activator="parent" max-width="500">
        <template v-slot:default="{ isActive }">
          <v-card rounded="lg">
            <v-card-title class="d-flex justify-space-between align-center">
              <div class="text-h5 text-medium-emphasis ps-2">
                Post
              </div>

              <v-btn icon="mdi-close" variant="text" @click="isActive.value = false"></v-btn>
            </v-card-title>
            <v-divider class="mb-4"> โพสต์วันที่</v-divider>
            <v-card-text>
              <v-text-field label="Toptic" v-model="form.PostHeader" variant="outlined"></v-text-field>
              <v-textarea v-model="form.PostMsg" label="Message" :counter="300" class="mb-2" rows="2" variant="outlined"
                persistent-counter>

              </v-textarea>


            </v-card-text>

            <v-divider class="mt-2"></v-divider>

            <v-card-actions class="my-2 d-flex justify-end">
              <v-btn class="text-none" rounded="xl" text="Cancel" @click="isActive.value = false"></v-btn>

              <v-btn class="text-none" color="primary" rounded="xl" text="Send" variant="flat"
                @click="CreatePost(); isActive.value = false"></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-btn>
    <v-container>
      <v-row>
        <v-col>
        </v-col>
        <v-col cols="12" md="8" sm="4">
          <v-card text="PostList"> <v-list lines="two">
              <v-list-item v-for="n in rd" :key="n" :title="n.PostHeader" :subtitle="n.PostMsg"
                :prepend-avatar="data.user.image" @click="seedata(n)"></v-list-item>
            </v-list></v-card>
        </v-col>
        <v-col></v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup >
const { data } = useAuth()
let router = useRouter();
let rd = []
const PostList = []
// ws: new WebSocket('wss://motorsocket.onrender.com'),
const msglist = []
const dataList = []
const pagination = {}
const state = {
  selectedRowKeys: [],
  loading: false,
}
const ff = []
const form = {}
const columns = [
  {
    name: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "lastname",
    dataIndex: "lastname",
    key: "lastname",
  },
  {
    title: "desc",
    dataIndex: "desc",
    key: "desc",
  },
  {
    title: "Action",
    key: "action",
  },
]

await search()
async function CreatePost() {
  console.log('getProviders ', await getProviders());
  console.log('ลอง ', JSON.parse(JSON.stringify(data)));
  await useFetch('http://localhost:3002/post/topic', {
    body: { Username: data.user.name, ...form },
    method: 'post'
  })
  await search()
  // isActive.value = false
}
async function search() {
  const { data, status, error, refresh, clear } = await useAsyncData('GetPost', () => fetch('/post/GetPostList'))
  rd = data._rawValue
  console.log("list ", data._rawValue);
}
async function seedata(v) {
  const n = JSON.parse(JSON.stringify(v))
  router.push({ path: `/Post/${n.id}` })
  // this.$route.push(`/Post/${n.id}`)
  //  await navigateTo({path:`/Post/${n.id}`})
}
async function Delete(id) {
  // await useFetch("/User/delete", {
  //   method: "DELETE",
  //   body: { id: id },
  //   baseURL: "http://localhost:3002",
  // });
  // this.search()
}
</script>
<style lang="css">
.box {
  backdrop-filter: blur(3px);
  background-color: rgba(255, 255, 255, 0.1);
  width: 420px;
  height: auto;
  color: rgb(0, 0, 0);
  font-family: "Courier New", Courier, monospace;
  font-size: large;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 2.5), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 30px;
  padding: 10px
}

footer {
  position: fixed;
  bottom: 2% !important;
  margin: auto;
}

.itemcenter {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-width {
  width: 80%;
}

.vertical-center {
  margin: auto;
  /* padding: 10px; */
}

button {
  margin-top: 10px;
}

div.scrollmenu {

  /* background-color: #333; */
  overflow-x: scroll;
  white-space: nowrap;
}

div.scrollmenu a {
  display: inline-block;
  color: rgb(0, 0, 0);
  text-align: center;
  padding: 14px;
  text-decoration: none;
}

div.scrollmenu a:hover {
  background-color: #777;
  /* border-radius: 10px;
  width: 20px;
  height: 20px; */
}

div.scrollmenu a::selection {
  text-decoration: underline
    /* text-decoration */
    /* border-radius: 10px;
  width: 20px;
  height: 20px; */
}

img {
  width: 80px;
  padding: 18px;
  border-radius: 67px;
}
</style>
