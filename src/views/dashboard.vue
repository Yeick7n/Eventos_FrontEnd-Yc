<template>
  <v-app id="inspire">
    <Header @handrawer="actualiza()" />
    <Sidebar :drawer="drawer" />

    <v-main>
      <v-container class="py-2" fluid>
        <v-row>
          <v-col cols="12">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from "../components/core/Header.vue";
import Sidebar from "../components/core/Sidebar.vue";
export default {
  components: { Header, Sidebar },
  data: () => ({
    cards: ["Today", "Yesterday"],
    drawer: true,
  }),
  methods: {
    actualiza() {
      console.log("actualizado");
      this.drawer = !this.drawer;
    },
  },
};
</script>

<style>
#inspire {
  /* background-image: url("../assets/fondo.png"); */
  /* background-color: #e7ebe5; */
  background-color: #e7ebe5;
  background-size: 100% 100%;
  background-attachment: fixed;
  margin: 0;
}
</style>
