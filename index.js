const { select, input, checkbox } = require("@inquirer/prompts"); // Criar prompts interativos

let metas = [];

const cadastrarMeta = async () => {
  const meta = await input({ message: "Digite sua meta:" });

  if (meta.trim().length == 0) {
    console.log("ATENÇÃO: As metas não podem ser vazias!");
    return;
  }
  metas.push({ value: meta, checked: false });
};

const listarMetas = async () => {
  const respostas = await checkbox({
    message:
      "Use as setas para navegar entre metas, barra de espaço para marcar/desmarcar e Enter para sair.",
    choices: [...metas],
    instructions: false,
  });
  
  metas.forEach((meta) => {
    meta.checked = false;
  });

  if (respostas.length == 0) {
    console.log("Nenhuma meta foi marcada ou desmarcada.");
    return;
  }

  respostas.forEach((resposta) => {
    const metaAtual = metas.find((meta) => {
      return meta.value == resposta;
    });
    metaAtual.checked = true;
  });
};

const metasRealizadas = async () => {
  const realizadas = metas.filter((meta) => {
    return meta.checked
  });

  if (realizadas.length == 0) {
    console.log("Ainda não existem metas realizadas.");
    return;
  };

  await select({
    message: "Metas realizdas:",
    choices: [...realizadas],
  });
};

const start = async () => {
  while (true) {
    const opcao = await select({
      message: "Menu >",
      choices: [
        {
          name: "Cadastrar nova meta",
          value: "cadastrar",
        },
        {
          name: "Listar as metas",
          value: "listar",
        },
        {
          name: "Metas realizadas",
          value: "realizadas",
        },
        {
          name: "Sair",
          value: "sair",
        },
      ],
    });

    switch (opcao) {
      case "cadastrar":
        await cadastrarMeta();
        break;
      case "listar":
        await listarMetas();
        break;
      case "realizadas":
        await metasRealizadas();
        break;
      case "sair":
        return;
    }
  }
};

start();
