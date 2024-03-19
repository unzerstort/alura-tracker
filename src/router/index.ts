import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import TarefasView from '../views/TarefasView.vue';
import ProjetosView from '../views/ProjetosView.vue'
import FormularioView from "@/views/Projetos/FormularioView.vue";


const rotas: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tarefas',
        component: TarefasView
    }, 
    {
        path: '/projetos',
        name: 'Projetos',
        component: ProjetosView
    },
    {
        path: '/projetos/novo',
        name: 'Novo projeto',
        component: FormularioView
    },
    {
        path: '/projetos/:id',
        name: 'Editar projeto',
        component: FormularioView,
        props: true
    },
];

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas,
});

export default roteador;