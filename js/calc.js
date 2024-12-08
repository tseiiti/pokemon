const d1 = qs('#display_1')
const d2 = qs('#display_2')
const ops = ['/', '*', '-', '+']
var exp = ''
var num = ''
var ope = ''
var mr = 0

const operando = () => {
  return ops.some(o => exp.includes(o))
}

const operacao = (val) => {
  if ('/*-+'.includes(val) && !operando() && num != '') {
    exp = num + val
    num = ''
    ope = val
  }
}

const ponto = (val) => {
  if (val == '.') {
    if (num == '') val = '0.'
    if (!num.includes('.')) {
      num += val
      exp += val
    }
  }
}

const numeros = (val) => {
  if (val >= 0 && val <= 9) {
    num += val
    exp += val
  }
}

const apagar = (val) => {
  if (val == '<') {
    if (exp != '')
      exp = exp.substr(0, exp.length - 1)
    if (num != '')
      num = num.substr(0, num.length - 1)
    if (num == '' && !operando())
      num = exp
    if (!operando()) ope = ''
  }
}

const inverte = val => {
  if (val == '+-' && num != '') {
    if (num.includes('-'))
      num.replace('-', '')
    else
      num = '-' + num
    
    let ns = exp.split(/[\/\*\-\+]/)
    let i = ns.length - 1
    if (ns[i].length > 1) {
      // if (ns[i].includes('-'))
      //   ns[i].replace('-', '')
      // else
      //   ns[i] = '-' + ns[i]
      ns[i] = num
      exp = ns.join(ope)
      console.log(exp)
    }
  }
}

const converte = n => {
  if (n.includes('.')) return parseFloat(n)
  return parseInt(n)
}

const resultado = (val) => {
  if (val == '=') {
    let ns = exp.split(/[\/\*\-\+]/)
    if (ns.length > 1 && ns[1] != '') {
      let n1 = converte(ns[0])
      let n2 = converte(ns[1])
      if (exp.includes('/')) num = n1 / n2
      if (exp.includes('*')) num = n1 * n2
      if (exp.includes('-')) num = n1 - n2
      if (exp.includes('+')) num = n1 + n2
      exp += val
      num = num.toString()
    }
  }
}

const memoria = (val) => {
  if (num != '') {
    if (val == 'm+') mr += converte(num)
    if (val == 'm-') mr -= converte(num)
  }
  if (val == 'mr') num = mr.toString()
}

const limpar = (val) => {
  if (val == 'ac') {
    exp = ''
    num = ''
    ope = ''
  }
}

const geraExpressao = val => {
  if (!exp.includes('=')) {
    operacao(val)
    ponto(val)
    numeros(val)
    apagar(val)
    inverte(val)
    resultado(val)
  }
  memoria(val)
  limpar(val)

  d1.innerText = exp
  d2.innerText = num
}

afterLoad(function() {
  
});
