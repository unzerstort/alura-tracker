<template>
    <FormularioTarefa @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <Box v-if="listaEstaVazia">
            Você não está muito produtivo hoje. :/
        </Box>
        <div class="field">
            <p class="control has-icons-left is-large">
                <input class="input" type="texto" placeholder="Digite para filtrar" v-model="filtro" />
                <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                </span>
            </p>
        </div>
        <TarefaRealizada v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"
            @aoTarefaClicada="selecionarTarefa" />
        <ModalEdicao :mostrar="tarefaSelecionada != null">
            <template v-slot:header>
                <p class="modal-card-title">Editando uma Tarefa</p>
                <button class="delete" aria-label="close" @click="fecharModal"></button>
            </template>
            <template v-slot:body>
                <form @submit.prevent="">
                    <div class="field">
                        <label for="descricaoTarefa" class="label">
                            Descrição
                        </label>
                        <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoTarefa" />
                    </div>
                </form>
            </template>
            <template v-slot:footer>
                <button class="button is-success" type="submit" @click="alterarTarefa">Salvar alterações</button>
                <button class="button" @click="fecharModal">Cancelar</button>
            </template>
        </ModalEdicao>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import FormularioTarefa from '../components/FormularioTarefa.vue';
import TarefaRealizada from '../components/TarefaRealizada.vue';
import ModalEdicao from '@/components/ModalEdicao.vue';
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
        ModalEdicao
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

        const filtro = ref('');

        watchEffect(() => {
            store.dispatch(OBTER_TAREFAS, filtro.value);
        })

        return {
            tarefas: computed(() => store.state.tarefa.tarefas),
            store,
            filtro,
        }
    },

});
</script>
