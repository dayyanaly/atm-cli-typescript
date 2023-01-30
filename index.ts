import inquirer from "inquirer";
interface Account {
    name: string;
    balance: number;
  }
  
  let account: Account = { name: 'John Doe', balance: 1000 };
  
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
      when: (answers: any) => answers.choice === 'balance'
    }
  ];
  
  const withdraw = [
    {
      type: 'input',
      name: 'amount',
      message: 'How much do you want to withdraw?',
      when: (answers: any) => answers.choice === 'withdraw'
    }
  ];
  
  const deposit = [
    {
      type: 'input',
      name: 'amount',
      message: 'How much do you want to deposit?',
      when: (answers: any) => answers.choice === 'deposit'
    }
  ];
  
  inquirer.prompt(mainMenu).then((answers: any) => {
    switch (answers.choice) {
      case 'balance':
        inquirer.prompt(balance);
        break;
      case 'withdraw':
        inquirer.prompt(withdraw).then((withdrawAnswers: any) => {
          const amount = parseFloat(withdrawAnswers.amount);
          if (amount > account.balance) {
            console.log(`Insufficient funds. Your balance is: ${account.balance}`);
          } else {
            account.balance -= amount;
            console.log(`You have withdrawn: ${amount}. Your balance is now: ${account.balance}`);
          }
        });
        break;
      case 'deposit':
        inquirer.prompt(deposit).then((depositAnswers: any) => {
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
  