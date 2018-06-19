<template>
    <div class="row">
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
            <button type="submit" class="btn btn-default">Submit</button>
        </form>
        <p>
            <code>{{ xmlRes }}</code>
        </p>
        <ul v-for=" iData of data ">
            <li>{{ iData.codigo }}</li>
            <li>{{ iData.prazoEntrega }}</li>
            <li>{{ iData.msgE }}</li>
        </ul>
        <!--
        <h1 class="col-md-12">Informações: </h1>
        <div class="col-md-4" v-for="iTest of tests">
            <h2 class="text-center col-md-4">{{ iTest.sobrenome }}</h2>
            <p>{{ iTest.nome + ' ' + iTest.sobrenome}}</p>
            <p>{{ iTest.casa }}</p>
        </div>
        -->
        <form class="col-md-12" @submit.prevent="test()">
            <div class="form-group">
                <label for="cepO">Cep Origem</label>
                <input type="text" class="form-control" id="cepO" @input="st = $event.target.value" :input="st">
                <br>
                <input type="text" class="form-control" id="cepO" @input="nd = $event.target.value" :input="nd">
            </div>
            <button type="submit" class="btn btn-default">Submit</button>
            <p>
                <code>{{ st }}</code>
                <code>{{ nd }}</code>
            </p>
            <p>
                <code v-if="isNull == true" v-for="iResult of result">
                    {{ iResult.codigo }} <br>
                    {{ iResult.prazoEntrega }} <br>
                    {{ iResult.msgE }} <br>
                </code>
                <code v-else>
                   Loading...
                </code>
            </p>
        </form>
    </div>
</template>
<script>

    window.x2j = require('xml2js').parseString;

    export default {
        data(){
            return {
                st:'',
                nd:'',
                load: '',
                result: [],
                isNull: false,
                xmlRes: '',
                data: [],
                tests: [
                    {casa:'Azul', nome: 'Tadashi', sobrenome: 'Ono'},
                    {casa:'Verde', nome: 'Makoto', sobrenome: 'Ono'},
                    {casa:'Amarela', nome: 'Naomi', sobrenome: 'Ono'}
                ]
            }
        },
        methods: {
            enviar(){

                if(this.result.length > 0){
                    for(let i = 0; i <= this.result.length; i++){
                        this.result.pop(i);
                    }
                }
                let xml;
                // $http só existe por causa do VueResource
                //Executa a requisição http. Retornando uma promise
                let url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrazo?nCdServico=1&sCepOrigem=13123123&sCepDestino=12131312';
                let promise = this.$http
                    .get(url)
                    .then(res => {
                        xml = res.body;
                        console.log('xml ~> ', xml)
                        x2j(xml, (err, result) => {

                            console.log('json ~> ', result.cResultado.Servicos[0].cServico[0].Codigo[0]);
                            let cod = result.cResultado.Servicos[0].cServico[0].Codigo[0];
                            let prazE = result.cResultado.Servicos[0].cServico[0].PrazoEntrega[0];
                            let msgE = result.cResultado.Servicos[0].cServico[0].MsgErro[0];
                            console.log(JSON.stringify({'codigo': cod, 'prazoEntrega': prazE, 'msgE': msgE}));
                            this.result.push({'codigo': cod, 'prazoEntrega': prazE, 'msgE': msgE})


                        });
                    }, err => {
                        console.log(err);
                        this.xmlRes = 'Deu alguma coisa errada'
                    }); //caso de erro, o .then posso colocar 2 param.

            },
            test(){
                console.log('Loading...');
                if(this.result.length > 0){
                    for(let i = 0; i <= this.result.length; i++){
                        this.result.pop(i);
                    }
                }
                let url, promise;
                url = 'http://api.mathjs.org/v4/?expr=' + this.st + '*' + this.nd;
                promise = this.$http
                    .get(url)
                    .then(res => {
                        console.log('url ~> ' + url + '\npromise ~> ' + res.body);
                        this.result.push({'code':res.body});
                        console.log({'code':res.body});
                    }, err => console.log(err));
                url = 'http://api.mathjs.org/v4/?expr=9*8';
                promise = this.$http
                    .get(url)
                    .then(res => {
                        console.log('url ~> ' + url + '\npromise ~> ' + res.body);
                        this.result.push({'code':res.body});
                        console.log({'code':res.body});
                    }, err => console.log(err))
                console.log(this.result);

                console.log(this.result.length);
            }
        },
        beforeCreate(){
            console.log('beforeCreate');
        },
        created(){
            console.log('created')
        },
        beforeMount(){
            console.log('beforeMount')
        },
        mounted(){
            console.log('mounted')
        },
        beforeUpdate(){
            console.log('beforeUpdate')
        },
        updated(){
            console.log('created')
        }
    }
</script>
<style>

</style>