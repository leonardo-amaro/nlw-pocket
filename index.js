const { select, input, checkbox } = require("@inquirer/prompts"); // Criar prompts interativos

let mensagem = "Bem vindo(a) ao in.Orbit | Seu app de metas!";
let metas = [];

const cadastrarMeta = async () => {
  const meta = await input({ message: "Digite sua meta:" });

  if (meta.trim().length == 0) {
    mensagem = "ATENÇÃO: As metas não podem ser vazias!";
    return;
  };

  metas.push({ value: meta, checked: false });
  mensagem = "Meta cadastrada com sucesso!";
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
    mensagem = "Nenhuma meta foi marcada ou desmarcada.";
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
    return meta.checked;
  });

  if (realizadas.length == 0) {
    mensagem = "Ainda não existem metas realizadas.";
    return;
  };

  await select({
    message: "Metas realizdas:",
    choices: [...realizadas],
  });
};

const metasAbertas = async () => {
  const abertas = metas.filter((meta) => {
    return !meta.checked;
  });

  if (abertas.length == 0) {
    mensagem = "Você realizou todas as abertas. Parabéns!";
    return;
  };

  await select({
    message: "Metas abertas:",
    choices: [...abertas],
  });
};

const apagarMetas = async () => {
  const metasDesmarcadas = metas.map((meta) => {
    return { value: meta.value, checked: false };
  });

  const metasParaApagar = await checkbox({
    message:
      "Selecione (barra de espaço) as metas para apagar e tecle Enter para sair.",
    choices: [...metasDesmarcadas],
    instructions: false,
  });

  if (metasParaApagar.length == 0) {
    mensagem = "Nenhuma meta foi selecionada. Nada foi alterado.";
    return;
  };

  metasParaApagar.forEach((item) => {
    metas = metas.filter((meta) => {
      return meta.value != item;
    });
  });

  mensagem = "Meta(s) apagada(s) com sucesso!";
};

const mostrarMensagem = () => {
  console.clear();

  if (mensagem != "") {
    console.log(mensagem);
    console.log("");
    mensagem = "";
  }
};

const start = async () => {
  while (true) {

    mostrarMensagem();

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
          name: "Metas abertas",
          value: "abertas",
        },
        {
          name: "Apagar metas",
          value: "apagar",
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
      case "abertas":
        await metasAbertas();
        break;
      case "apagar":
        await apagarMetas();
        break;
      case "sair":
        return;
    }
  }
};

start();
