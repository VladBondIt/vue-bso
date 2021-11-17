<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      color="#6A76AB"
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <div class="align-self-end">Личный Кабинет</div>

      <v-spacer></v-spacer>
      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab>
            <router-link class="link" to="/scores">Счета</router-link>
          </v-tab>
          <v-tab><router-link class="link" to="/operatingdays">Операционные дни</router-link></v-tab>
          <v-tab><router-link class="link" to="/operations">Операции</router-link></v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
  </v-card>
</template>

<script>
export default {};
</script>

<style scoped>
.link{
    color: white;
    text-decoration: none;
    height: 100%;
    display: flex;
    align-items: center;
}
</style>