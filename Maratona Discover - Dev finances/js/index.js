const modal = document.querySelector(".modal-overlay");

const Storage = {
    get(){
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
    },
    set(transactions){
        localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))
    }
}

const Modal = {
    toogle() {
        modal.classList.toggle("active");
    }
}

const Transaction = {
    all: Storage.get(), 
    add(transaction){
        Transaction.all.push(transaction)
        App.reload()
    },
    remove(index){
        Transaction.all.splice(index,1)
        App.reload()
    },
    incomes() {
        let income = 0;
        Transaction.all.forEach(transaction => {
            transaction.amount > 0 ? income += transaction.amount : income
        })
        return income
    },
    expenses() {
        let expenses = 0;
        Transaction.all.forEach(transaction => {
            transaction.amount < 0 ? expenses += transaction.amount : expenses
        })
        return expenses
    },
    total() {
        
        return Transaction.incomes() + Transaction.expenses();
    }

}

const Utils = {
    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : "";
        value = String(value).replace(/\D/g, "");
        value = Number(value)/100;

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        return signal + value
    },
    formatAmount(value){
        value = value * 100
        return Math.round(value)
    },
    formatDate(value){
        const splittedDate = value.split("-");
        console.log(splittedDate);
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    }
}

const DOM = { 
    transactionsContainer: document.querySelector(`#data-table tbody`),
    
    addTransaction(transactions, index) {
        
        const tr = document.createElement(`tr`);

        tr.innerHTML = DOM.innerHTMLTransaction(transactions, index)
        tr.dataset.index = index
        DOM.transactionsContainer.appendChild(tr);
    },

    innerHTMLTransaction(transactions, index) {
        const CSSclass = transactions.amount > 0 ? "income" : "expense";

        const amount =  Utils.formatCurrency(transactions.amount)
        const HTML = ` 
   
            <td class="description">${transactions.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transactions.date}</td>
            <td class="date">
                <img  onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação" />
            </td>`

        return HTML;
    },
    updateBalance(){
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes());
        document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses());
        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total());
    },
    clearTransactions(){
        DOM.transactionsContainer.innerHTML = ""
    }
}




const App = {
    init(){
        Transaction.all.forEach(DOM.addTransaction)
        DOM.updateBalance()
        Storage.set(Transaction.all)
    },
    reload(){
        DOM.clearTransactions()
        App.init()
    }
}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues(){
        return{
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },
    validateFields(){
        const {description, amount, date} = Form.getValues()
        if(description.trim()  === "" || amount.trim()  === "" || date.trim()  === ""){
            throw new Error("Por favor, preencha todos os campos")
        }
    },
    formatValues(){
        let {description, amount, date} = Form.getValues();
        amount = Utils.formatAmount(amount)
        date = Utils.formatDate(date)

        return {
            description,
            amount,
            date
        }
    },
    
    clearFields(){
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },
    submit(event){
        event.preventDefault();

        try{
            Form.validateFields();
            const transaction = Form.formatValues();
            Transaction.add(transaction)
            Form.clearFields();
            Modal.toogle();
            App.reload();
        } catch (error){
            alert(error.message)
        }
        

    }
}

App.init();




