let menu = [
  {
    admin: [
      {
        header: true,
        title: "MENU EVENTOS",
        hiddenOnCollapse: false,
      },
      {
        href: "/dashboard/regional",
        title: "Regional",
        icon: "fa fa-building",
      },
      {
        href: "/dashboard/centro",
        title: "Centro",
        icon: "mdi mdi-bank",
      },
      {
        href: "/dashboard/sede",
        title: "Sede",
        icon: "mdi mdi-home-city",
      },
      {
        title: "Infra-estructura",
        icon: "fa fa-cogs",

        child: [
          {
            href: "/dashboard/bloque",
            title: "Bloque",
          },
          {
            href: "/dashboard/tipoAmbiente",
            title: "Tipo Ambiente",
          },
          {
            href: "/dashboard/ambiente",
            title: "Ambiente",
          },
        ],
      },
      {
        title: "Programa",
        icon: "mdi mdi-school",
        child: [
          {
            href: "/dashboard/crearprograma",
            title: "Crear programa",
          },
          {
            href: "/dashboard/carguemasivoprograma",
            title: "Cargue Masivo",
          },
        ]

      },
      {
        href: "/dashboard/crearficha",
        title: "Ficha",
        icon: "mdi mdi-newspaper-variant-multiple-outline",
      },
      {
        title: "Competencia",
        icon: "mdi mdi-notebook-edit",

        child: [
          {
            href: "/dashboard/crearcompetencia",
            title: "Crear",
          },
          {
            href: "/dashboard/listarcompetencia",
            title: "Listar",
          },
          {
            href: "/dashboard/crearresultadoaprendizaje",
            title: "Resultados de Aprendizaje",
          },
          {
            href: "/dashboard/carguemasivocompetencias",
            title: "Cargue Masivo",
          },
        ],
      },

      {
        title: "Usuario",
        icon: "mdi mdi-account-tie",

        child: [
          {
            href: "/dashboard/crearusuario",
            title: "Crear",
          },
          {
            href: "/dashboard/listarusuario",
            title: "Listar",
          },
          {
            href: "/dashboard/masivousuario",
            title: "Cargue Masivo",
          },
        ],
      },
    ],
  },
  {
    instructor: [
      {
        header: true,
        title: "MENU EVENTOS",
        hiddenOnCollapse: false,
      },
      {
        href: "/dashboard/crearevento",
        title: "Evento",
        icon: "mdi mdi-calendar-clock",
      },
      {
        href: "/dashboard/disponibilidad",
        title: "Disponibilidad",
        icon: "mdi mdi-calendar-clock",
      },
      {
        href: "/dashboard/estadistica",
        title: "Estadisticas",
        icon: "mdi mdi-chart-histogram",
      },
      {
        href: "/dashboard/salida",
        title: "Salir",
        icon: "mdi mdi-chart-histogram",
      },
    ],
  },
  {
    coordinador: [
      {
        header: true,
        title: "MENU EVENTOS",
        hiddenOnCollapse: false,
      },
      {
        href: "/dashboard/programainstructor",
        title: "Programas Instructor",
        icon: "mdi mdi-calendar-clock",
      },
      {
        href: "/dashboard/instructoresprograma",
        title: "Instructores por Programa",
        icon: "mdi mdi-calendar-clock",
      },
    ]
  }


];

module.exports = menu;
