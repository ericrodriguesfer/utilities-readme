var readLineSync = require('readline-sync');
var getLine = () => readLineSync.question();

function clearCpf(cpf){
    let cpfVerificatonSequence = cpf.split(".");
    let cpfVerificatonDigit = cpfVerificatonSequence[2].split("-");
    let cpfResultAnalyze = cpfVerificatonSequence[0] + cpfVerificatonSequence[1] + cpfVerificatonDigit[0] + cpfVerificatonDigit[1];

    return cpfResultAnalyze;
}

function cpfCountDigit(cpf){
    return cpf.length;
}

function cpfVerifyDigits(cpf){
    let containerLetter = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    for(let i = 0; i < cpf.length; i++){
        for(let j = 0; j < containerLetter.length; j++){
            if(cpf[i] === containerLetter[j]){
                return false;
            }
        }
    }

    return true;
}

function cpfVerifyFirstDigit(cpf){
    let sumOperatorDigits = 0;
    let j = 10;

    for(let i = 0; i < (cpf.length - 2); i++){
        sumOperatorDigits += parseInt(cpf[i]) * j;
        j--;
    }
    
    return sumOperatorDigits;
}

function cpfVerifySecondDigit(cpf){
    let sumOperatorDigits = 0;
    let j = 11;

    for(let i = 0; i < (cpf.length - 1); i++){
        sumOperatorDigits += parseInt(cpf[i]) * j;
        j--;
    }

    return sumOperatorDigits;
}

var cpf = String(getLine());
var continerCpfGeneric = ["00000000000", "11111111111", "22222222222", "33333333333", "44444444444", "55555555555", "66666666666", "77777777777", "88888888888", "99999999999"];
var cpfGeneric = false;

while(cpf === ""){
    console.log("Digite um CPF para prosseguir!");
    cpf = String(getLine());
}

var cpfClean = clearCpf(cpf);

if(cpfCountDigit(cpfClean) != 11){
    console.log("Formato de CPF que foi repassado é incorreto! Não há 11 caracteres");
    
    while(cpfCountDigit(clearCpf(cpf)) != 11){
        console.log("Digite novamente um CPF para prosseguir!");
        cpf = String(getLine());
    }
}else{
    console.log("Formato do CPF que foi repassado é correto! Há os 11 caracteres");
}

cpfClean = cpf;

if(cpfVerifyDigits(cpfClean) != true){
    console.log("Um CPF só pode conter digitos númericos!");

    while(cpfVerifyDigits(cpf) != true){
        console.log("Digite novamente um CPF para prosseguir!");
        cpf = String(getLine());

        while(cpfCountDigit(clearCpf(cpf)) != 11){
            console.log("Digite novamente um CPF para prosseguir!");
            cpf = String(getLine());
        }

        cpf = clearCpf(cpf);
    }
}

cpfClean = clearCpf(cpf);

var fisrtDigit = (cpfVerifyFirstDigit(cpfClean) * 10) % 11;
var secondDigit = (cpfVerifySecondDigit(cpfClean) * 10) % 11;

for(let i = 0; i < continerCpfGeneric.length; i++){
    if(cpfClean === continerCpfGeneric[i]){
        cpfGeneric = true;
    }
}

if(cpfGeneric === false){
    if(fisrtDigit === parseInt(cpfClean[9])){
        if(secondDigit === parseInt(cpfClean[10])){
            console.log("O CPF repassado está válidado");
        }else{
            console.log("CPF repassado não está válidado!");
        }
    }else{
        console.log("CPF repassado não está válidado!");
    }
}else{
    console.log("CPF repassado não está válidado!");
}