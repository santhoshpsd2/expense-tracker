const transactions = document.querySelector('.transactions');
const form1 = document.querySelector('.form1');
const balancetotal = document.querySelector('.total');
const incometotal = document.querySelector('.income-total');
const expensetotal = document.querySelector('.expense-total');
const updatediv = document.querySelector('.update-div');
const form2 = document.querySelector('.form2');
const innerdiv = document.querySelector('.inner-div');
let data = [
    // {
    //     name:'cash',
    //     amount:1000
    // },
    // {
    //     name:'petrol',
    //     amount:-100
    // },
    // {
    //     name:'snacks',
    //     amount:-100
    // },
    // {
    //     name:'food',
    //     amount:-100
    // }
]

let updateindex;

function init(){
    if(localStorage.getItem('items')){
        data =JSON.parse(localStorage.getItem('items'));
    }
    updatetrans();
}

function randomnum(){
  return Math.floor(Math.random()*10000); 
}

function addtostorage(){
    localStorage.setItem('items',JSON.stringify(data))
}



function updatetrans(){  
    let balance = 0;
    let income = 0;
    let expense = 0
    transactions.innerHTML = ''
    data.forEach((tran,index)=>{
        const transact = document.createElement('div');
        transact.setAttribute('index',tran.id);
        transact.innerHTML = `
        <p class="name">${tran.name}</p>
        <p class="amount">${tran.amount}</p>
        <button class="close">X</button>
        `;
        balance = balance + tran.amount;
        if(tran.amount > 0){
            transact.className = 'transact green';
            income = income + tran.amount;
        }else{
            transact.className = 'transact red';
            expense = expense + (tran.amount * -1);
        }
        transactions.appendChild(transact);
    })

    balancetotal.innerText = `$${balance}.00`;
    incometotal.innerText = `$${income}.00`;
    expensetotal.innerText = `$${expense}.00`;
  
   let closebtn = document.querySelectorAll('.close');
    closebtn.forEach(btn => {
        btn.addEventListener('click', ()=>{
            let id = btn.parentElement.getAttribute('index');
            let index = data.findIndex((dat)=> dat.id == id);
            data.splice(index,1);
            addtostorage();
            updatetrans();
        })
    })

    let transactall = document.querySelectorAll('.transact');
    transactall.forEach(trans => {
        trans.addEventListener('click',(e)=>{
            if(e.target.className != 'close'){
                updatediv.style.display = 'block';
                let id = trans.getAttribute('index');
                updateindex = data.findIndex((dat)=> dat.id == id);
                form2.formamount.value = data[updateindex].amount;
                form2.formtext.value = data[updateindex].name;
            }  
        })
    })
}

form2.addEventListener('submit',(e)=>{
    let name1 = form2.formtext.value;
    let amount1 = form2.formamount.value;
    data[updateindex].name = name1;
    data[updateindex].amount = +amount1;
    addtostorage();
    updatetrans();
    updatediv.style.display = 'none';
})


form1.addEventListener('submit',(e)=>{
    e.preventDefault();
    let name1 = form1.formtext.value;
    let amount1 = form1.formamount.value;
    if(!name1.length){
        return false
    }
    let obj = {
        id:randomnum(),
        name:name1,
        amount:+amount1
    }
    data.push(obj);
    addtostorage();
    updatetrans();
    form1.formtext.value = '';
    form1.formamount.value = '';
})

innerdiv.addEventListener('click',(e)=>{
    if(e.target.className == 'inner-div'){
        updatediv.style.display = 'none';
    }
})

init();




