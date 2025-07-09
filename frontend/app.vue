<script setup lang="ts">
import { NuxtPage } from '#components';

</script>

<template>
  <v-app>
    <v-layout>
      <AppNav />
      <v-main>
        <v-container>
          <NuxtPage />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>
