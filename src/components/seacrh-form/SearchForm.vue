<template>
  <div class="ui category search">
    <div class="ui icon input">
      <input class="prompt" type="text" placeholder="Введите запрос" @input="updateValue($event.target.value)">
      <i class="search icon"></i>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      updateValue: function (value) {
        this.$emit('input', value)
      }
    }
  }
</script>
