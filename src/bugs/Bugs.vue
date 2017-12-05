<template>
  <section class="content">
    <div class="buttons">
      <button class="ui button" @click="getBugs()">Все</button>
      <button class="ui button" @click="getBugs('inactive')">В работе</button>
      <button class="ui button" @click="getBugs('active')">Исправленные</button>
    </div>
    <table class="ui table celled" v-if="bugs.length > 0">
      <thead>
      <tr>
        <th class="cursor-pointer" @click="filterByColumn('updated_at')">Дата</th>
        <th class="cursor-pointer"@click="filterByColumn('name')">Имя</th>
        <th>Сообщение</th>
        <th class="cursor-pointer" @click="smallImages = !smallImages">Изображение</th>
        <th class="center aligned">Статус</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(bug, index) in bugs" v-bind:class="{'bug-fixed' : bug.active}">
        <td>{{bug.updated_at}}</td>
        <td>{{bug.name}}</td>
        <td>{{bug.text}}</td>
        <td @click="smallImages">
          <img @click="toggleImage(bug)" class="bug-preview" v-bind:class="{'small-preview' : smallImages}"
               v-if="bug.image" :src="bug.image">
        </td>
        <td class="center aligned">
          <input type="checkbox" v-model="bug.active" @change="changeBugStatus(bug)">
        </td>
      </tr>
      </tbody>
    </table>
    <div class="imgbox" v-if="imgBox" @click="toggleImage">
      <img :src="selectedImage">
    </div>
  </section>
</template>

<script>
  import Axios from '@/axiosInstance'
  export default {
    created() {
      this.getBugs('inactive');
    },
    data() {
      return {
        bugs: [],
        smallImages: true,
        imgBox: false,
        columnsReverse: {
          processTime: false,
          updated_at: false
        }
      }
    },
    methods: {
      getBugs(type) {
        let that = this;
        let bugType = type ? type : '';
        Axios.get('ticket/' + bugType)
          .then(function (res) {
            that.bugs = res.data.data["0"].items
          })
          .catch(function (error) {
            that.$notify({
              group: 'app',
              type: 'error',
              title: 'Ошибка'
            })
          })
      },
      toggleImage(bug) {
        this.selectedImage = bug.image;
        this.imgBox = !this.imgBox;
      },
      toggleImageView() {
        this.smallImages = !this.smallImages;
      },
      filterByColumn(key) {
        let that = this;
        this.columnsReverse[key] = !this.columnsReverse[key];
        return this.bugs.sort(function (a, b) {
          return that.columnsReverse[key] ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key])
        })
      },
      changeBugStatus(bug) {
        let that = this;
        Axios.put('ticket/' + bug.id + '/active')
          .then(function (res) {
            that.$notify({
              group: 'app',
              type: 'success',
              title: 'Изменено'
            })
          })
          .catch(function (error) {
            that.$notify({
              group: 'app',
              type: 'error',
              title: 'Ошибка'
            })
          })
      }
    }


  }
</script>

<style scoped>
  .bug-preview {
    max-width: 350px;
  }

  .small-preview {
    width: 80px !important;
  }

  .cursor-pointer {
    cursor: pointer !important;
  }

  .imgbox {
    width: 100vw;
    height: 100vh;
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .imgbox img {
    max-width: 100%;
    max-height: 600px;
    margin: auto;
    display: block;
  }

  .bug-fixed {
    text-decoration: line-through;
    color: red;
    background: rgba(21, 21, 21, 0.5);
    transition: .3s ease all;
  }
</style>
