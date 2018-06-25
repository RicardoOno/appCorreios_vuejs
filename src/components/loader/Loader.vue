<template>
    <div id="loader">
    <b-row align-v="center" align-h="center" class="lds-css ng-scope wa">
        <div class="lds-facebook" id="a">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </b-row>

    </div>
</template>
<script>
    export default {
        data(){
            return{

            }
        }
    }
</script>
<style scoped>

    body {
        background-color: #000000;
    }
    #a {
        width: 200px;
    }
    @keyframes lds-facebook_1 {
        0% {
            top: 20px;
            height: 160px;
        }
        50% {
            top: 50px;
            height: 100px;
        }
        100% {
            top: 50px;
            height: 100px;
        }
    }
    @-webkit-keyframes lds-facebook_1 {
        0% {
            top: 20px;
            height: 160px;
        }
        50% {
            top: 50px;
            height: 100px;
        }
        100% {
            top: 50px;
            height: 100px;
        }
    }
    @keyframes lds-facebook_2 {
        0% {
            top: 27.499999999999986px;
            height: 145.00000000000003px;
        }
        50% {
            top: 50px;
            height: 100px;
        }
        100% {
            top: 50px;
            height: 100px;
        }
    }
    @-webkit-keyframes lds-facebook_2 {
        0% {
            top: 27.499999999999986px;
            height: 145.00000000000003px;
        }
        50% {
            top: 50px;
            height: 100px;
        }
        100% {
            top: 50px;
            height: 100px;
        }
    }
    @keyframes lds-facebook_3 {
        0% {
            top: 35px;
            height: 130px;
        }
        50% {
            top: 50px;
            height: 100px;
        }
        100% {
            top: 50px;
            height: 100px;
        }
    }
    @-webkit-keyframes lds-facebook_3 {
        0% {
            top: 35px;
            height: 130px;
        }
        50% {
            top: 50px;
            height: 100px;
        }
        100% {
            top: 50px;
            height: 100px;
        }
    }
    .lds-facebook {
        position: relative;
    }
    .lds-facebook div {
        position: absolute;
        width: 30px;
    }
    .lds-facebook div:nth-child(1) {
        left: 35px;
        background: #5c607e;
        -webkit-animation: lds-facebook_1 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
        animation: lds-facebook_1 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
        -webkit-animation-delay: -0.2s;
        animation-delay: -0.2s;
    }
    .lds-facebook div:nth-child(2) {
        left: 85px;
        background: #1d2031;
        -webkit-animation: lds-facebook_2 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
        animation: lds-facebook_2 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
        -webkit-animation-delay: -0.1s;
        animation-delay: -0.1s;
    }
    .lds-facebook div:nth-child(3) {
        left: 135px;
        background: #0c0b0d;
        -webkit-animation: lds-facebook_3 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
        animation: lds-facebook_3 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    }
    .lds-facebook {
        height: 200px !important;
        -webkit-transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
        transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
    }
</style>