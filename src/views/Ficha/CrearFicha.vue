<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="800">
        <!-- Encabezado -->
        <v-app-bar flat color="rgb(52,188,52)">
          <v-toolbar-title class="text-h6 white--text pl-0">
            {{ modoEdicion ? "EDITAR FICHA" : "CREAR FICHA" }}
          </v-toolbar-title>

          <v-spacer></v-spacer>
        </v-app-bar>

        <!-- Formulario -->
        <v-card-text class="carta">
          <v-form ref="form">
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    label="Código"
                    prepend-inner-icon="mdi mdi-key-variant"
                    v-model="paquete.codigo"
                    :rules="camposRules"
                    outlined
                    color="rgb(52,188,52)"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="paquete.fechaInicio"
                    type="date"
                    label="Fecha de inicio"
                    outlined
                    :rules="camposRules"
                    color="rgb(52,188,52)"
                  ></v-text-field>
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    v-model="paquete.fechaFin"
                    type="date"
                    label="Fecha de finalización"
                    outlined
                    :rules="camposRules"
                    color="rgb(52,188,52)"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6">
                  <v-select
                    :items="sedes"
                    item-text="nombre"
                    item-value="_id"
                    label="Sede"
                    v-model="paquete.sede"
                    append-icon="mdi mdi-home-city"
                    @change="cargarAmbientes(paquete.sede)"
                    :rules="camposRules"
                    outlined
                    color="rgb(52,188,52)"
                  ></v-select>
                </v-col>

                <v-col cols="6">
                  <v-select
                    :items="ambientes"
                    item-text="codigo"
                    item-value="_id"
                    label="Ambiente"
                    v-model="paquete.ambiente"
                    append-icon="mdi mdi-home"
                    :rules="camposRules"
                    outlined
                    color="rgb(52,188,52)"
                  >
                    <template v-slot:item="{ item }">
                      {{ item.bloque.nomenclatura }}-{{ item.codigo }}
                    </template>

                    <template slot="selection" slot-scope="data">
                      {{ data.item.bloque.nomenclatura }} -
                      {{ data.item.codigo }}
                    </template>
                  </v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-select
                    :items="programas"
                    item-text="nombre"
                    item-value="_id"
                    label="Programa de formación"
                    v-model="paquete.programa"
                    append-icon="mdi mdi-school"
                    @change="instructoresPrograma(paquete.programa)"
                    :rules="camposRules"
                    outlined
                    color="rgb(52,188,52)"
                  >
                    <template v-slot:item="{ item }">
                      {{ item.nivel }} - {{ item.nombre }} - Intensidad horaria
                      : {{ item.intensidad_horaria }}
                    </template>

                    <template slot="selection" slot-scope="data">
                      {{ data.item.nivel }} - {{ data.item.nombre }}
                    </template>
                  </v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6">
                  <v-select
                    :items="instructores"
                    item-text="nombre"
                    item-value="_id"
                    label="Lider de ficha"
                    v-model="paquete.instructor"
                    append-icon="mdi mdi-account-tie"
                    :rules="camposRules"
                    outlined
                    color="rgb(52,188,52)"
                  >
                    <template v-slot:item="{ item }">
                      {{ item.nombre }} {{ item.apellido }}
                    </template>

                    <template slot="selection" slot-scope="data">
                      {{ data.item.nombre }} {{ data.item.apellido }}
                    </template>
                  </v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-form>

          <v-row>
            <v-col>
              <v-divider></v-divider>
            </v-col>
          </v-row>

          <!-- Datos de Jornada -->
          <v-form ref="formJornada">
            <v-container>
              <v-row>
                <v-col cols="5">
                  <v-select
                    :items="diasSemana"
                    item-text="diasSemana"
                    item-value="diasSemana"
                    label="Día"
                    v-model="dia"
                    append-icon="mdi-calendar"
                    :rules="camposRules"
                    class="ml-5"
                    outlined
                    color="rgb(52,188,52)"
                  ></v-select>
                </v-col>

                <v-col cols="5">
                  <v-select
                    :items="jornadas"
                    item-text="descripcion"
                    item-value="descripcion"
                    label="Jornada"
                    v-model="jornadaInput"
                    append-icon="mdi-calendar"
                    :rules="camposRules"
                    class="ml-5"
                    outlined
                    color="rgb(52,188,52)"
                  ></v-select>
                </v-col>

                <v-col cols="1">
                  <v-btn
                    class="mx-2 mt-2"
                    fab
                    dark
                    color="rgb(52,188,52)"
                    width="40px"
                    height="40px"
                    @click="agregarLista"
                  >
                    <v-icon dark>mdi-plus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>

          <!-- Tabla Jornadas -->
          <v-row>
            <v-col cols="12">
              <v-data-table
                :items="paquete.jornadas"
                :headers="cabeceraTablaHorario"
                class="elevation-1 mx-5"
              ></v-data-table>
            </v-col>
          </v-row>
        </v-card-text>

        <!-- Acciones: Limpiar / Editar - Cancelar -->
        <v-card-actions style="max-width: 95%; margin: auto">
          <v-btn
            :class="['ma-2', colorBtn]"
            :style="{ color: '#fff' }"
            @click="modoEdicion ? guardarEdicion() : guardar()"
          >
            {{ modoEdicion ? "Editar" : "Crear" }}
          </v-btn>

          <v-btn
            class="ma-2 colorBtnLimpiar"
            v-if="!modoEdicion"
            @click="
              limpiarFormulario();
              limpiarDatosHorario();
            "
          >
            Limpiar
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            class="ma-2 white--text colorBtnEliminar"
            v-if="modoEdicion"
            @click="
              limpiarFormulario();
              modoEdicion = false;
            "
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>

    <!-- Tabla listar Fichas -->
    <template>
      <v-row justify="space-around">
        <v-card max-width="1000" class="mt-12">
          <v-data-table
            :items="fichas"
            :headers="cabeceraTablaFichas"
            class="elevation-1 mx-12 my-6"
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

            <template v-slot:body="{ items }">
              <tbody>
                <tr v-for="(item, index) in items" :key="index">
                  <td>{{ item.codigo }}</td>
                  <td>{{ item.fechaInicio.slice(0, 10) }}</td>
                  <td>{{ item.fechaFin.slice(0, 10) }}</td>
                  <td>{{ item.sede.nombre }}</td>
                  <td>
                    {{ item.ambiente.bloque.nomenclatura }}-{{
                      item.ambiente.codigo
                    }}
                  </td>
                  <td>
                    {{ item.programa.nombre }} - Ver :
                    {{ item.programa.version }} Int. H :
                    {{ item.programa.intensidad_horaria }}
                  </td>
                  <td>
                    {{ item.instructor.nombre }} {{ item.instructor.apellido }}
                  </td>

                  <td>
                    <span v-for="data in item.jornadas" :key="data.dia">
                      ({{ data.dia[0] }} {{ data.dia[1] }} )
                    </span>
                  </td>

                  <td>
                    <v-btn
                      icon
                      @click="editarRegistro(item)"
                      @mouseover="mostrarTooltip = true"
                      @mouseleave="mostrarTooltip = false"
                      id="btn-editar"
                    >
                      <v-icon id="icono-editar">mdi-pencil</v-icon>
                    </v-btn>

                    <v-btn
                      icon
                      @click="eliminarRegistro(item)"
                      id="btn-eliminar"
                    >
                      <v-icon id="icono-eliminar">mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>

            <!-- Listado -->
            <template v-slot:item="{ item }">
              <!-- <v-card-actions> -->
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
              <!-- </v-card-actions> -->
            </template>
          </v-data-table>
        </v-card>
      </v-row>
    </template>

    <!-- Cargando... -->
    <Spinner :value="loading" />

    <!-- Dialogo de creación -->
    <Dialogo
      :show="dialogoFichaCreada"
      title="Registro creado con éxito"
      text="Ficha creada"
      @close-dialog="dialogoFichaCreada = $event"
    />

    <!-- Dialogo de actualización -->
    <Dialogo
      :show="dialogoFichaActualizada"
      title="Registro actualizado con éxito"
      text="Ficha actualizada"
      @close-dialog="dialogoFichaActualizada = $event"
    />

    <!-- Dialogos de eliminación -->
    <Dialogo_confirm_delete
      :show="dialogo1EliminarFicha"
      title="Realmente quieres eliminar esta ficha?"
      :confirmDeleteMethod="confirmarEliminacion"
      @close-dialog="dialogo1EliminarFicha = $event"
    />

    <Dialogo
      :show="dialogo2EliminarFicha"
      title="Registro eliminado con éxito"
      text="Ficha eliminada"
      @close-dialog="dialogo2EliminarFicha = $event"
    />

    <!-- Dialogo fecha inválida -->
    <DialogError
      :show="dialogoFechaInvalida"
      title="Fecha inválida !"
      text="La fecha de inicio no puede ser mayor o igual a la fecha de
      finalización"
      @close-dialog="dialogoFechaInvalida = $event"
    />

    <!-- <v-dialog v-model="dialogoFechaInvalida" persistent max-width="670">
      <v-card>
        <v-card-title style="color: rgb(248, 74, 74)" class="headline"
          >Fecha inválida !</v-card-title
        >
        <v-card-text
          >La fecha de inicio no puede ser mayor o igual a la fecha de
          finalización</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialogoFechaInvalida = false"
            >Aceptar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog> -->

    <DialogError
      :show="dialogoHorarioRepetido"
      title="La jornada ya existe!"
      text="No se puede volver a registrar una jornada para el mismo día"
      @close-dialog="dialogoHorarioRepetido = $event"
    />

    <!-- Dialogo jornadas vacias -->
    <DialogError
      :show="dialogoJornadasVacias"
      title="Se debe establecer el horario de la ficha"
      text="La ficha debe tener al menos el horario para un día en
          específico"
      @close-dialog="dialogoJornadasVacias = $event"
    />

    <pre>{{ $data }}</pre>
  </v-container>
