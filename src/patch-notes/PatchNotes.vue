<template>
  <section class="statistics">
      <div class="ui grid">
        <div class="three column row">
            <div class="column">
                <div class="ui action input left">
                    <input v-model="searchValue" type="text" placeholder="Search by version...">
                    <div type="submit" class="ui button" @click="getData()">Search</div>
                </div>
              <button class="ui button icon basic inverted teal"
                      @click="reset()"
              >Reset Search
                  <i class="icon refresh"></i>
              </button>
            </div>
          <div class="column text-center">
              <button class="ui button icon basic inverted teal"
                      v-bind:class="[offset === 0 ? 'disabled' : '']"
                      @click="offset -=5; getData()"
              >
                  <i class="icon caret left"></i>
              </button>
              <--Pagination-->
              <button class="ui button icon basic inverted teal"
                      v-bind:class="[patchCount < limit ? 'disabled' : '']"
                      @click="offset +=5; getData()"
              >
                  <i class="icon caret right"></i>
              </button>
          </div>
            <div class="column">
            </div>
        </div>
      </div>
    <table class="ui table celled striped">
      <thead>
      <tr>
        <th class="cursor-pointer two wide" @click="orderByCol('version')">Version</th>
        <th>Patch<br>name</th>
        <th class="cursor-pointer two wide" @click="orderByCol('created_at')">Created at</th>
        <th class="eight wide">Notes</th>
        <th class="right aligned">Save</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(patch, index) in patches" class="ui form">
        <td class="top aligned">
            <div class="ui input fluid required">
                <input type="text" v-model="patch.version" placeholder="set patch version" required>
                <input type="hidden" v-model="patch.old_version">
            </div>
        </td>
          <td class="top aligned">
              <div class="ui input fluid">
                  <input type="text" v-model="patch.name" placeholder="set patch name">
              </div>
          </td>
          <td class="ui fluid top aligned">{{patch.created_at}}</td>
        <td>
            <ol class="ui list ordered">
                <li class="item" v-for="(note, index) in patch.notes">
                    <div class="ui form" style="display: flex">
                        <textarea placeholder="just write text..." rows="2" v-model="patch.notes[index]" class="field" required></textarea>
                        <button class="ui red button mini icon" @click="deleteRow(patch.notes, index)" style="height: 30px">X</button>
                    </div>
                </li>
            </ol>
            <button class="ui button teal icon" @click="addRow(patch.notes)">Add note
                <i class="add square icon"></i>
            </button>
        </td>
        <td class="right aligned one wide">
            <button class="ui button teal icon submit" @click="savePatch(patch)" type="submit">
                <i class="icon save"></i>
            </button>
            <p> </p>
            <p> </p>
            <button class="ui red button icon" @click="deletePatch(patch, index)">
                <i class="icon trash"></i>
            </button>
        </td>
      </tr>
      </tbody>
    </table>
      <div class="ui grid">
          <div class="three column row">
              <div class="column">
              </div>
              <div class="column text-center">
                  <button class="ui button icon basic inverted teal"
                          v-bind:class="[offset === 0 ? 'disabled' : '']"
                          @click="offset -=5; getData()"
                  >
                      <i class="icon caret left"></i>
                  </button>
                  --Pagination--
                  <button class="ui button icon basic inverted teal"
                          v-bind:class="[patchCount < limit ? 'disabled' : '']"
                          @click="offset +=5; getData()"
                  >
                      <i class="icon caret right"></i>
                  </button>
              </div>
              <div class="column">
                  <button class="ui button teal icon right floated" @click="addPatch()">Add Patch
                      <i class="add square icon"></i>
                  </button>
              </div>
          </div>
      </div>
  </section>
</template>

