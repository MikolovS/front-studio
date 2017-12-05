<template>
  <section class="statistics">
    <table class="ui table celled stripped" v-if="tracker">
      <thead>
      <tr>
        <th>Total<br>users</th>
        <th>Tracked<br>users</th>
        <th>Tracked<br>percent, %</th>
        <th>Save</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{{tracker.total_users}}</td>
        <td>{{tracker.tracked_users}}</td>
        <td>
          <div class="ui input">
              <input type="number" v-model="tracker.track_percent" max="0" min="100">
          </div>
        </td>
        <td>
          <button class="ui button teal icon" @click="save(tracker)">
            <i class="icon save"></i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
    import Axios from '@/axiosInstance';
    import {userConstants} from '@/constants';

    export default {
        data() {
            return {
                tracker: null
            }
        },
        created() {
            let that = this;
            that.getData();
        },
        methods: {
            getData() {
                let that = this;
                Axios.get(userConstants.tracker)
                    .then(function (res) {
                        that.tracker = res.data.data.items[0];
                    })
                    .catch(function (error) {
                        that.$notify({
                            type: 'error',
                            title: 'Ошибка при получении глобальных настроек'
                        })
                    })
            },
            save(tracker) {
                let that = this;
                Axios.post(userConstants.tracker, tracker)
                    .then(function (res) {
                        that.tracker = res.data.data.items[0];
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
