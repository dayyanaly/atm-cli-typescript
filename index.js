import inquirer from "inquirer";
let account = { name: 'John Doe', balance: 1000 };
const mainMenu = [
    {
        type: 'list',
        name: 'choice',
        message: 'What do you want to do?',
        choices: [
            { name: 'Check balance', value: 'balance' },
            { name: 'Withdraw', value: 'withdraw' },
            { name: 'Deposit', value: 'deposit' },
            { name: 'Exit', value: 'exit' }
        ]
    }
];
const balance = [
    {
        type: 'input',
        name: 'amount',
        message: `Your balance is: ${account.balance}`,
        when: (answers) => answers.choice === 'balance'
    }
];
const withdraw = [
    {
        type: 'input',
        name: 'amount',
        message: 'How much do you want to withdraw?',
        when: (answers) => answers.choice === 'withdraw'
    }
];
const deposit = [
    {
        type: 'input',
        name: 'amount',
        message: 'How much do you want to deposit?',
        when: (answers) => answers.choice === 'deposit'
    }
];
inquirer.prompt(mainMenu).then((answers) => {
    switch (answers.choice) {
        case 'balance':
            inquirer.prompt(balance);
            break;
        case 'withdraw':
            inquirer.prompt(withdraw).then((withdrawAnswers) => {
                const amount = parseFloat(withdrawAnswers.amount);
                if (amount > account.balance) {
                    console.log(`Insufficient funds. Your balance is: ${account.balance}`);
                }
                else {
                    account.balance -= amount;
                    console.log(`You have withdrawn: ${amount}. Your balance is now: ${account.balance}`);
                }
            });
            break;
        case 'deposit':
            inquirer.prompt(deposit).then((depositAnswers) => {
                const amount = parseFloat(depositAnswers.amount);
                account.balance += amount;
                console.log(`You have deposited: ${amount}. Your balance is now: ${account.balance}`);
            });
            break;
        case 'exit':
            console.log('Thank you for using our ATM. Have a great day!');
            break;
    }
});
