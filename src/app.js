
class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
    validarDados(){
        for(let i in this){
            if(this[i] === undefined || this[i] === "" || this[i] === null){
                return false
            }
         
        }
        return true
    }
}

class Bd {
    constructor(){
        let id = localStorage.getItem('id')
        if(id === null){
            localStorage.setItem('id', 0)
        }
    }
    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId)+ 1
    }
    salvar(d){
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)
    }
    
    carregar(){
        let despesas = Array()
        let id = localStorage.getItem('id')
        for(let i = 1; i <= id; i++){
            let despesa = JSON.parse(localStorage.getItem(i))
            if(despesa === null){
                continue
            }
            despesas.push(despesa)
        }
        return despesas
    }
    
}

let bd = new Bd()
function cadastrarDespesa(){
    
    let ano = document.querySelector('#ano')
    let mes = document.querySelector('#mes')
    let dia = document.querySelector('#dia')
    let tipo = document.querySelector('#tipo')
    let descricao = document.querySelector('#descricao')
    let valor = document.querySelector('#valor')
    
    let despesa = new  Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )
    
    if(despesa.validarDados()){
        let divTituloModal = document.querySelector('#modalDivTitulo')
        let tituloModal = document.querySelector('#modalMensagem')
        let modalDescricao = document.querySelector('.modal-body')
        let btnModal = document.querySelector('#btn-modal')
    
        divTituloModal.classList.replace('text-danger', 'text-success' )
        tituloModal.innerHTML = "Gravação efetuada com sucesso"
        modalDescricao.innerHTML = "Um novo registro foi inserido :)"
        btnModal.classList.replace('btn-danger', 'btn-success' )
        btnModal.innerHTML = "Voltar"
        bd.salvar(despesa)
        $('#modalRegistraDespesa').modal('show')
        ano.value = ""
        mes.value = ""
        dia.value = ""
        tipo.value = "Tipo"
        descricao.value = ""
        valor.value = ""
    }
    else{
        $('#modalRegistraDespesa').modal('show')
    }
}

function carregarDespesa(){
    let despesas = Array()
    despesas = bd.carregar()
    console.log(despesas)
    
    let listaDespesas = document.querySelector('#listaDespesas')
    despesas.forEach(function(d){
    let linha = listaDespesas.insertRow()    
    
    linha.insertCell(0).innerHTML = `${d.dia} / ${d.mes} / ${d.ano}`

    switch(d.tipo){
        case '1': d.tipo = 'Alimentação'
            break
        case '2': d.tipo = 'Educação'
            break
        case '3': d.tipo = 'Lazer'
            break
        case '4': d.tipo = 'Saúde'
            break
        case '5': d.tipo = 'Transporte'
            break
    }
    linha.insertCell(1).innerHTML = d.tipo
    linha.insertCell(2).innerHTML = d.descricao
    linha.insertCell(3).innerHTML = d.valor
    })}
    function pesquisarDespesa(){
        let ano = document.querySelector('#ano').value
        let mes = document.querySelector('#mes').value
        let dia = document.querySelector('#dia').value
        let tipo = document.querySelector('#tipo').value
        let descricao = document.querySelector('#descricao').value
        let valor = document.querySelector('#valor').value

        let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)
    }