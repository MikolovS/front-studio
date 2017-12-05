<template>
  <section class="content" id="users">
    <search-form v-model="searchQuery"></search-form>
    <table class="ui table celled stripped">
      <thead>
        <tr>
          <th>Аватар</th>
          <th>Ник</th>
          <th>
            <i class="icon settings"></i>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in filter(users, ['name'])">
          <td>
            <img class="ui image small" :src="user.img">
          </td>
          <td>
            <div class="ui input">
              <input type="text" :value="user.name" :disabled="index !== editableItem">
            </div>
          </td>
          <td>
            <div class="ui vertical buttons">
              <button class="ui icon button teal" v-if="index === editableItem" @click="save(index)">
                <i class="save icon"></i>
              </button>
              <button class="ui icon button" @click="edit(index)">
                <i class="edit icon"></i>
              </button>
              <button class="ui icon button">
                <i class="remove icon"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
  import SearchForm from '@/components/seacrh-form/SearchForm';
  import searchFilter from '@/services/search.filter';
  export default {
    name: 'users',
    data: function() {
        return {
            searchQuery: '',
            editableItem: null,
            users: [
              {id: 0, name: 'Max', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdo0TfkE_nuZi9rJu4x3WnKFtZuAfLtRN2gmmWx1-tvxk0lrTsxw'},
              {id: 1, name: 'Anny', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdo0TfkE_nuZi9rJu4x3WnKFtZuAfLtRN2gmmWx1-tvxk0lrTsxw'}
            ]
        }
    },
    methods: {
      edit: function (index) {
        this.editableItem = index;
        this.editMode = true;
      },
      save: function (index) {
        this.editableItem = null;
        this.editMode = false
      },
      filter: function(array, keys){
        return searchFilter(array, keys, this.searchQuery)
      }
    },
    components: {
      searchForm: SearchForm
    }
  }
</script>
