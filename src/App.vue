<template>
	<main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuroAtivo }">
		<div class="column is-one-fifth">
			<BarraLateral @aoTemaAlterado="trocarTema"/>
		</div>
		<div class="column is-three-quarter conteudo">
			<Notificacoes></Notificacoes>
			<RouterView></RouterView>
		</div>

	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import Notificacoes from '@/components/Notificacoes.vue'
import { RouterView } from 'vue-router';

export default defineComponent({
	name: 'App',
	components: {
		BarraLateral,
		Notificacoes
	},
	data() {
		return {
			modoEscuroAtivo: false,
		}
	},
	methods: {
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
	--bg-secundario: #f7c600ec;
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
