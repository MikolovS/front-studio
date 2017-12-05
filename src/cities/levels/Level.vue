<template>
  <div class="level-item" v-if="item">
    <header>
      <h3>
        <span># {{index}} - </span>
        <div class="ui input">
          <input type="text" v-model="item.display">
        </div>
      </h3>
      <div class="ui small basic icon buttons">
        <button class="ui button icon" @click="saveLevel">
          <i class="ui icon save"></i>
        </button>
        <button @click="deleteLevel" key="remove" class="ui button"><i class="remove icon"></i></button>
      </div>
    </header>
    <div class="level">
      <div class="flex-row">
        <div class="level-thumbnail">
          <div class="level-thumbnail-img" :style="{ background: 'url(' + item.images[1].url + ')'}" @click="toggleImage(item.images[1].url)">
          </div>
          <input type="file" @change="loadNewImage($event)" required>
          <button class="ui button teal mini icon upload-button">
            <i class="icon upload"></i>
          </button>
            <input type="text" v-model="item.images[1].author" :title="item.images[1].author">
        </div>
        <div class="level-data">
          <div class="flex-row">
            <div>
              <p>Описание</p>
              <textarea rows="4" v-model="item.description"></textarea>
            </div>
            <div>
              <p>Тип</p>
              <select v-model="item.type">
                <option v-for="type in this.$attrs.types" :value="type">{{type}}</option>
              </select>
            </div>
            <div>
              <p>Сложность</p>
              <select v-model="item.complexity">
                <option v-for="complexity in this.$attrs.complexities" :value="complexity">{{complexity}}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <facts
        :items="item.facts"
        :level="item.name"
        :save="saveFacts"
        :addFact="addFact">
      </facts>
    </div>
    <div class="imgbox" v-if="imgBox" @click="toggleImage">
      <img :src="selectedImage">
    </div>
    <section v-if="loading" class="loader"></section>
  </div>
</template>

<script>
  import axios from 'axios';
  import Axios from '@/axiosInstance';
  import Facts from '@/cities/levels/Facts';
  import {levelConstants} from '@/constants';

  export default {
    created: function () {
      this.item.changed_image = false
      if(this.item.images.length == 0) {
        this.item.images = [null, {url: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg', autor: 'none'}];
      }
    },
    components: {
      facts: Facts
    },
    data: function () {
      return {
        item: this.$attrs['level-data'],
        index: this.$attrs['level-index'],
        image: null,
        loading: false,
        imgBox: false
      }
    },
    methods: {

      toggleImage(img) {
        this.selectedImage = img;
        this.imgBox = !this.imgBox;
      },
      saveLevel() {
        this.loading = true;
        var that = this;
        axios.all([
          that.saveLevelInfo(this.item.name)],
          that.saveFacts(this.item.name, this.item.facts)
        )
        .then(axios.spread(function (level, facts) {
            that.loading = false;
            that.$notify({
              type: 'success',
              title: 'Уровень сохранен'
            })
        }))
        .catch(function (error) {
          that.loading = false;
          that.$notify({
            type: 'error',
            title: 'Ошибка - ' + error.message
          })
        });
      },
      saveLevelInfo(level) {
        let newLevelData = Object.assign({}, this.item);
        newLevelData.author = this.item.images[1].author;
        for (let i = 0, l = newLevelData.facts.length; i < l; i++) {
          newLevelData.facts[i].order = i
        }
        delete newLevelData.image;
        if (newLevelData.imageFile) {
          newLevelData.image = newLevelData.imageFile;
          delete newLevelData.imageFile;
        }
        newLevelData.name = newLevelData.display;
        delete level.display;
        let form = new FormData();
        for (let key in newLevelData) {
          form.append(key, newLevelData[key]);
        }
        return Axios.post(levelConstants.level + level + '/update', form)
      },
      saveFacts(level, facts) {
        if(facts.length === 0){
          for (let i = 0, l = facts.length; i < l; i++) {
            facts[i].order = i;
          }
          return false;
        } else {
          return Axios.put(levelConstants.facts + level, {facts: facts})
        }
      },
      addFact(fact) {
        let that = this;
        Axios.post(levelConstants.facts + this.item.name, fact)
          .then(function (res) {
            that.item.facts.push(res.data.data["0"].items["0"]);
            that.$notify({
              type: 'success',
              title: 'Факт добавлен'
            })
          })
          .catch(function (error) {
            that.$notify({
              type: 'error',
              title: 'Ошибка'
            })
          })
      },
      loadNewImage: function (e) {
        let that = this;
        this.item.imageFile = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = function () {
          that.item.images[1].url = reader.result;
        };
        reader.readAsDataURL(this.item.imageFile);
      },
      deleteLevel: function () {
        this.$attrs.delete(this.index, this.item)
      }
    }
  }
</script>

<style lang="sass" scoped>
  .upload-button
    position: absolute
    top: 0
    left: 0
    z-index: 1
    cursor: pointer
  .w-200
    width: 200px
  .imgbox
    width: 100vw
    height: 100vh
    position: fixed
    z-index: 100
    display: flex
    top: 0
    left: 0
    background: rgba(0, 0, 0, 0.5)
    img
      max-width: 800px
      max-height: 450px
      margin: auto
      display: block
  .flex-row
    display: flex
    flex-flow: row nowrap
  .level-item
    margin: 15px 0
  .level
    /*display: flex*/
    /*flex-flow: row nowrap*/
    padding: 20px
    background: rgba(255, 255, 255, 0.15)
    .img-link
      margin-top: 4px
      i
        margin: 0
    .level-data
      width: 100%
      overflow: auto
      .flex-row
        background: #2e3338
        border-radius: .28571429rem
        div
          text-align: center
          padding-bottom: 10px
        p
          font-weight: bold
          padding: 10px
          box-sizing: border-box
          background: #1c1e22
          text-align: left
        select, textarea
          width: calc(100% - 20px)
        div:first-child
          flex-grow: 1
      .edit-fact
        border-radius: 5px 0 0 5px !important
        margin: 0 !important
    &-thumbnail
      width: 200px
      margin-right: 15px
      padding: 0px
      box-sizing: border-box
      flex-shrink: 0
      position: relative
      text-align: center
      input[type="text"]
        width: 100%
        font-size: 12px
        border: none
      input[type="file"]
        position: absolute
        top: 0px
        left: 0px
        width: 100%
        height: 20px
        cursor: pointer
        border-radius: 5px !important
        z-index: 2
        opacity: 0
      &-img
        width: 200px
        height: 200px
        background-size: cover !important
        background-position: 50% 50% !important
  header
    display: flex
    flex-flow: row nowrap
    justify-content: space-between
    align-items: center
    padding-bottom: 10px
    h3
      margin: auto 0 !important
    button
      padding: .78571429em 1.5em .78571429em !important
  @media screen and (max-width: 769px)
    .level-item
      margin: 15px 0
      .level
        display: flex
        flex-flow: column wrap
        padding: 10px
        background: rgba(255, 255, 255, 0.15)
        .level-data
          textarea, select
            width: 100%
        &-thumbnail
          width: 100%
          &-img
            width: 100%
            max-width: 200px
            margin: 0 auto
</style>
