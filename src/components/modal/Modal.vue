<template>
    <b-modal size="lg" ref="meuModal" :id="idModal" hide-footer title="Resultado">
        <div v-if="hasData">
            <div v-if="result[2][0] != null || result[2][1] != null">

                <h3 class=" error1 text-center">OPS! :( <br> Something wrong.</h3>
                <p class=" font-weight-light text-center">Cod.{{ result[2][0].codigo }} <br> Mensagem: {{ result[2][0].msg }}</p>
            </div>
            <div role="tablist" v-else>
                <meu-section :dados="result[0]" :titulo="'1KG'" :open="true" :idCollapse="'fs'"></meu-section>
                <meu-section :dados="result[1]" :titulo="'2KG'" :open="false" :idCollapse="'nd'"></meu-section>
            </div>
            <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-btn>
        </div>
        <meu-loader v-if="!hasData" v-show="isOk"></meu-loader>
    </b-modal>
</template>
<script>

    import Loader from '../loader/Loader.vue';
    import Section from '../section/Section.vue';

    export default {
        props:['hasData','result', 'isOk', 'idModal'],
        components:{
            'meu-loader': Loader,
            'meu-section': Section
        },
        data(){
            return {
            }
        },
        methods:{
            hideModal()
            {
                this.$refs.meuModal.hide();
            }
        }
    }
</script>
<style>

</style>