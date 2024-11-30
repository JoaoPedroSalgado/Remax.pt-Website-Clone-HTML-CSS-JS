//Variavesi globais
var MultiArea = 5  //Multiplicador → a barra tá de 1 a 100, então regra de 3 simples
var MultiIdade = 1  //Multiplicador → a barra tá de 1 a 100, então regra de 3 simples
var BackSliderColor = '#d3d3d3' //Cor da fundo da barra slider
var BackSliderColorUse = '#2196F3' //Cor de fundo da barra slider quando o ponteiro passou por lá
var Cidades = ['Coimbra', 'Lisboa', 'Porto', 'Leiria', 'Braga', 'Faro'] //Lista de nomes de cidades para as Zonas

//SwitchDisplay → Funçao para mostra e remover certas áreas
function SwitchDisplay(IdTarget) {
    var Target = document.getElementById(IdTarget)

    if (Target.parentElement.classList.contains("selected")){ //Display: none → desaparece
        if (IdTarget === 'content'){
            document.getElementById(IdTarget).parentElement.classList.remove("selected")
        }

        document.getElementById(IdTarget).style.display = "none";
        return

    } else { //Diplsa: block → aparece
        console.log('esconder')
        if (IdTarget === 'content'){
            document.getElementById(IdTarget).parentElement.classList.add("selected")
        }

        document.getElementById(IdTarget).style.display = "block";
        return
    }
}

 //Conversor de numero para numeros com pontos mil em mil
function NumberConvert(num) {
    var money = num.toLocaleString('de-DE');
    return money
}

 //Funçao apar escolher nome para a zona
function SelectCity() {
    var zona = Cidades[Math.floor(Math.random() * Cidades.length)];
    return zona
}
 
//Gerador de números aleatoriós
function getRandom(min, max){
    return Math.random() * (max - min) + min;
}

//Áera do MainBar (Fase de Testes)
/* document.addEventListener("click", function(){
    if(switchPower == 0){
        document.getElementById('content').parentElement.classList.remove("selected")
    }
}); */

//Área do botão "Ver mais" do início
mybutton = document.getElementById("DownButton");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.visibility = "hide";
    mybutton.style.opacity = "0";
    mybutton.style.cursor = "default"
    mybutton.disabled = true;
} else {
    mybutton.style.visibility = "visible";
    mybutton.style.opacity = "1";
    mybutton.style.cursor = "pointer"
    mybutton.disabled = false;
}
}
//Área dos botões "Preview" e "Next"

//Área do "imovel-search"
var SliderArea = document.getElementById("InputArea");
var SliderIdade = document.getElementById("InputIdade");

var DisplayArea = document.getElementById("DisplayArea");
var DisplayIdade = document.getElementById("DisplayIdade");

DisplayArea.innerHTML = SliderArea.value * MultiArea;
DisplayIdade.innerHTML = Math.floor(SliderIdade.value * MultiIdade);

// Atualiza a tempo real valor quando a barra mexe
SliderArea.oninput = function() {
    DisplayArea.innerHTML = this.value * MultiArea;
} 

SliderIdade.oninput = function() {
    DisplayIdade.innerHTML = Math.floor(this.value * MultiIdade);
}

//A cor da barra muda perante a posiçaõ do ponteiro
SliderArea.addEventListener("mousemove", function(){
    var x = SliderArea.value;
    var color = `linear-gradient(90deg, ${BackSliderColorUse} ${x}%, ${BackSliderColor} ${x}%)`;
    SliderArea.style.background = color;
})

SliderIdade.addEventListener("mousemove", function(){
    var x = SliderIdade.value * 5;
    var color = `linear-gradient(90deg, ${BackSliderColorUse} ${x}%, ${BackSliderColor} ${x}%)`;
    SliderIdade.style.background = color;
})


