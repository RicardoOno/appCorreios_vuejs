<template>
        <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <b-btn block href="#"  v-b-toggle="idCollapse" variant="info">{{ titulo }} - Caixa 2</b-btn>
            </b-card-header>
            <b-collapse :id="idCollapse"  accordion="my-accordion" role="tabpanel">
                <b-card-body class="cBody">
                    <b-col class="cFor" v-for="iResult of dados">
                        <b-card-group class="cGroup" deck>
                            <b-card class="margB cCard" :title="iResult.codigo == 4014 ? 'Sedex' : 'PAC'">
                                <div class="card-text cText">
                                    <div v-if="iResult.msgE == ''">
                                        <p><b>Prazo: </b><span class="align-middle"> {{ iResult.prazoEntrega }}</span> dias úteis</p>
                                        <p><b>Valor:</b> <span class="align-middle">R${{ iResult.valor }}</span></p>
                                    </div>
                                    <div v-else>
                                        <p class="erro">Erro: {{ iResult.msgE }}</p>
                                    </div>
                                </div>
                            </b-card>
                        </b-card-group>
                    </b-col>
                </b-card-body>
            </b-collapse>
        </b-card>
</template>
<script>
    export default {
        props: ['dados', 'titulo', 'open', 'idCollapse']
    }
</script>
<style>
    .erro, .error1 {
        color: darkred;
    }

    #pesquisar{
        margin-bottom: 30px;
    }
    span{
        font-size:2em;
    }
    .card-title {
        border-bottom: 5px solid #cfcfcf;
    }
    .cBody {
        padding: 0px;
    }
    .cCard {
        padding: 0px;
        border-radius: 0px;
        border: 0px;
        margin-bottom: 0px!important;
    }
    .cFor {
        padding: 0;
    }
    .card-body {
        padding-bottom: 0px;
    }
</style>