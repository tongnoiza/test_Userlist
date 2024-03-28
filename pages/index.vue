<template>
  <div>
    {{ userList }}
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="CRUD Basic"
    />
    <div class="vertical-center table-width">
      <a-button
        class="editable-add-btn"
        style="margin-bottom: 8px"
        @click="Goto('Create')"
        >Create User</a-button
      >
      <!-- <a-card class="vertical-center">
            <a-table :columns="columns" :data-source="data"
                :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }" />
        </a-card> -->
      <a-table :columns="columns" :data-source="dataList" :pagination="false">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'name'">
            <span>
              <!-- <smile-outlined /> -->
              Name
            </span>
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            {{ record.name }}
            
          </template>
          <template v-if="column.key === 'lastname'">
            {{ record.lastname }}
          </template>
          <template v-if="column.key === 'desc'">
            {{ record.desc }}
          </template>
          <!-- <template v-else-if="column.key === 'tags'">
                        <span>
                            <a-tag v-for="tag in record.tags" :key="tag"
                                :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
                                {{ tag.toUpperCase() }}
                            </a-tag>
                        </span>
                    </template> -->
          <template v-else-if="column.key === 'action'">
            <span>
              <a @click="Goto('Edit', record.id)">Edit</a>
              <a-divider type="vertical" />
              <a @click="Delete(record.id)">Delete</a>
              <a-divider type="vertical" />
            </span>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script>
// import { usePagination } from 'vue-request';
export default {
  name: "test",
  async created() {
    this.search()
  },

  data() {
    return {
        dataList:[],
      pagination: {},
      state: {
        selectedRowKeys: [],
        loading: false,
      },
      ff: [],
      form: {},
      columns: [
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
      ],
      data: [
        {
          key: "1",
          name: "John Brown",
          age: 32,
          address: "New York No. 1 Lake Park",
          tags: ["nice", "developer"],
        },
        {
          key: "2",
          name: "Jim Green",
          age: 42,
          address: "London No. 1 Lake Park",
          tags: ["loser"],
        },
        {
          key: "3",
          name: "Joe Black",
          age: 32,
          address: "Sidney No. 1 Lake Park",
          tags: ["cool", "teacher"],
        },
      ],
    };
  },
  computed: {
    hasSelected: () => state.selectedRowKeys.length > 0,
  },
  methods: {
    async  search(){
        const { data } = await useFetch("/User/findall", {
      baseURL: "http://localhost:3002",
    });
   this.dataList = JSON.parse(JSON.stringify(data.value));

    console.log("list ", this.dataList);
    },
    Goto(mode, id) {
      const router = useRouter();
      router.push(`/test${mode ? "?mode=" + mode : ""}${id ? "&id=" + id : ""}`);
      // this.$route.
    },
   async Delete(id){
        await useFetch("/User/delete", {
      method: "DELETE",
      body:{id:id},
      baseURL: "http://localhost:3002",
    });
 this.search()
    }

  
    
  },
};
</script>
<style lang="css">
.box {
  backdrop-filter: blur(3px);
  background-color: rgba(255, 255, 255, 0.1);
  width: 1200px;
  height: 50px;
  color: rgb(255, 255, 255);
  font-family: "Courier New", Courier, monospace;
  font-size: large;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 2.5), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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
</style>
