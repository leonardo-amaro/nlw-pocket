const { select } = require('@inquirer/prompts'); // Criar prompts interativos

const start = async () => {
  while (true) {
    const opcao = await select({
      message: "Menu >",
      choices: [
        {
          name: "Cadastrar meta",
          value: "cadastrar"
        },
        {
          name: "Sair",
          value: "sair"
        }
      ]
    });
  }
}

start();