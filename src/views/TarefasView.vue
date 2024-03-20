<template>
    <FormularioTarefa @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <Box v-if="listaEstaVazia">
            Você não está muito produtivo hoje. :/
        </Box>
        <TarefaRealizada v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"
            @aoTarefaClicada="selecionarTarefa" />
        <div class="modal" :class="{ 'is-active': tarefaSelecionada }" v-if="tarefaSelecionada">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Editando uma Tarefa</p>
                    <button class="delete" aria-label="close" @click="fecharModal"></button>
                </header>
                <section class="modal-card-body">
                    <form @submit.prevent="">
                        <div class="field">
                            <label for="descricaoTarefa" class="label">
                                Descrição
                            </label>
                            <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoTarefa" />
                        </div>
                    </form>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success" type="submit" @click="alterarTarefa">Salvar alterações</button>
                    <button class="button" @click="fecharModal">Cancelar</button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import FormularioTarefa from '../components/FormularioTarefa.vue';
import TarefaRealizada from '../components/TarefaRealizada.vue'
import Box from '../components/Box.vue';
import { useStore } from '@/store';
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_TAREFAS } from '@/store/tipo-acoes';
import { OBTER_PROJETOS } from '@/store/tipo-acoes';
import ITarefa from '@/interfaces/ITarefa';

export default defineComponent({
    name: 'App',
    components: {
        FormularioTarefa,
        TarefaRealizada,
        Box,
    },
    data() {
        return {
            tarefaSelecionada: null as ITarefa | null,
        }
    },
    methods: {
        salvarTarefa(tarefa: ITarefa) {
            this.store.dispatch(CADASTRAR_TAREFA, tarefa);
        },
        selecionarTarefa(tarefa: ITarefa) {
            this.tarefaSelecionada = tarefa;
        },
        fecharModal() {
            this.tarefaSelecionada = null;
        },
        alterarTarefa() {
            this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
                .then(() => this.fecharModal);
        }
    },
    computed: {
        listaEstaVazia(): boolean {
            return this.tarefas.length == 0;
        }
    },
    setup() {
        const store = useStore();
        store.dispatch(OBTER_TAREFAS);
        store.dispatch(OBTER_PROJETOS);

        return {
            tarefas: computed(() => store.state.tarefa.tarefas),
            store
        }
    },

});
</script>
