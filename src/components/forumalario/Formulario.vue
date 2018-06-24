<template>
    <b-row>
        <b-col class="col-12">
            <b-form @submit.prevent="enviar()">
                <label class="text-uppercase"><strong>CEP Origem:</strong></label>
                    <b-form-select v-model="selected" :options="options"class="mb-3" />
                    <p class="align-middle">Selecionado: <span class="align-middle"><strong>{{ selected }}</strong></span></p>
                </b-form-group>

                    <b-form-group id="exampleInputGroup1"
                                  label="<strong class='text-uppercase'>CEP Destino:</strong>"
                                  label-for="exampleInput1">
                        <b-input
                                 type="text"
                                 autocomplete="off"
                                 v-on:input.native="cepD = $event.target.value"
                                 v-bind:input.native="cepD"
                                 v-mask="'#####-###'"
                                 autofocus>
                        </b-input>
                        <p class="align-middle">CEP Destino: <span class="align-middle"><strong>{{ cepD }}</strong></span></p>
                </b-form-group>
                <b-btn v-b-modal.modal1 type="submit" class="btn btn-default" id="pesquisar">Calcular</b-btn>
            </b-form>
        </b-col>
        <!--
        <h1 class="col-md-12">Informações: </h1>
        <div class="col-md-4" v-for="iTest of tests">
            <h2 class="text-center col-md-4">{{ iTest.sobrenome }}</h2>
            <p>{{ iTest.nome + ' ' + iTest.sobrenome}}</p>
            <p>{{ iTest.casa }}</p>
        </div>
        -->
        <b-modal size="lg" ref="modal" id="modal1" hide-footer title="Resultado">

            <!--
            <b-col sm="12">
                <h1 class="text-center" >1KG - Caixa 2</h1>
                <b-col cols="12" v-for="iResult of result[0]">

                    <b-card-group deck>
                        <b-card class="margB" :title="iResult.codigo == 4014 ? 'Sedex' : 'PAC'">
                            <div class="card-text">
                                <div v-if="iResult.msgE == ''">
                                    <p><b>Prazo: </b><span class="align-middle "> {{ iResult.prazoEntrega }}</span> dias úteis</p>
                                    <p><b>Valor:</b> <span class="align-middle">R${{ iResult.valor }}</span></p>
                                </div>
                                <div v-else>
                                    <p class="erro">Erro: {{ iResult.msgE }}</p>
                                </div>
                            </div>
                        </b-card>
                    </b-card-group>
                </b-col>
            </b-col>
            -->
            <div role="tablist" >
                <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                        <b-btn block href="#" v-b-toggle.accordion1 variant="info">1KG - Caixa 2</b-btn>
                    </b-card-header>
                    <b-collapse id="accordion1"  accordion="my-accordion" role="tabpanel">
                        <b-card-body class="cBody">
                            <b-col class="cFor" v-for="iResult of result[0]">
                                <b-card-group class="cGroup" deck>
                                    <b-card class="margB cCard" :title="iResult.codigo == 4014 ? 'Sedex' : 'PAC'">
                                        <div class="card-text">
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
                <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                        <b-btn block href="#" v-b-toggle.accordion2 variant="info">2KG - Caixa 2</b-btn>
                    </b-card-header>
                    <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
                        <b-card-body class="cBody">
                            <b-col class="cFor" v-for="iResult of result[1]">
                                <b-card-group class="cGroup" deck>
                                    <b-card class="margB cCard" :title="iResult.codigo == 4014 ? 'Sedex' : 'PAC'">
                                        <div class="card-text">
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
            </div>
            <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-btn>
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
                cepO: '',
                cepD: '',
                selected: '03544-100',
                options: [
                    { value: '03544-100', text: 'CEP padrão' },
                    { value: '06730-970', text: 'Vargem Grande' },
                    { value: '04726-220', text: 'AP Makoto' },
                    { value: '06726-290', text: 'Sitio'}
                ]
            }
        },
        methods: {

            hideModal () {
                this.$refs.modal.hide()
            },
            enviar(){
                if(this.result != null){

                }
                console.log('CEP DESTINO ----> ', this.cepD);
                console.log('CEP ORIGEM  ----> ', this.selected);
                //console.log('Request doing - ', this.result.length);
                if(this.result.length > 0){
                    for(let i = 0; i <= 10; i++){
                        this.result.pop(i);
                    }
                }
                let xml, url, promise;
                let data = {
                    0: [],
                    1: []
                };
                // $http só existe por causa do VueResource
                //Executa a requisição http. Retornando uma promise
                //url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrazo?nCdServico=04014&sCepOrigem=03544100&sCepDestino=06730970';
                //console.log(data['1k']);
                url = 'https://cors-anywhere.herokuapp.com/http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo?nCdEmpresa=&sDsSenha=&nCdServico=04014,04510&sCepOrigem='+ this.selected + '&sCepDestino='+ this.cepD + '&nVlPeso=1&nCdFormato=1&nVlComprimento=18&nVlAltura=9&nVlLargura=27&nVlDiametro=5&sCdMaoPropria=N&nVlValorDeclarado=0&sCdAvisoRecebimento=N';
                promise = this.$http
                    .get(url)
                    .then(res => {
                        xml = res.body;
                        x2j(xml, (err, result) => {

                            //console.log(xml);
                            //console.log('1 json ~> ', result.cResultado.Servicos[0].cServico[0].Codigo[0]);
                            //console.log('n json ~> ', result.cResultado.Servicos[0].cServico.length);
                            for(let i = 0; i < result.cResultado.Servicos[0].cServico.length; i++) {
                                let cod = result.cResultado.Servicos[0].cServico[i].Codigo[0];
                                let prazE = result.cResultado.Servicos[0].cServico[i].PrazoEntrega[0];
                                let msgE = result.cResultado.Servicos[0].cServico[i].MsgErro[0];
                                let val = result.cResultado.Servicos[0].cServico[i].Valor[0];
                                val = (parseFloat(val.replace(',','.')) + 5.80).toFixed(2);

                                //console.log(JSON.stringify({'codigo': cod, 'prazoEntrega': prazE, 'msgE': msgE}));
                                data[0].push({'codigo': cod, 'prazoEntrega': prazE, 'valor': val, 'msgE': msgE})
                            }
                        });
                    }, err => {
                        console.log(err);
                        this.xmlRes = 'Deu alguma coisa errada'
                    });
                url = 'https://cors-anywhere.herokuapp.com/http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo?nCdEmpresa=&sDsSenha=&nCdServico=04014,04510&sCepOrigem='+ this.selected + '&sCepDestino=' + this.cepD + '&nVlPeso=2&nCdFormato=1&nVlComprimento=18&nVlAltura=9&nVlLargura=13.5&nVlDiametro=5&sCdMaoPropria=N&nVlValorDeclarado=0&sCdAvisoRecebimento=N';
                promise = this.$http
                    .get(url, "Access-Control-Allow-Origin: *")
                    .then(res => {
                        xml = res.body;
                        x2j(xml, (err, result) => {

                            //console.log(xml);
                            // console.log('1 json ~> ', result.cResultado.Servicos[0].cServico[0].Codigo[0]);
                            // console.log('n json ~> ', result.cResultado.Servicos[0].cServico.length);
                            for(let i = 0; i < result.cResultado.Servicos[0].cServico.length; i++) {
                                let cod = result.cResultado.Servicos[0].cServico[i].Codigo[0];
                                let prazE = result.cResultado.Servicos[0].cServico[i].PrazoEntrega[0];
                                let msgE = result.cResultado.Servicos[0].cServico[i].MsgErro[0];
                                let val = result.cResultado.Servicos[0].cServico[i].Valor[0];
                                val = (parseFloat(val.replace(',','.')) + 5.80).toFixed(2);
                                // console.log(JSON.stringify({'codigo': cod, 'prazoEntrega': prazE, 'msgE': msgE}));
                                data[1].push({'codigo': cod, 'prazoEntrega': prazE, 'valor': val, 'msgE': msgE})
                            }
                        });
                    }, err => {
                        // console.log(err);
                        this.xmlRes = 'Deu alguma coisa errada'
                    });
                this.result = data;
            }
        }
    }
</script>
<style scoped>


    .erro {
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
    }
    .cFor {
        padding: 0;
    }
</style>