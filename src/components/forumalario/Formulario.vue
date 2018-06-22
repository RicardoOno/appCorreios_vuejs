<template>
    <b-row>
            <form class="col-md-12" @submit.prevent="enviar()">
                <div class="form-group">
                    <label for="cepO">Cep Origem</label>
                    <input type="text" class="form-control" id="cepO">
                </div>
                <div class="form-group">
                    <label for="cepD">Cep Destino</label>
                    <input type="text" class="form-control" id="cepD">
                </div>
                <div class="checkbox">
                    <label>
                        <input type="checkbox" name="pac"> PAC
                    </label>
                    <label>
                        <input type="checkbox" name="sedex"> SEDEX
                    </label>
                </div>
                <b-btn v-b-modal.modal1 type="submit" class="btn btn-default" id="pesquisar">Pesquisar</b-btn>
            </form>
        <p>
            <code>{{ xmlRes }}</code>
        </p>
        <!--
        <h1 class="col-md-12">Informações: </h1>
        <div class="col-md-4" v-for="iTest of tests">
            <h2 class="text-center col-md-4">{{ iTest.sobrenome }}</h2>
            <p>{{ iTest.nome + ' ' + iTest.sobrenome}}</p>
            <p>{{ iTest.casa }}</p>
        </div>
        -->
        <b-modal size="lg" centered id="modal1" title="Bootstrap-Vue">
        <b-row no-gutters>
            <b-col>
                <b-col cols="12" v-for="iResult of result['1k']">
                    <b-card-group deck>
                        <b-card class="margB"
                                :title="iResult.codigo == 4014 ? 'Sedex' : 'PAC'"
                                sub-title="1KG - Caixa 123">
                            <div class="card-text">
                                <div v-if="iResult.msgE == ''">
                                    <p>Prazo de entrega: {{ iResult.prazoEntrega }}</p>
                                    <p>Valor: {{ iResult.valor }}</p>
                                </div>
                                <div v-else>
                                    <p class="erro">Erro: {{ iResult.msgE }}</p>
                                </div>
                            </div>
                        </b-card>
                    </b-card-group>
                </b-col>
            </b-col>
            <b-col>
                <b-col cols="12" v-for="iResult of result['2k']">
                    <b-card-group deck>
                        <b-card class="margB"
                                :title="iResult.codigo == 4014 ? 'Sedex' : 'PAC'"
                                sub-title="2KG - Caixa 1">
                            <div class="card-text">
                                <div v-if="iResult.msgE == ''">
                                    <p>Prazo de entrega: {{ iResult.prazoEntrega }}</p>
                                    <p>Valor: {{ iResult.valor }}</p>
                                </div>
                                <div v-else>
                                    <p class="erro">Erro: {{ iResult.msgE }}</p>
                                </div>
                            </div>
                        </b-card>
                    </b-card-group>
                </b-col>
            </b-col>
        </b-row>
        </b-modal>
    </b-row>
</template>
<script>

    window.x2j = require('xml2js').parseString;

    export default {
        data(){
            return {
                result: [],
                xmlRes: '',
                hSlot: 'PAX',
                tests: [
                    {casa:'Azul', nome: 'Tadashi', sobrenome: 'Ono'},
                    {casa:'Verde', nome: 'Makoto', sobrenome: 'Ono'},
                    {casa:'Amarela', nome: 'Naomi', sobrenome: 'Ono'}
                ]
            }
        },
        methods: {
            enviar(){
                console.log('Request doing - ', this.result.length);
                if(this.result.length > 0){
                    for(let i = 0; i <= 10; i++){
                        this.result.pop(i);
                    }
                }
                let xml, url, promise;
                let data = {
                    '1k': [],
                    '2k': []
                };
                // $http só existe por causa do VueResource
                //Executa a requisição http. Retornando uma promise
                //url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrazo?nCdServico=04014&sCepOrigem=03544100&sCepDestino=06730970';
                console.log(data['1k']);
                url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo?nCdEmpresa=&sDsSenha=&nCdServico=04014,04510,04065&sCepOrigem=03544100&sCepDestino=06730970&nVlPeso=1&nCdFormato=1&nVlComprimento=18&nVlAltura=9&nVlLargura=27&nVlDiametro=5&sCdMaoPropria=N&nVlValorDeclarado=0&sCdAvisoRecebimento=N';
                promise = this.$http
                    .get(url)
                    .then(res => {
                        xml = res.body;
                        x2j(xml, (err, result) => {

                            console.log(xml);
                            console.log('1 json ~> ', result.cResultado.Servicos[0].cServico[0].Codigo[0]);
                            console.log('n json ~> ', result.cResultado.Servicos[0].cServico.length);
                            for(let i = 0; i < result.cResultado.Servicos[0].cServico.length; i++) {
                                let cod = result.cResultado.Servicos[0].cServico[i].Codigo[0];
                                let prazE = result.cResultado.Servicos[0].cServico[i].PrazoEntrega[0];
                                let msgE = result.cResultado.Servicos[0].cServico[i].MsgErro[0];
                                let val = result.cResultado.Servicos[0].cServico[i].Valor[0];
                                console.log(JSON.stringify({'codigo': cod, 'prazoEntrega': prazE, 'msgE': msgE}));
                                data['1k'].push({'codigo': cod, 'prazoEntrega': prazE, 'valor': val, 'msgE': msgE})
                            }
                        });
                    }, err => {
                        console.log(err);
                        this.xmlRes = 'Deu alguma coisa errada'
                    });
                url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo?nCdEmpresa=&sDsSenha=&nCdServico=04014,04510&sCepOrigem=03544100&sCepDestino=06730970&nVlPeso=2&nCdFormato=1&nVlComprimento=18&nVlAltura=9&nVlLargura=13.5&nVlDiametro=5&sCdMaoPropria=N&nVlValorDeclarado=0&sCdAvisoRecebimento=N';
                promise = this.$http
                    .get(url)
                    .then(res => {
                        xml = res.body;
                        x2j(xml, (err, result) => {

                            console.log(xml);
                            console.log('1 json ~> ', result.cResultado.Servicos[0].cServico[0].Codigo[0]);
                            console.log('n json ~> ', result.cResultado.Servicos[0].cServico.length);
                            for(let i = 0; i < result.cResultado.Servicos[0].cServico.length; i++) {
                                let cod = result.cResultado.Servicos[0].cServico[i].Codigo[0];
                                let prazE = result.cResultado.Servicos[0].cServico[i].PrazoEntrega[0];
                                let msgE = result.cResultado.Servicos[0].cServico[i].MsgErro[0];
                                let val = result.cResultado.Servicos[0].cServico[i].Valor[0];
                                console.log(JSON.stringify({'codigo': cod, 'prazoEntrega': prazE, 'msgE': msgE}));
                                data['2k'].push({'codigo': cod, 'prazoEntrega': prazE, 'valor': val, 'msgE': msgE})
                            }
                        });
                    }, err => {
                        console.log(err);
                        this.xmlRes = 'Deu alguma coisa errada'
                    });
                this.result = data;
            }
        }
    }
</script>
<style scoped>

    .card-deck {
        margin-bottom: 15px;
    }
    .erro {
        color: darkred;
    }

    #pesquisar{
        margin-bottom: 30px;
    }


</style>