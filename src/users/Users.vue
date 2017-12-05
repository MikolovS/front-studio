<template>
  <section class="statistics">
      <div>
          <form class="ui action input left">
          <div class="ui action input left">
              <input v-model="searchValue" type="text" placeholder="Search by name..." min="3">
              <div type="submit" class="ui button" @click="getData()">Search</div>
          </div>
          </form>
          <button class="ui button icon basic inverted teal"
                  @click="reset()"
          >Reset Search
              <i class="icon refresh"></i>
          </button>
          <div class="center" style="display: inline">
              Pagination :
              <button class="ui button icon basic inverted teal"
                      v-bind:class="[offset === 0 ? 'disabled' : '']"
                      @click="paginate(-25)"
              >
                  <i class="icon caret left"></i>
              </button>
              <button class="ui button icon basic inverted teal"
                      v-bind:class="[usersCount < limit ? 'disabled' : '']"
                      @click="paginate(25)"
              >
                  <i class="icon caret right"></i>
              </button>
          </div>
          <div>
              <p style="display: inline">
                  Всего юзеров : {{totalUsers}}
              </p>
          </div>
      </div>
    <table class="ui table celled striped">
      <thead>
      <tr>
        <th class="cursor-pointer" @click="orderByCol('nickname')">Nickname</th>
        <th class="cursor-pointer" @click="orderByCol('avatar')">Avatar</th>
        <th class="cursor-pointer" @click="orderByCol('registred_at')">Registered at</th>
        <th class="cursor-pointer" @click="orderByCol('visit_days')">Visit days</th>
        <th class="cursor-pointer" @click="orderByCol('city_name')">City name</th>
        <th class="cursor-pointer" @click="orderByCol('facebook_id')">Facebook</th>
        <th class="cursor-pointer" @click="orderByCol('tutorial_steps')">Tutorial<br>steps</th>
        <th class="cursor-pointer" @click="orderByCol('levels_played')">Levels<br>played</th>
        <th class="cursor-pointer" @click="orderByCol('levels_won')">Levels<br>won</th>
        <th class="cursor-pointer" @click="orderByCol('total_purchase')">Total<br>purchase</th>
        <th class="cursor-pointer" @click="orderByCol('real_purchase')">Real<br>purchase</th>
        <th>Save</th>
        <th>Edit</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users">
        <td>
          <div class="ui input">
            <input type="text" v-model="user.name">
          </div>
        </td>
        <td>
          <div v-bind:class="[user.avatar_default ? 'false' : 'true']">
            <a :href=user.avatar target="_blank">
                <i class="id badge icon"></i>
            </a>
          </div>
        </td>
        <td>{{user.registred_at}}</td>
        <td>{{user.visit_days}}</td>
        <td>
            <div class="ui input">
                <input type="text" v-model="user.city_name">
            </div>
        <td>
          <a v-if="user.facebook_id" class="ui button teal icon"
                  :href=user.facebook_id target="_blank"
          >
              <i class="facebook square icon"></i>
          </a>
        </td>
        <td>{{user.tutorial_steps}}</td>
        <td>{{user.levels_played}}</td>
        <td>{{user.levels_won}}</td>
        <td>{{user.total_purchase}}</td>
        <td>{{user.real_purchase}}</td>
        <td>
          <button class="ui button teal icon" @click="saveUserConfig(user)">
            <i class="icon save"></i>
          </button>
        </td>
          <td>
              <button class="ui button teal icon" @click="showUserData(user.user_id)">
                  <i class="icon settings"></i>
              </button>
          </td>
      </tr>
      </tbody>
    </table>
    <div class="text-center">
      <button class="ui button icon basic inverted teal"
              v-bind:class="[offset === 0 ? 'disabled' : '']"
              @click="paginate(-25)"
      >
        <i class="icon caret left"></i>
      </button>
      <button class="ui button icon basic inverted teal"
              v-bind:class="[usersCount < limit ? 'disabled' : '']"
              @click="paginate(25)">
        <i class="icon caret right"></i>
      </button>
    </div>
      <div class="modal-wrapper" id="modal" v-if="userModal">
          <div class="modal">
              <button class="ui small icon button teal" id="close-modal" @click="userModal = !userModal">
                  <i class="window close icon"></i>
              </button>
              <modal-user :user-id="selectedUser" :refresh1="getData"></modal-user>
          </div>
      </div>
  </section>
</template>

<script>
    import Axios from '@/axiosInstance';
    import {userConstants} from '@/constants';
    import ModalUser from '@/users/ModalUser';

    export default {
        components: {
            ModalUser
        },
        data() {
            return {
                users: null,
                selectedUser: null,
                userModal: false,
                limit: 25,
                offset: 0,
                orderColumn: null,
                orderBy: 'user_id',
                orderDirection: 'ASC',
                usersCount: 0,
                totalUsers: 0,
                searchValue: null,
            }
        },
        created() {
            let that = this;
            that.getData();
        },
        methods: {
            getData() {
                let that = this;
                let params = {
                    limit: this.limit,
                    offset: this.offset,
                    order_by: this.orderBy,
                    direction: this.orderDirection,
                };
                if (that.searchValue !== null) {
                    params.user_name = that.searchValue;
                }
                Axios.get(userConstants.list, {
                    params: params
                })
                    .then(function (res) {
                        let users = res.data.data.items;
                        that.usersCount = users.length;
                        that.users = users;

//                        that.searchBy = that.searchValue = null;
                        that.totalUsers = res.data.data.users_count;
                    })
                    .catch(function (error) {
                        that.$notify({
                            type: 'error',
                            title: 'Ошибка при получении глобальных настроек'
                        })
                    })
            },
            saveUserConfig(user) {
                let that = this;

                Axios.put(userConstants.list, user)
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
            orderByCol(column) {
                if (this.orderDirection === 'DESC') {
                    this.orderDirection = 'ASC';
                } else {
                    this.orderDirection = 'DESC'
                }
                this.orderBy = column;
                this.getData();
            },
            showUserData(userId) {
                    this.selectedUser = userId;
                    this.userModal = true;
            },
            reset() {
                    this.users = null;
                    this.selectedUser = null;
                    this.userModal = false;
                    this.limit = 25;
                    this.offset = 0;
                    this.orderColumn = null;
                    this.orderBy = 'user_id';
                    this.orderDirection = 'ASC';
                    this.usersCount = 0;
                    this.searchValue = null;
                    this.getData();
            },
            paginate(offset) {
                this.offset +=offset;
                this.searchValue = null;
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

    .modal-wrapper
        position: fixed
        top: 0
        left: 0
        width: 100%
        height: 100vh
        display: flex
        background: rgba(0, 0, 0, 0.7)
    .modal
        width: 1400px
        height: 750px
        display: block
        margin: auto
        background: #2e3338
        position: relative
        border-radius: 5px
    #close-modal
        position: absolute
        top: 2px
        right: 2px
        z-index: 10
</style>