<script>
    import Axios from '@/axiosInstance';
    import {patchNoteConstants} from '@/constants';

    export default {
        data() {
            return {
                patches: null,
                newPatch: null,
                limit: 5,
                offset: 0,
                orderColumn: null,
                orderBy: 'version',
                searchValue: null,
                orderDirection: 'ASC',
                patchCount: 0
            }
        },
        created() {
            let that = this;
            that.getData();
        },
        methods: {
            addRow(notes) {
                notes.push('');
            },
            addPatch() {
                if (this.newPatch === null) {
                    this.patches.push({
                        version: null,
                        name: null,
                        notes: [''],
                        is_new: true
                    });
                    this.newPatch = this.patches.length - 1;
                } else {
                    this.$notify({
                        type: 'error',
                        title: 'Сохраните новый патч!'
                    })
                }
            },
            deleteRow(notes, index) {
                notes.splice(index, 1)
            },
            getData() {
                let that = this;
                let params = {
                    limit: this.limit,
                    offset: this.offset,
                    order_by: this.orderBy,
                    direction: this.orderDirection,
                };
                if (this.searchValue !== null) {
                    params.version = this.searchValue;
                }
                Axios.get(patchNoteConstants.patchNote, {
                    params: params
                })
                    .then(function (res) {
                        let patches = res.data.data.items;
                        that.patchCount = patches.length;
                        that.patches = patches;
                        for (let i = 0, l = that.patches.length; i < l; i++) {
                            that.patches[i]['old_version'] = that.patches[i]['version']
                        }
                    })
                    .catch(function (error) {
                        that.$notify({
                            type: 'error',
                            title: 'Ошибка при получении глобальных настроек'
                        })
                    })
            },
            saveNewPatch(patch){
                let that = this;
                Axios.post(patchNoteConstants.patchNote, patch)
                    .then(function (res) {
                        that.$notify({
                            type: 'success',
                            title: 'Сохранено'
                        })
                    })
                    .catch(function (error) {
                        that.$notify({
                            type: 'error',
                            title: 'Ошибка'
                        })
                    })
            },
            updatePatch(patch) {
                let that = this;
                Axios.put(patchNoteConstants.patchNote + patch.old_version, patch)
                    .then(function (res) {
                        that.$notify({
                            type: 'success',
                            title: 'Сохранено'
                        })
                    })
                    .catch(function (error) {
                        that.$notify({
                            type: 'error',
                            title: 'Ошибка'
                        })
                    })
            },
            savePatch(patch) {
                if (patch.is_new) {
                    this.saveNewPatch(patch)
                } else {
                    this.updatePatch(patch)
                }
            },
            deleteNewPatch(index) {
                this.patches.splice(index, 1);
                this.newPatch = false;
            },
            deleteExistPatch(patch) {
                let that = this;
                if (confirm('Удалить патч version: ' + patch.old_version + ' ?')) {
                    Axios.delete(patchNoteConstants.patchNote + patch.old_version)
                        .then(function (res) {
                            that.$notify({
                                type: 'success',
                                title: 'Удалено'
                            });
                            that.getData();
                        })
                        .catch(function (error) {
                            that.$notify({
                                type: 'error',
                                title: 'Ошибка'
                            })
                        })
                }
            },
            deletePatch(patch, index) {
                if (this.newPatch === index) {
                    this.deleteNewPatch(index)
                } else {
                    this.deleteExistPatch(patch)
                }
            },
            orderByCol(column) {
                if (this.orderDirection === 'DESC') {
                    this.orderDirection = 'ASC';
                } else {
                    this.orderDirection = 'DESC'
                }
                this.orderBy = column;
                this.getData();
            },
            reset() {
                this.patches = null;
                this.limit = 5;
                this.offset = 0;
                this.orderColumn = null;
                this.orderBy = 'created_at';
                this.orderDirection = 'ASC';
                this.searchValue = null;
                this.patchCount = 0;
                this.getData();
            }

        }
    }
</script>

<style lang="sass" scoped>
    .cursor-pointer
        cursor: pointer !important

    .true
        background-color: green

    .false
        background-color: red

    .true, .false
        height: 20px
        width: 20px
        text-align: center
        font-size: larger
</style>