function SubmeterValores() {
    var RemoverMargin = document.getElementById("imovel-search");
    RemoverMargin.style.marginBottom = 0;
    
    // Apesar de não ser usado, receber os seguintes valores:

    var ValorArea = SliderArea.value * MultiArea;
    
    var BuscarTipologia = document.getElementById("SeletionarT");

    var Tipologia = BuscarTipologia.value
    var SeletionarT = document.getElementById("SeletionarT");

    // Valores recebidos usados

    var ValorIdade = Math.floor(SliderIdade.value * MultiIdade);

    /* var Garagem = document.getElementById("GaragemCheck").value;
    var Transportes = document.getElementById("TransportesCheck").value; */

    var Garagem = document.querySelector("#GaragemCheck")
    var Transportes = document.querySelector("#TransportesCheck")

    var PrimeiroDesconto;
    var SegundoDesconto;
    var TerceiroDesconto;

    if (ValorIdade > 0 && ValorIdade <= 5) {
        PrimeiroDesconto = 1;
    } else  if (ValorIdade > 5 && ValorIdade <= 10) {
        PrimeiroDesconto = 0.95;
    } else  if (ValorIdade > 10) {
        PrimeiroDesconto = 0.90;
    }

    if (Garagem.checked) {
        SegundoDesconto = 1;
    } else {
        SegundoDesconto = 0.95;
    }

    if (Transportes.checked) {
        TerceiroDesconto = 1;
    } else {
        TerceiroDesconto = 0.95;
    }

    // Formula Final
    var MultZona1 = ValorArea * 1200;
    var MultZona2 = ValorArea * 2000;
    var MultZona3 = ValorArea * 2500;

    // Contas Zona 1
    var Zona1 = document.getElementById("zona1nome");
    var Zona1ContPrimDesc = MultZona1 * PrimeiroDesconto;
    var Zona1ContSegDesc = Zona1ContPrimDesc * SegundoDesconto;
    var Zona1ContTerDesc = Zona1ContSegDesc * TerceiroDesconto;
    var ValorFinalZona1 = Zona1ContTerDesc;
    var DisplayFinalZona1 = document.getElementById("zona1Output");
    var DisplayMoneyZona1 = document.getElementById("zona1InfoMoney");
    var DisplayAreaZona1 = document.getElementById("zona1InfoArea");


    // Contas Zona 2
    var Zona2 = document.getElementById("zona2nome");
    var Zona2ContPrimDesc = MultZona2 * PrimeiroDesconto;
    var Zona2ContSegDesc = Zona2ContPrimDesc * SegundoDesconto;
    var Zona2ContTerDesc = Zona2ContSegDesc * TerceiroDesconto;
    var ValorFinalZona2 = Zona2ContTerDesc;
    var DisplayFinalZona2 = document.getElementById("zona2Output");
    var DisplayMoneyZona2 = document.getElementById("zona2InfoMoney");
    var DisplayAreaZona2 = document.getElementById("zona2InfoArea");


    // Contas Zona 3
    var Zona3 = document.getElementById("zona3nome");
    var Zona3ContPrimDesc = MultZona3 * PrimeiroDesconto;
    var Zona3ContSegDesc = Zona3ContPrimDesc * SegundoDesconto;
    var Zona3ContTerDesc = Zona3ContSegDesc * TerceiroDesconto;
    var ValorFinalZona3 = Zona3ContTerDesc;
    var DisplayFinalZona3 = document.getElementById("zona3Output");
    var DisplayMoneyZona3 = document.getElementById("zona3InfoMoney");
    var DisplayAreaZona3 = document.getElementById("zona3InfoArea");

    Zona1.innerHTML = SelectCity();
    Zona2.innerHTML = SelectCity();
    Zona3.innerHTML = SelectCity();

    DisplayFinalZona1.innerHTML = NumberConvert(ValorFinalZona1);
    DisplayFinalZona2.innerHTML = NumberConvert(ValorFinalZona2);
    DisplayFinalZona3.innerHTML = NumberConvert(ValorFinalZona3);

    DisplayMoneyZona1.innerHTML = NumberConvert(ValorFinalZona1/ValorArea);
    DisplayMoneyZona2.innerHTML = NumberConvert(ValorFinalZona2/ValorArea);
    DisplayMoneyZona3.innerHTML = NumberConvert(ValorFinalZona3/ValorArea);

    DisplayAreaZona1.innerHTML = NumberConvert(ValorArea);
    DisplayAreaZona2.innerHTML = NumberConvert(ValorArea);
    DisplayAreaZona3.innerHTML = NumberConvert(ValorArea);
}

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}


