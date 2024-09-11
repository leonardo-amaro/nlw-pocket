const { select } = require("@inquirer/prompts"); // Criar prompts interativos

const start = async () => {
  while (true) {
    const opcao = await select({
      message: "Menu >",
      choices: [
        {
          name: "Cadastrar meta",
          value: "cadastrar",
        },
        {
          name: "Sair",
          value: "sair",
        },
      ],
    });
    switch (opcao) {
      case "cadastrar":
        console.log("Vamos cadastrar uma meta");
        break;
      case "sair":
        return;
    }
  }
};

start();
