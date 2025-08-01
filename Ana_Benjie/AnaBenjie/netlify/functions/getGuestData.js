import { Client } from "@notionhq/client";

export default async (req, context) => {
  const notion = new Client({ auth: process.env.NOTION_TOKEN });
  const databaseAcompanhantesId = process.env.NOTION_DATABASE_ACOMPANHANTES_ID;
    console.log("Acompanhantes_ID = ", databaseAcompanhantesId);
  try {
    const { pageId } = await req.json();
    console.log("Page Id no Get = ",pageId);
    // Pega os dados do convidado
    const convidado = await notion.pages.retrieve({ page_id: pageId });

    // Pega acompanhantes relacionados
    const acompanhantes = await notion.databases.query({
      database_id: databaseAcompanhantesId,
      filter: {
        property: "Representante",
        relation: {
          contains: pageId,
        },
      },
    });
    console.log(">> databaseAcompanhantesId:", databaseAcompanhantesId);
    return new Response(
      JSON.stringify({ convidado, acompanhantes: acompanhantes.results }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
