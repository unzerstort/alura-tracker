<template>
    <FormularioTarefa @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <TarefaRealizada v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"
            :class="{ 'modo-escuro': modoEscuroAtivo }" />
        <Box v-if="listaEstaVazia" :class="{ 'modo-escuro': modoEscuroAtivo }">
            Você não está muito produtivo hoje. :/
        </Box>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormularioTarefa from '../components/FormularioTarefa.vue';
import TarefaRealizada from '../components/TarefaRealizada.vue'
import ITarefa from '../interfaces/ITarefa';
import Box from '../components/Box.vue';

export default defineComponent({
    name: 'App',
    components: {
        FormularioTarefa,
        TarefaRealizada,
        Box,
    },
    data() {
        return {
            tarefas: [] as ITarefa[],
        }
    },
    computed: {
        listaEstaVazia(): boolean {
            return this.tarefas.length === 0;
        }
    },
    methods: {
        salvarTarefa(tarefa: ITarefa) {
            this.tarefas.push(tarefa);
        },

    }

});
</script>
