<template>
  <div class="applications">
    <div class="applications-title">
      <button @click="()=>{
        modalState=true;
        applicationPayload={
        premise_id: null,
        apartment_id: null,
        applicant: {
          first_name: null,
          last_name: null,
          patronymic_name: null,
          username: null,
        },
        description: null,
        due_date: null,
        status_id: 0
      }
      }" type="submit" class="applications-title-btn-add">
        СОЗДАТЬ
      </button>
    </div>
    <div class="applications-filter">
      <input-text
          placeholder="Поиск (№ заявки, название)"
          v-model="search"
      >
        <template v-slot:append>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z" fill="#999999"/>
          </svg>
        </template>
      </input-text>

      <input-select
          placeholder="Дом"
          :items="userPremises? userPremises : []"
          item-key="address"
          item-value="id"
          v-model="premise_id"
      />
    </div>

    <div class="applications-content">
      <DataTable
          :loading="loading"
          :columns="columns"
          :items="items? items.results : []"
      >
        <template v-slot:default="{ items }">
          <tr v-for="item in items">
            <td><div @click="editApplication(item)" class="number-btn">{{ item?.number }}</div></td>
            <td>{{ dateToString(item?.created_at) }}</td>
            <td>{{ item?.premise?.address }}</td>
            <td>{{ item?.applicant?.last_name }} {{ item?.applicant?.first_name }}</td>
            <td>{{ item?.description.length > 28 ? item?.description.slice(0, 28) + '...' : item?.description }}</td>
            <td>{{ dateToString(item.due_date) }}</td>
            <td>{{ item?.status?.name }}</td>
          </tr>
        </template>
      </DataTable>
    </div>

    <div class="applications-actions">
      <div class="applications-actions-title">
        <p><b>{{ items? `${(items.page-1)*items.page_size}-${(items.page-1)*items.page_size+items.page_size}` : '0-0' }}</b> из <b>{{ items? items.count : '0' }}</b> записей</p>
        <div>
          <input-select
              placeholder="10"
              class="applications-actions-title-filter"
              :items="[
                  { name: '10', value: '10' },
                  { name: '20', value: '20' },
                  { name: '50', value: '50' },
                  { name: '100', value: '100' },
              ]"
              item-key="name"
              item-value="value"
              v-model="pageSize"
          />
        </div>
      </div>
      <pagination
          :pagination="items? { per_page: 10, total: items.count, total_pages: items.pages } : { per_page: 10, total: 0, total_pages: 0 }"
          v-model="page"
      />
    </div>

    <Modal
        v-model="modalState"
        width="738"
        height="480"
    >
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(createApplication)"  class="modal-create">
          <div class="modal-create-title">
            <p>{{ applicationPayload.hasOwnProperty("number")? `Заявка № ${applicationPayload.number} (от ${dateToString(applicationPayload.created_at)})` : 'Создание заявки' }}</p>
            <p>Новая</p>
          </div>

          <div class="modal-create-row">
            <input-select
                placeholder="Дом"
                name="Дом"
                rules="required"
                :items="userPremises? userPremises : []"
                item-key="address"
                item-value="id"
                v-model="applicationPayload.premise_id"
            />
            <input-select
                placeholder="Квартира"
                name="Квартира"
                rules="required"
                :items="apartmentItems"
                item-key="label_floor_area"
                item-value="id"
                v-model="applicationPayload.apartment_id"
            />
            <input-text rules="required" type="date" placeholder="Срок" name="Срок" v-model="applicationPayload.due_date"/>
          </div>

          <div class="modal-create-row">
            <input-text rules="required" placeholder="Фамилия" name="Фамилия" v-model="applicationPayload.applicant.first_name"/>
            <input-text rules="required" placeholder="Имя" name="Имя" v-model="applicationPayload.applicant.last_name"/>
            <input-text rules="required" placeholder="Отчество" name="Отчество" v-model="applicationPayload.applicant.patronymic_name"/>
            <input-text rules="required" placeholder="Телефон" name="Телефон" v-model="applicationPayload.applicant.username"/>
          </div>

          <InputTextarea
              rules="required"
              placeholder="Описание заявки"
              name="Описание заявки"
              v-model="applicationPayload.description"
          />

          <div class="modal-create-action">
            <button type="submit">Создать</button>
          </div>

        </form>
      </ValidationObserver>
    </Modal>

  </div>
</template>
<script>
import InputText from "@/components/input/text.vue";
import InputTextarea from "@/components/input/textarea.vue";
import InputSelect from "@/components/input/select.vue";
import Pagination from "@/components/input/pagination.vue";
import DataTable from "@/components/basic/dataTable.vue";
import Modal from "@/components/basic/modal.vue";