</template>

<script>
import axios from "axios";
import dia from "../../json/dia";
// import Tabla from "../../components/Tabla.vue"
import Dialogo from "../../components/Dialog.vue";
import Dialogo_confirm_delete from "../../components/Dialog-confirm-delete.vue";
import Spinner from "../../components/Spinner.vue";
import DialogError from "../../components/DialogError.vue";

export default {
  components: { Dialogo, Dialogo_confirm_delete, Spinner, DialogError },
  props: {
    datos: Object,
  },
  data() {
    return {
      api: `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`,
      paquete: {
        codigo: null,
        fechaInicio: null,
        fechaFin: null,
        sede: null,
        ambiente: null,
        programa: null,
        instructor: null,
        jornadas: [],
      },
      fichas: [],
      sedes: [],
      ambientes: [],
      programas: [],
      camposRules: [(v) => !!v || "Requerido !"],
      modoEdicion: false,
      // titulos de la primera tabla
      cabeceraTablaHorario: [
        { text: "Dia", value: "dia" },
        { text: "Jornada", value: "jornada" },
        { text: "Hora inicio", value: "horaInicio" },
        { text: "Hora Fin", value: "horaFin" },
      ],
      cabeceraTablaFichas: [
        { text: "Código", value: "codigo" },
        { text: "Fecha inicio", value: "fechaInicio" },
        { text: "Fecha fin", value: "fechaFin" },
        { text: "Sede", value: "sede.nombre" },
        { text: "Ambiente", value: "ambiente.codigo" },
        { text: "Programa", value: "programa.nombre" },
        { text: "Lider de ficha", value: `instructor.nombre` },
        { text: "Jornadas", value: "jornadas" },
        { text: "Acciones", value: "actions" },
      ],
      // items de la tabla
      listItems: [],
      // datos de del backend
      instructores: [],
      diasSemana: dia,
      dia: null,
      jornadaInput: null,
      mostrar: false,
      modalTitle: "",
      modalText: "",
      textoBusqueda: "",
      programaVista: [],
      loading: false,
      dialogoFichaCreada: false,
      dialogoFichaActualizada: false,
      dialogo1EliminarFicha: false,
      dialogo2EliminarFicha: false,
      dialogoJornadasVacias: false,
      dialogoFechaInvalida: false,
      dialogoHorarioRepetido: false,
      itemEliminar: null,
      jornadas: [],

      mostrarTooltip: false,
      search: "",
    };
  },

  methods: {
    async cargarFichas() {
      const fichasResponse = await axios.get(`${this.api}/ficha`);
      this.fichas = fichasResponse.data;
      console.log(this.fichas);
    },

    async cargarAmbientes(sede) {
      // obtener los ambientes por sede
      this.loading = true;
      const ambientesResponse = await axios.get(
        `${this.api}/ambiente/sede/${sede}`
      );
      this.ambientes = ambientesResponse.data;
      this.loading = false;
    },

    async instructoresPrograma(programa) {
      this.loading = true;
      //const instructoresResponse = await axios.get(`${this.api}/instructor/programa/${this.paquete.programa}/sede/${this.paquete.sede}`);
      let centro = this.$store.getters.usuario.centro;
      const instructoresResponse = await axios.get(
        `${this.api}/users/instructores/programa/${programa}/centro/${centro}`
      );
      console.log(instructoresResponse.data);
      this.instructores = instructoresResponse.data;

      this.loading = false;
    },

    async guardar() {
      if (this.$refs.form.validate()) {
        if (!this.validarFecha()) {
          this.dialogoFechaInvalida = true;
          return;
        }

        if (this.paquete.jornadas.length < 1) {
          this.dialogoJornadasVacias = true;
          return;
        }

        this.loading = true;
        try {
          await axios.post(`${this.api}/ficha/crear`, this.paquete);

          await this.cargarFichas();
          this.limpiarFormulario();
          this.loading = false;
          this.dialogoFichaCreada = true;
        } catch (error) {
          console.error(error);
        }
      }

      window.scrollTo(0, 0);
    },

    async editarRegistro(item) {
      this.loading = true;
      window.scrollTo(0, 0);

      // Para cargar ambientes e instructores, ya que estos métodos
      // principalmente se ejecutan en el @change de sede y programa
      await this.cargarAmbientes(item.sede._id);
      await this.instructoresPrograma(item.programa._id);

      let {
        _id,
        codigo,
        fechaInicio,
        fechaFin,
        sede,
        ambiente,
        programa,
        instructor,
        jornadas,
      } = item;

      const fechaFormateada = this.agregarFormatoFecha(fechaInicio, fechaFin);
      fechaInicio = fechaFormateada[0];
      fechaFin = fechaFormateada[1];

      this.paquete = {
        id: _id,
        codigo,
        fechaInicio,
        fechaFin,
        sede: sede._id,
        ambiente: ambiente._id,
        programa: programa._id,
        instructor: instructor._id,
        jornadas,
      };

      this.modoEdicion = true;

      this.loading = false;
    },

    async guardarEdicion() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          await axios.put(`${this.api}/ficha/actualizar`, this.paquete);

          await this.cargarFichas();
          this.limpiarFormulario();
          this.modoEdicion = false;
          this.loading = false;
          this.dialogoFichaActualizada = true;
        } catch (error) {
          console.error(error);
        }
      }

      window.scrollTo(0, 0);
    },

    eliminarRegistro(item) {
      this.itemEliminar = item;
      this.dialogo1EliminarFicha = true;
    },

    async confirmarEliminacion() {
      this.dialogo1EliminarFicha = false;
      this.loading = true;

      try {
        await axios.delete(
          `${this.api}/ficha/eliminar/${this.itemEliminar._id}`
        );

        await this.cargarFichas();
        this.itemEliminar = null;
        this.loading = false;
        this.dialogo2EliminarFicha = true;
      } catch (error) {
        console.error(error);
      }
    },

    agregarLista() {
      if (this.$refs.formJornada.validate()) {
        const existeHorario = this.paquete.jornadas.some(
          (jornada) =>
            jornada.dia == this.dia && jornada.jornada == this.jornadaInput
        );

        if (!existeHorario) {
          let indice = null;

          for (const jornada of this.jornadas) {
            if (jornada.descripcion.includes(this.jornadaInput)) {
              indice = this.jornadas.indexOf(jornada);
              break; // Si se encuentra el item, se sale del bucle
            }
          }

          this.paquete.jornadas.push({
            dia: this.dia,
            jornada: this.jornadaInput,
            horaInicio: this.jornadas[indice].horaInicio,
            horaFin: this.jornadas[indice].horaFin,
          });
        } else {
          this.dialogoHorarioRepetido = true;
        }

        this.limpiarDatosHorario();
      }
    },

    agregarFormatoFecha(fechaInicio, fechaFin) {
      if (fechaInicio != null && fechaFin != null) {
        if (fechaInicio.includes("T") && fechaFin.includes("T")) {
          // this.paquete.fechaInicio = this.paquete.fechaInicio + "T00:00:00.000Z";
          // this.paquete.fechaFin = this.paquete.fechaFin + "T00:00:00.000Z";
          fechaInicio = fechaInicio.slice(0, 10);
          fechaFin = fechaFin.slice(0, 10);
          return [fechaInicio, fechaFin];
        }
      }
      return false;
    },

    validarFecha() {
      const fechaInicio = this.paquete.fechaInicio.split("-");
      const fechaFin = this.paquete.fechaFin.split("-");

      const fechaInicioObj = new Date(
        fechaInicio[0],
        fechaInicio[1] - 1,
        fechaInicio[2]
      );

      const fechaFinObj = new Date(fechaFin[0], fechaFin[1] - 1, fechaFin[2]);

      // Verifica si las fechas son válidas
      if (
        isNaN(fechaInicioObj.getTime()) ||
        isNaN(fechaFinObj.getTime()) ||
        fechaInicioObj > fechaFinObj ||
        fechaInicioObj === fechaFinObj
      ) {
        return false; // Las fechas no son válidas
      }

      return true; // Las fechas son válidas
    },

    actualizarProgramas() {
      this.programaVista = this.programas.filter(
        (item) =>
          item.codigo.includes(this.textoBusqueda) ||
          item.nombre.includes(this.textoBusqueda)
      );
    },

    limpiarFormulario() {
      this.$refs.form.resetValidation();
      this.paquete = {
        codigo: null,
        fechaInicio: null,
        fechaFin: null,
        sede: null,
        ambiente: null,
        programa: null,
        instructor: null,
        jornadas: [],
      };
    },

    limpiarDatosHorario() {
      this.$refs.formJornada.resetValidation();

      this.dia = null;
      this.jornadaInput = null;
    },

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

  async mounted() {
    this.loading = true;

    await this.cargarFichas();

    // obtenemos las jornadas

    const response = await axios.get(`${this.api}/jornada`);
    this.jornadas = response.data;

    const centro = this.$store.getters.usuario.centro;
    const responseSedes = await axios.get(`${this.api}/sedes/centro/${centro}`);
    this.sedes = responseSedes.data;

    const responseProgramas = await axios.get(`${this.api}/programas`);
    this.programas = responseProgramas.data;

    // obtener los programas
    // const programasResponse = await axios.get(`${this.api}/programas/`);
    // this.programas = programasResponse.data;
    // this.programaVista = this.programas;

    // obtener instructores

    this.loading = false;
  },

  computed: {
    ambientesVista() {
      if (this.paquete.sede == null) {
        return [];
      }

      return this.ambientes.filter((item) => item.sede == this.paquete.sede);
    },

    colorBtn() {
      return this.modoEdicion ? "colorBtnEditar" : "colorBtnCrear";
    },
  },
};
</script>

<style>
.text-green input {
  color: red !important;
  font-family: "Lumanosimo", cursive;
  font-weight: 400;
  font-size: 22;
}

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
