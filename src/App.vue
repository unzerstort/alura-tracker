<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuroAtivo }">
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="trocarTema"/>
    </div>
    <div class="column is-three-quarter conteudo">
      <FormularioTarefa @aoSalvarTarefa="salvarTarefa" />
      <div class="lista">
        <TarefaRealizada v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" :class="{ 'modo-escuro': modoEscuroAtivo }"/>
        <Box v-if="listaEstaVazia" :class="{ 'modo-escuro': modoEscuroAtivo }">
          Você não está muito produtivo hoje. :[
        </Box>
      </div>
    </div>

  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import FormularioTarefa from './components/FormularioTarefa.vue';
import TarefaRealizada from './components/TarefaRealizada.vue'
import ITarefa from './interfaces/ITarefa';
import Box from './components/Box.vue';

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    FormularioTarefa,
    TarefaRealizada,
    Box,
  },
  data() {
    return {
      tarefas: [] as ITarefa[],
      modoEscuroAtivo: false,
    }
  },
  computed: {
    listaEstaVazia () : boolean {
      return this.tarefas.length === 0;
    }
  },
  methods: {
    salvarTarefa (tarefa: ITarefa) {
      this.tarefas.push(tarefa);
    },
    trocarTema (modoEscuroAtivo: boolean) {
      this.modoEscuroAtivo = modoEscuroAtivo;
    }

  }

});
</script>

<style>
.lista {
  padding: 1.25rem;
}

main {
  --bg-primario: #ffffff;
  --bg-secundario: #f7c500;
  --texto-primario: #000000;
}

main.modo-escuro {
  --bg-primario: #2b2d42;
  --bg-secundario: #084275;
  --texto-primario: #dddddd;
}

.conteudo {
  background-color: var(--bg-primario);
}

</style>
