<template>
  <section class="userModal">
    <table class="ui table celled stripped" v-if="this.user">
    <thead>
    <tr>
      <th>Top1<br>level results</th>
      <th>Top1<br>city results</th>
      <th>Steps</th>
      <th>Stars</th>
      <th>Sum<br>cities</th>
      <th>Daily<br>bonus</th>
      <th>Daily<br>quest bonus</th>
      <th>Car</th>
      <th>Tutorial</th>
      <th>Tutorial<br>steps</th>
      <th>Delete<br>all game-sessions</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>{{user.first_in_levels}}</td>
      <td>{{user.first_in_cities}}</td>
      <td>{{user.total_progress.sum_steps}}</td>
      <td>{{user.total_progress.sum_stars}}</td>
      <td>{{user.total_progress.sum_city}}</td>
      <td>
          <button class="ui button icon inverted disabled"
                  v-bind:class="[user.daily_bonus ? 'true' : 'false']">
              <i class="icon bitcoin"></i>
          </button>
      </td>
      <td>
          <button class="ui button icon inverted disabled"
                  v-bind:class="[user.first_quest_bonus ? 'true' : 'false']">
              <i class="icon quora"></i>
          </button>
      </td>
      <td>
        <button class="ui button icon inverted teal"
                v-bind:class="[carExist ? 'true' : 'false', editCar ? '' : 'disabled']"
                @click="switchCar()"
        >
          <i class="icon car"></i>
        </button>
      </td>
      <td>
        <button class="ui button icon inverted teal"
                v-bind:class="[user.tutorial ? 'true' : 'false']"
                @click="switchTutorial()"
        >
          <i class="flag checkered icon"></i>
        </button>
      </td>
        <td>
            <div class="ui input fluid">
                <input type="number" v-model="user.tutorial_steps" max="6" min="0">
                <button class="ui button mini teal icon" @click="saveSteps(user)">
                    <i class="icon save"></i>
                </button>
            </div>
        </td>
        <td>
            <button class="ui button icon inverted teal"
                    @click="deleteGameSessions()"
            >
                DELETE <i class="icon remove user"></i>
            </button>
        </td>
    </tr>
    </tbody>
    </table>

    <table v-if="gameSessions" class="ui table celled striped">
      <thead>
      <tr>
        <th class="cursor-pointer" @click="orderByCol('display')">Level<br>Name</th>
        <th class="cursor-pointer" @click="orderByCol('complexity')">Level<br>difficulty</th>
        <th class="cursor-pointer" @click="orderByCol('type')">Level<br>type</th>
        <th class="cursor-pointer" @click="orderByCol('steps')">Steps</th>
        <th class="cursor-pointer" @click="orderByCol('stars')">Stars</th>
        <th class="cursor-pointer" @click="orderByCol('win')">Status</th>
        <th class="cursor-pointer" @click="orderByCol('start_time')">Start time</th>
        <th>Total<br>time</th>
        <th>Delete<br>session</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="gameSession in gameSessions">
        <td>{{gameSession.display}}</td>
        <td>{{gameSession.complexity}}</td>
        <td>{{gameSession.type}}</td>
        <td>{{gameSession.steps}}</td>
        <td>{{gameSession.stars}}</td>
        <td>
            <button class="ui button icon inverted teal disabled" v-bind:class="[gameSession.win ? 'true' : 'false']">
                <i class="flag checkered icon"></i>
            </button>
        </td>
        <td>{{gameSession.start_time}}</td>
        <td>{{gameSession.total_time}}</td>
        <td>
            <button class="ui button icon inverted teal" @click="deleteOneSessions(gameSession.game_id)">
                 <i class="icon delete"></i>
            </button>
        </td>
      </tr>
      </tbody>
    </table>
      <div class="text-center footer">
          <button class="ui button icon basic inverted teal"
                  v-bind:class="[offset === 0 ? 'disabled' : '']"
                  @click="offset -=8; getGameSessions()"
          >
              <i class="icon caret left"></i>
          </button>
          <button class="ui button icon basic inverted teal"
                  v-bind:class="[gameSessionsCount < limit ? 'disabled' : '']"
                  @click="offset +=8; getGameSessions()">
              <i class="icon caret right"></i>
          </button>
      </div>
  </section>
</template>

