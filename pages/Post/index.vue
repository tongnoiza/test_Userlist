<template>
  <div>
    <!-- <v-btn @click="tog = !tog">click</v-btn>
    {{ tog }}
    <v-skeleton-loader :loading="tog" class="mx-auto border" max-width="300"
    type="card-avatar, actions">
    <v-responsive>
      <v-img
        src="https://9to5mac.com/wp-content/uploads/sites/6/2020/06/pip-iphone-controls.jpg?quality=82&strip=all"
        class="rounded-lg mb-2"
        height="auto"
      ></v-img>
    </v-responsive>
  </v-skeleton-loader> -->
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
          <v-card > 
            <!-- <v-list lines="two">
              <v-list-item v-for="n in rd" :key="n" :title="n.PostHeader" :subtitle="n.PostMsg"
                :prepend-avatar="data.user.image" @click="seedata(n)">iugiug</v-list-item>
            </v-list> -->

            <v-table>
              <thead>
                <tr>
                  <th class="text-left">
                    PostHeader
                  </th>
                  <th class="text-left">
                    createdAt
                  </th>
                  <th class="text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in rd"
                  :key="item.id"
                  @dblclick="seedata(item )"
                >
                  <td>
                    <v-row>ผู้โพสต์ {{item.Username}}</v-row>
                    <v-row>{{ item.PostHeader }}</v-row>
                    
                  </td>
                  <td>{{ item.createdAt }}</td>
                  <td> </td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </v-col>
        <v-col></v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup >
const { data,getProviders } = useAuth()
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
let tog = ref(false)
const ff = []
let form = reactive({})
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
  console.log('ลอง ', JSON.parse(JSON.stringify(data))._object['$sauth:data'].user );
 const {name } =  JSON.parse(JSON.stringify(data))._object['$sauth:data'].user
  await useFetch('http://localhost:3002/post/topic', {
    body: { Username: name , ...form },
    method: 'post'
  }) 
  form = await reactive({})
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
