<template>
    <b-row>
        <b-col class="col-12">
            <b-form @submit.prevent="enviar()">
                    <label class="text-uppercase"><strong>CEP Origem:</strong></label>
                    <b-form-select v-model="selected" :options="options"class="mb-3"  />
                    <p class="align-middle">Selecionado: <span class="align-middle"><strong>{{ selected }}</strong></span></p>

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
                </b-form-group>
                <p class="align-middle">CEP Destino: <span class="align-middle"><strong>{{ cepD }}</strong></span></p>
                <b-btn v-b-modal="myModal" type="submit" class="btn btn-default col-12" id="pesquisar">Calcular</b-btn>
            </b-form>
        </b-col>
        <meu-modal :hasData="hasData" :idModal="myModal" :result="result" :isOk="isOk"></meu-modal>
    </b-row>
</template>
<script>

    import Modal from '../modal/Modal.vue';

    window.x2j = require('xml2js').parseString;


    export default {
        components:{
            'meu-modal': Modal
        },
        data(){
            return {
                myModal: 'modal',
                result: [],
                xmlRes: '',
                cepO: '',
                cepD: '',
                isOk: false,
                hasData: false,
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
            enviar(){
                this.isOk = true;
                this.hasData = false;
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
                    1: [],
                    2: []
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
                        data[2].push({'codigo': '-999', 'msg':'Não foi possivel acesssar'});
                        console.log('Deu alguma coisa errada 1');
                    });
                url = 'https://cors-anywhere.herokuapp.com/http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo?nCdEmpresa=&sDsSenha=&nCdServico=04014,04510&sCepOrigem='+ this.selected + '&sCepDestino=' + this.cepD + '&nVlPeso=2&nCdFormato=1&nVlComprimento=18&nVlAltura=9&nVlLargura=13.5&nVlDiametro=5&sCdMaoPropria=N&nVlValorDeclarado=0&sCdAvisoRecebimento=N';
                promise = this.$http
                    .get(url)
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
                            this.hasData = true;
                            this.isOk = false;
                        });
                    }, err => {
                        // console.log(err);
                        console.log('Deu alguma coisa errada 2');
                        data[2].push({'codigo': '-999', 'msg': 'Não foi possivel acesssar'});
                        this.hasData = true;
                        this.isOk = false;
                    });
                this.result = data;
            }
        }
    }
</script>
<style scoped>


    .erro, .error1 {
        color: darkred;
    }

    #pesquisar{
        margin-bottom: 30px;
    }
    span{
        font-size:2em;
    }

</style>