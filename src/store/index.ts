import IProjeto from "@/interfaces/IProjeto";
import ITarefa from "@/interfaces/ITarefa";
import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";
import { ADICIONA_PROJETO, ADICIONA_TAREFA, ALTERA_PROJETO, ALTERA_TAREFA, EXCLUI_PROJETO, EXCLUI_TAREFA, NOTIFICAR } from "./tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacao";

interface Estado {
    projetos: IProjeto[],
    tarefas: ITarefa[],
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
    state: {
        projetos: [],
        tarefas: [],
        notificacoes: []
    },
    mutations: {
        [ADICIONA_PROJETO] (state, nomeProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeProjeto
            } as IProjeto;
            state.projetos.push(projeto);
        }, 
        [ALTERA_PROJETO] (state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id);
            state.projetos[index] = projeto;
        },
        [EXCLUI_PROJETO] (state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id);
        },
        [ADICIONA_TAREFA] (state, tarefa: ITarefa) {
            tarefa.id = new Date().toISOString();
            state.tarefas.push(tarefa);
        },
        [ALTERA_TAREFA] (state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(tarefa => tarefa.id == tarefa.id);
            state.tarefas[index] = tarefa;
        },
        [EXCLUI_TAREFA] (state, id: string) {
            state.tarefas = state.tarefas.filter(tarefa => tarefa.id != id);
        },
        [NOTIFICAR] (state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao);

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 2000)
        }
    }
});

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}