export default {
  components: {Pagination, InputSelect, InputText, InputTextarea, DataTable, Modal},
  data() {
    return {
      modalState: false,

      loading: true,

      search: null,
      premise_id: null,
      pageSize: "10",
      page: 1,

      applicationPayload: {
        premise_id: null,
        apartment_id: null,
        applicant: {
          first_name: null,
          last_name: null,
          patronymic_name: null,
          username: null,
        },
        description: null,
        due_date: null,
        status_id: 0
      },

      apartmentItems: [],

      items: null,
      columns: [
        { name: "№", value: "number" },
        { name: "Создана", value: "number" },
        { name: "Адрес", value: "number" },
        { name: "Заявитель", value: "number" },
        { name: "Описание", value: "number" },
        { name: "Срок", value: "number" },
        { name: "Статус", value: "number" },
      ]
    }
  },
  methods: {
    async fetchApplications() {
      this.loading=true
      await this.axios.get("https://dev.moydomonline.ru/api/appeals/v1.0/appeals/", {
        params:{
          search: this.search,
          premise_id: this.premise_id,
          page: this.page,
          page_size: this.pageSize,
        },
        headers: {
          Authorization: `Basic ${this.$store.getters.getUser.token}`
        }
      }).then(async (response) => {
        if (response.data.hasOwnProperty('results')) {
          this.items=response.data
        }
      }).catch(async (error) => {
        if (error) {
          console.log(error)
        }
      })
      this.loading=false
    },
    async fetchUserPremises() {
      await this.axios.get("https://dev.moydomonline.ru/api/geo/v2.0/user-premises/", {
        headers: {
          Authorization: `Basic ${this.$store.getters.getUser.token}`
        }
      }).then(async (response) => {
        this.userPremises=response.data.results
      }).catch(async (error) => {
        if (error) {
          console.log(error)
        }
      })
    },
    async fetchUserPremisesApartments() {
      await this.axios.get("https://dev.moydomonline.ru/api/geo/v1.0/apartments/?page_size=99999", {
        headers: {
          Authorization: `Basic ${this.$store.getters.getUser.token}`
        },
        params: {
          premise_id: this.applicationPayload.premise_id
        }
      }).then(async (response) => {
        this.apartmentItems=response.data.results
      }).catch(async (error) => {
        if (error) {
          console.log(error)
        }
      })
    },
    async createApplication() {
      this.applicationPayload.due_date=this.dateFormat(this.applicationPayload.due_date)+" 00:00"

      await this.axios.post("https://dev.moydomonline.ru/api/appeals/v1.0/appeals/", {
        ...this.applicationPayload
      },{
        headers: {
          Authorization: `Basic ${this.$store.getters.getUser.token}`
        },
      }).then(async (response) => {
        this.modalState=false

        if (this.applicationPayload.hasOwnProperty('number')) {
          await this.$store.dispatch("updateSnackbar", ["Заявка изменена", "success"])
        }else {
          await this.$store.dispatch("updateSnackbar", ["Заявка создана", "success"])
        }

        this.page=1
        await this.fetchApplications()
      }).catch(async (error) => {
        if (error) {
          console.log(error)
          await this.$store.dispatch("updateSnackbar", ["Не удалось создать заявку", "error"])
        }
      })
    },
    async editApplication(item) {
      this.applicationPayload=Object.assign({}, {
        number: item.number,
        created_at: item.created_at,
        premise_id: item.premise.id,
        apartment_id: item.apartment.id,
        applicant: item.applicant,
        description: item.description,
        due_date: this.dateFormat(item.due_date),
        status_id: item.status.id
      })
      this.modalState=true
    },
    dateToString(dateString) {
      const date = new Date(dateString);
      let mm = date.getMonth() + 1;
      let dd = date.getDate();

      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      return dd + '.' + mm + '.' + date.getFullYear();
    },
    dateFormat(dateString) {
      const date = new Date(dateString);
      let mm = date.getMonth() + 1;
      let dd = date.getDate();

      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      return date.getFullYear()+ '-' + mm + '-' + dd;
    }
  },
  computed: {
    userPremises: {
      get(){
        return this.$store.getters.getUserPremises
      },
      set(state){
        this.$store.dispatch("updateUserPremises",state)
      }
    },
  },
  watch: {
    search() {
      this.fetchApplications()
    },
    page() {
      this.fetchApplications()
    },
    pageSize() {
      this.fetchApplications()
    },
    premise_id() {
      this.fetchApplications()
    },
    'applicationPayload.premise_id'() {
      this.fetchUserPremisesApartments()
    },
  },
  async created() {
    await this.fetchUserPremises()
    await this.fetchApplications()
  },
}
</script>
<style scoped>

</style>