function BuscarValoresSpreads(SpreadEscolhido,MontanteFinanciado,EntradaInicial,PrazoPagar) {
    var TaxaFinanciadoComSpread = Math.round(((SpreadEscolhido + 0.5)/100) * MontanteFinanciado);
    var MontanteFinanciadoComSpread = parseFloat(TaxaFinanciadoComSpread) + parseFloat(MontanteFinanciado);
    var ValorDoEmprestimo = Math.round(MontanteFinanciado - EntradaInicial);
    var ValorDoEmprestimoComJuros = MontanteFinanciadoComSpread - ValorDoEmprestimo;
    var ContaMeses = Math.round(PrazoPagar * 12);
    var ValorMensal = ValorDoEmprestimoComJuros / ContaMeses;

    return {ValorMensal, ValorDoEmprestimo}
}


//Área do "cenarios"
function SubmeterSegundosValores() {
    
    var PodeMostrar = AparecerDesaparecer();
   
    //Banco Santinho
    var MontanteSantinho = document.getElementById("BC_Total")
    var EmprestimoSantinho = document.getElementById("BC_Emprestimo")
    var TaxaSantinho = document.getElementById("BC_Taxa")
    var SpreadSantinho = document.getElementById("BC_Spread")
    var EntradaSantinho = document.getElementById("BC_Entrada")
    var PrestacaoSantinho = document.getElementById("BC_Prestacao")

    //Crédito Industrial
    var MontanteCI = document.getElementById("CI_Total")
    var EmprestimoCI = document.getElementById("CI_Emprestimo")
    var TaxaCI = document.getElementById("CI_Taxa")
    var SpreadCI = document.getElementById("CI_Spread")
    var EntradaCI = document.getElementById("CI_Entrada")
    var PrestacaoCI = document.getElementById("CI_Prestacao")

    //Bancalhau
    var MontanteBancalhau = document.getElementById("Banc_Total")
    var EmprestimoBancalhau = document.getElementById("Banc_Emprestimo")
    var TaxaBancalhau = document.getElementById("Banc_Taxa")
    var SpreadBancalhau = document.getElementById("Banc_Spread")
    var EntradaBancalhau = document.getElementById("Banc_Entrada")
    var PrestacaoBancalhau = document.getElementById("Banc_Prestacao")
    
    if (PodeMostrar) {

    var MostrarCreditos = document.getElementById("creditos")
    MostrarCreditos.style.display = "block";

    // Buscar Entrada Inicial
    var BuscarEntradaInicial = document.getElementById("Entrada");
    var EntradaInicial = BuscarEntradaInicial.value
    // Montante Financiado
    var BuscarMontanteFinanciado = document.getElementById("Montante");
    var MontanteFinanciado = BuscarMontanteFinanciado.value
    // Prazo a pagar
    var BuscarPrazo = document.getElementById("Prazo");
    var PrazoPagar = BuscarPrazo.value
    var Spread1 = Math.round((getRandom(1,5) + Number.EPSILON) * 100) / 100;
    var Spread2 = Math.round((getRandom(1,5) + Number.EPSILON) * 100) / 100;
    var Spread3 = Math.round((getRandom(1,5) + Number.EPSILON) * 100) / 100;

    var CalcularSpread1 = BuscarValoresSpreads(Spread1,MontanteFinanciado,EntradaInicial,PrazoPagar);
    var CalcularSpread2 = BuscarValoresSpreads(Spread2,MontanteFinanciado,EntradaInicial,PrazoPagar);
    var CalcularSpread3 = BuscarValoresSpreads(Spread3,MontanteFinanciado,EntradaInicial,PrazoPagar);


    MontanteSantinho.innerHTML = MontanteFinanciado
    MontanteCI.innerHTML = MontanteFinanciado
    MontanteBancalhau.innerHTML = MontanteFinanciado

    EmprestimoSantinho.innerHTML = round(CalcularSpread1.ValorDoEmprestimo, 2);
    EmprestimoCI.innerHTML = round(CalcularSpread2.ValorDoEmprestimo, 2);
    EmprestimoBancalhau.innerHTML = round(CalcularSpread3.ValorDoEmprestimo, 2);

    TaxaSantinho.innerHTML = round(Spread1 + 0.5, 2);
    TaxaCI.innerHTML = round(Spread2 + 0.5, 2);
    TaxaBancalhau.innerHTML = round(Spread3 + 0.5, 2);

    SpreadSantinho.innerHTML = Spread1
    SpreadCI.innerHTML = Spread2
    SpreadBancalhau.innerHTML = Spread3

    EntradaSantinho.innerHTML = EntradaInicial
    EntradaCI.innerHTML = EntradaInicial
    EntradaBancalhau.innerHTML = EntradaInicial

    PrestacaoSantinho.innerHTML = round(CalcularSpread1.ValorMensal, 2);
    PrestacaoCI.innerHTML = round(CalcularSpread2.ValorMensal, 2);
    PrestacaoBancalhau.innerHTML = round(CalcularSpread3.ValorMensal, 2);
    } else {

        var MostrarCreditos = document.getElementById("creditos")
        MostrarCreditos.style.display = "none";

        MontanteSantinho.innerHTML = ''
        MontanteCI.innerHTML = ''
        MontanteBancalhau.innerHTML = ''
    
        EmprestimoSantinho.innerHTML = ''
        EmprestimoCI.innerHTML = ''
        EmprestimoBancalhau.innerHTML = ''
    
        TaxaSantinho.innerHTML = ''
        TaxaCI.innerHTML = ''
        TaxaBancalhau.innerHTML = ''
    
        SpreadSantinho.innerHTML = ''
        SpreadCI.innerHTML = ''
        SpreadBancalhau.innerHTML = ''
    
        EntradaSantinho.innerHTML = ''
        EntradaCI.innerHTML = ''
        EntradaBancalhau.innerHTML = ''
    
        PrestacaoSantinho.innerHTML = ''
        PrestacaoCI.innerHTML = ''
        PrestacaoBancalhau.innerHTML = ''
    }
}

var Mostrar = false;
function AparecerDesaparecer() {
    if (Mostrar) {
        Mostrar = false
        return false
    } else {
        Mostrar = true
        return true
    }
}

// Funções mudar cor clicar

function MudarCorBotoes(Tipo) {
    var ButaoComprar = document.getElementById("ButaoComprar");
    var ButaoArrendar = document.getElementById("ButaoArrendar");

    if (Tipo) {

        ButaoComprar.style.backgroundColor = '#fff';
        ButaoComprar.style.fontWeight = 700;

        ButaoArrendar.style.backgroundColor = 'rgb(238, 238, 238)';
        ButaoArrendar.style.fontWeight = 10;

    } else {

        ButaoArrendar.style.backgroundColor = '#fff';
        ButaoArrendar.style.fontWeight = 700;

        ButaoComprar.style.backgroundColor = 'rgb(238, 238, 238)';
        ButaoComprar.style.fontWeight = 10;

    }

}

// Clicar Coração

function ClicarCoracao() {

    var Coracao = document.getElementById("Heart");
    Coracao.style.backgroundColor = '#ffd2d5';
    
}