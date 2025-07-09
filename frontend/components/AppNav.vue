<template>
    <v-navigation-drawer
        expand-on-hover
        rail
      >


        <v-list density="compact"` nav>
          <v-list-item 
            v-for="link in links"
            :key="link.value"
            :to="`/${link.value}`"
            
            :prepend-icon="link.icon"
          >
            {{ link.title }}
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
</template>

<script setup>

const links = [
  { title: 'Главная', value: '', icon: 'mdi-home' },
  { title: 'Клиенты', value: 'clients', icon: 'mdi-account-multiple' },
//   { title: 'Сделки', value: 'deals', icon: 'mdi-briefcase-account' },
//   { title: 'Задачи', value: 'tasks', icon: 'mdi-format-list-bulleted' },
//   { title: 'Отчеты', value: 'reports', icon: 'mdi-chart-bar' },
//   { title: 'Настройки', value: 'settings', icon: 'mdi-cog' }
]

</script>