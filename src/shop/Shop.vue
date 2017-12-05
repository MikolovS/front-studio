<template>
  <section class="content" id="store">
    <search-form v-model="searchQuery"></search-form>
    <addition-store-item></addition-store-item>
    <table class="ui celled striped table">
      <thead>
        <tr>
          <th>Вкл/Выкл</th>
          <th>Изображение</th>
          <th>Название</th>
          <th>Цена</th>
          <th>Валюта</th>
          <th>Тип эффекта</th>
          <th>Кол-е изменение эффекта</th>
          <th>
            <i class="icon settings"></i>
          </th>
        </tr>
      </thead>
      <tbody>
        <store-item
          v-for="(item, index) in filter(items, ['name', 'effect_type'])"
          :item="item"
          :index="index"
          :edit="editItem"
          :save="saveItem"
          :key="item.id">
        </store-item>
      </tbody>
    </table>
  </section>
</template>

<script>
  import SearchForm from '@/components/seacrh-form/SearchForm';
  import searchFilter from '@/services/search.filter';
  import AdditionStoreItem from '@/shop/item/AdditionItem';
  import StoreItem from '@/shop/item/Item';
  export default {
    data: function () {
      return {
        searchQuery: '',
        items: [
          {
            id: 0,
            thumbnail: 'http://stopgame.org.ua/wp-content/uploads/2016/02/statti-15-02-2016-088.jpg',
            name: 'Рапира',
            price: 6000,
            currency: 'Coins',
            effect_type: 'Нагибалка',
            amount: '330'
          },
          {
            id: 1,
            thumbnail: 'http://files.softicons.com/download/object-icons/weapons-icons-by-fixicon/png/256/ak47.png',
            name: 'АКРОБАТ',
            price: 16000,
            currency: 'USD',
            effect_type: 'Rifle',
            amount: '30'
          },
          {
            id: 2,
            thumbnail: 'http://files.softicons.com/download/object-icons/weapons-icons-by-fixicon/png/256/ak47.png',
            name: 'АК',
            price: 16000,
            currency: 'USD',
            effect_type: 'Rifle',
            amount: '30'
          },
          {
            id: 3,
            thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3wRKNgCgqs7czNy3Ac9z52kDPJLGr5OMeRpcgPcs5A4NuyyE0Ow',
            name: 'Mushrooms',
            price: 100,
            currency: 'HZ',
            effect_type: 'Doping',
            amount: '24'
          }
        ],
        addStoreItemFields: [
          {label: 'Ccылка на изображение', model: 'img_link', type: 'text'},
          {label: 'Цена', model: 'price', type: 'number'},
          {label: 'Тип эффекта', model: 'effect_type', type: 'select', options: ['magic', 'armor']},
          {label: 'Необходимо звезд', model: 'stars', type: 'number'},
          {label: 'Кол-е изменение эффекта', model: 'amount', type: 'number'},
        ]
      };
    },
    methods: {
      filter: function (array, keys) {
        return searchFilter(array, keys, this.searchQuery)
      },
      editItem: function() {
        console.log('Редактирование');
      },
      saveItem: function(item) {
        console.log('Сохранение', item);
      }
    },
    components: {
      searchForm: SearchForm,
      additionStoreItem: AdditionStoreItem,
      storeItem: StoreItem
    }
  }
</script>
