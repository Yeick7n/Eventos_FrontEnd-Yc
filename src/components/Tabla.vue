<template>
  <v-row justify="space-around">
    <v-card max-width="900" class="mt-12 px-10 py-10">
      <v-data-table
        :items="items"
        :headers="cabecera"
        class="elevation-1"
        :search="search"
        :custom-filter="filterOnlyCapsText"
      >
        <!-- Buscador -->
        <template v-slot:top>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            @input="convertToUpperCase"
            class="mx-4"
            color="rgb(52,188,52)"
          ></v-text-field>
        </template>

        <!-- Listado -->
        <template v-slot:item.actions="{ item }">
          <v-card-actions style="padding: 0">
            <v-btn
              icon
              @click="metodoEditar(item)"
              @mouseover="mostrarTooltip = true"
              @mouseleave="mostrarTooltip = false"
              id="btn-editar"
            >
              <v-icon id="icono-editar">mdi-pencil</v-icon>
            </v-btn>

            <v-btn icon @click="metodoEliminar(item)" id="btn-eliminar">
              <v-icon id="icono-eliminar">mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </template>
      </v-data-table>
    </v-card>
  </v-row>
</template>

<script>
export default {
  props: ["items", "cabecera", "metodoEditar", "metodoEliminar"],
  data() {
    return {
      mostrarTooltip: false,
      search: "",
    };
  },
  methods: {
    filterOnlyCapsText(value, search) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().toLocaleUpperCase().indexOf(search) !== -1
      );
    },

    convertToUpperCase() {
      this.search = this.search.toUpperCase();
    },
  },
};
</script>

<style>
#btn-editar,
#btn-eliminar {
  width: 35px;
  height: 35px;
  color: #fff;
}

#btn-editar {
  margin-right: 7px;
  background-color: #34bc34;
}

#btn-eliminar {
  background-color: #222;
}

#icono-editar,
#icono-eliminar {
  font-size: 20px;
}
</style>
