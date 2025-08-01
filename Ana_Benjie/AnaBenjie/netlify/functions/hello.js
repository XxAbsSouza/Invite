// import { Client } from "@notionhq/client";

// export default async (req, context) => {
//   // Cria o cliente do Notion
//   const notion = new Client({ auth: process.env.NOTION_TOKEN });
//   const databaseId = process.env.NOTION_DATABASE_ID;

//   try {
//     // Consulta o banco de dados
//     const response = await notion.databases.query({ database_id: databaseId });

//     // Log para ver no console do deploy
//     console.log(response);

//     // Retorna o JSON como resposta HTTP
//     return new Response(JSON.stringify(response), {
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error(error);
//     return new Response("Erro ao buscar o Notion", { status: 500 });
//   }
// };



import { Client } from "@notionhq/client";

export default async (req, context) => {
  const notion = new Client({ auth: process.env.NOTION_TOKEN });
  const databaseId = process.env.NOTION_DATABASE_ID;

  try {
    const body = await req.json();

    // Cria página com os dados vindos do frontend
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Nome: {
          title: [{ text: { content: body.nome } }],
        },
        Email: {
          email: body.email,
        },
        Phone: {
          phone_number: body.phone,
        },
        Quantidade: {
          number: Number(body.quantidade), // garante que vai como número
        },
        TipoAcompanhante: {
          select: { name: body.tipoAcompanhante },
        },
        Observacao: {
          rich_text: [{ text: { content: body.observacao } }],
        },
        Acompanhantes: {
          rich_text: [{ text: { content: body.acompanhantes } }],
        },
        Confirmação: {
          status: { name: body.confirmacao },
        },
      },
    });

    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao criar página no Notion:", error);
    return new Response("Erro ao criar página no Notion", { status: 500 });
  }
};