<script>
    import Axios from '@/axiosInstance';
    import {userConstants, gameSession} from '@/constants';

    export default {
        props: ["userId", 'refresh1'],
        data() {
            return {
                name: 'modalUser',
                dailyBonus: false,
                limit: 8,
                offset: 0,
                orderColumn: null,
                orderBy: 'start_time',
                orderDirection: 'DESC',
                user: {
                    tutorial: null,
                    tutorial_steps: null,
                    car: null,
                    total_progress:{
                        sum_steps:0,
                        sum_stars:0,
                        sum_city:0,
                    },
                },
                gameSessions: [],
            }
        },
        created() {
            this.getData();
            this.getGameSessions();
        },
        computed: {
            editCar: function () {
                return this.user.tutorial
            },
            carExist: function () {
                if (!this.user.tutorial) {
                    this.user.car = false;
                }
                return this.user.car;
            },
            gameSessionsCount: function () {
                return this.gameSessions.length
            }
        },
        methods: {
            getData() {
                let that = this;
                Axios.get(userConstants.config + that.userId).then(function (res) {
                    that.user = res.data.data.items;
                })
            },
            getGameSessions() {
                let that = this;
                let params = {
                    limit: this.limit,
                    offset: this.offset,
                    order_by: this.orderBy,
                    direction: this.orderDirection,
                };
                Axios.get(gameSession.session + that.userId , {
                    params: params
                }).then(function (res) {
                    that.gameSessions = res.data.data.items;
                })
            },
            switchCar() {
                let that = this;
                Axios.post(userConstants.config + that.userId + '/car')
                    .then(function (res) {
                        that.$notify({
                            type: 'success',
                            title: 'Сохранено'
                        });
                        that.user.car = !that.user.car;
                    })
                    .catch(function (error) {
                        that.$notify({
                            type: 'error',
                            title: 'Ошибка'
                        })
                    })
            },
            swithDailyBonus() {
                let that = this;
                Axios.delete(userConstants.config + that.userId + '/bonus/daily')
                    .then(function (res) {
                        that.$notify({
                            type: 'success',
                            title: 'Сохранено'
                        });
                        that.dailyBonus = !that.dailyBonus;
                    })
                    .catch(function (error) {
                        that.$notify({
                            type: 'error',
                            title: 'Ошибка'
                        })
                    })
            },
            switchTutorial() {
                let that = this;
                Axios.post(userConstants.config + that.userId + '/tutorial')
                    .then(function (res) {
                        that.$notify({
                            type: 'success',
                            title: 'Сохранено'
                        });

                        let userData = res.data.data.items;
                        that.user.tutorial_steps = userData.tutorial_steps;
                        that.user.tutorial = userData.tutorial;
                        that.refresh1();

                    })
                    .catch(function (error) {
                        that.$notify({
                            type: 'error',
                            title: 'Ошибка'
                        })
                    })
            },
            saveSteps(user) {
                let that = this;
                Axios.put(userConstants.config + that.userId + '/tutorial', {
                    tutorial_steps: user.tutorial_steps
                })
                    .then(function (res) {
                        that.$notify({
                            type: 'success',
                            title: 'Сохранено'
                        });
                        let userData = res.data.data.items;
                        that.user.tutorial_steps = userData.tutorial_steps;
                        that.user.tutorial = userData.tutorial;

                    })
                    .catch(function (error) {
                        that.$notify({
                            type: 'error',
                            title: 'Ошибка'
                        })
                    })
            },
            deleteGameSessions() {
                let that = this;
                if (confirm('Удалить все геймсессии пользователя?')) {
                Axios.delete(gameSession.session + that.userId)
                    .then(function (res) {
                        that.$notify({
                            type: 'success',
                            title: 'Сохранено'
                        });
                        this.getData();
                    })
                    .catch(function (error) {
                        that.$notify({
                            type: 'error',
                            title: 'Ошибка'
                        })
                    })
                }
            },
            deleteOneSessions(id) {
                let that = this;
                if (confirm('Удалить геймсессию пользователя?')) {
                    Axios.delete(gameSession.one + id)
                        .then(function (res) {
                            that.$notify({
                                type: 'success',
                                title: 'Удалено'
                            });
                            that.getGameSessions();
                        })
                        .catch(function (error) {
                            that.$notify({
                                type: 'error',
                                title: 'Ошибка'
                            })
                        });
                }
            },
            orderByCol(column) {
                if (this.orderDirection === 'DESC') {
                    this.orderDirection = 'ASC';
                } else {
                    this.orderDirection = 'DESC'
                }
                this.orderBy = column;
                this.getGameSessions();
            },
        }
    }
</script>

<style lang="sass" scoped>
    .cursor-pointer
        cursor: pointer !important

    .true
        background-color: green !important

    .false
        background-color: red !important

    .userModal
        position: relative

</style>
