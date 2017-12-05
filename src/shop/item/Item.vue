<template>
  <tr>
    <td class="collapsing">
      <div class="ui fitted slider checkbox">
        <input type="checkbox" :disabled="!editMode"><label></label>
      </div>
    </td>
    <td>
      <img class="ui image small rounded margin-auto" :src="item.thumbnail">
    </td>
    <td>
      <div class="ui input fluid">
        <input type="text" v-model="item.name" :disabled="!editMode">
      </div>
    </td>
    <td>
      <div class="ui input fluid">
        <input type="number" v-model="item.price" :disabled="!editMode">
      </div>
    </td>

    <td>
      <select class="ui fluid dropdown" :disabled="!editMode" v-model="item.currency">
        <option value="">Coins</option>
        <option value="">Gold</option>
        <option value="" selected>{{item.currency}}</option>
      </select>
    </td>
    <td>
      <select class="ui fluid dropdown" :disabled="!editMode" v-model="item.effect_type">
        <option value="">Coins</option>
        <option value="">Gold</option>
        <option value="" selected> {{item.effect_type}}</option>
      </select>
    </td>
    <td>
      <div class="ui input fluid">
        <input type="number" v-model="item.amount" :disabled="!editMode">
      </div>
    </td>
    <td class="text-center">
      <div class="ui vertical buttons">
        <button class="ui icon button teal" v-if="editMode" @click="save">
          <i class="save icon"></i>
        </button>
        <button class="ui icon button" @click="edit">
          <i class="edit icon"></i>
        </button>
        <button class="ui icon button">
          <i class="remove icon"></i>
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
  export default {
    data: function () {
      return {
        item: this.$attrs['item'],
        editMode: false
      }
    },
    methods: {
      edit: function () {
        this.editMode = true;
      },
      save: function () {
        this.editMode = false;
        this.$attrs.save(this.item);
      }
    }
  }
</script>
