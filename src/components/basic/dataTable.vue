<template>
  <div class="container">
    <div v-if="loading" class="container-loading">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-dasharray="15" stroke-dashoffset="15" stroke-linecap="round" stroke-width="2" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>
    </div>
    <table class="table">
      <thead>
      <tr>
        <th v-for="column in columns">
          <p @click.prevent=sortBy(column.value) :class="{ active : isActive(column.value) }">
            {{ column.name | capitalize }}
          </p>
        </th>
      </tr>
      </thead>
      <tbody>
      <slot :items="orderedUsers"/>
      </tbody>
    </table>
  </div>
</template>
<script>
  import lodash from "lodash";

  export default {
    props: {
      columns: Array,
      items: Array,
      loading: Boolean
    },
    data() {
      return {
        sortKey: "",
        reverse: false,
      }
    },
    methods: {
      sortBy: function(sortKey){
        this.reverse = (this.sortKey === sortKey) ? ! this.reverse : false;
        this.sortKey = sortKey;
      },
      isActive: function(column){
        return this.sortKey === column;
      }
    },
    computed: {
      orderedUsers: function(){
        return lodash.orderBy(this.items, this.sortKey, this.reverse ? "asc" : "desc");
      }
    },
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    },
  }
</script>
<style lang="scss">

.container {
  width: 100%;
  min-height: 624px;
  position: relative;

  &-loading{
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(3px);
  }

}

table {
  width: 100%;
  border-collapse: collapse;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;

  th {
    border-bottom: 1px solid #ddd;
    color: #50B053;
    cursor: pointer;
    height: 44px;
  }

  td {
    border-bottom: 1px solid #ddd;
    height: 58px;
  }

  th, td {
    padding: 8px;
  }

  th input {
    text-align: left;
    diplay: inline;
  }

  .active {
    color: #50B053;
  }}
</style>