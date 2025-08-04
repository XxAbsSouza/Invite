import { Client } from "@notionhq/client";

export default async (req, context) => {
  const notion = new Client({ auth: process.env.NOTION_TOKEN });
  const convidadosDbId = process.env.NOTION_DATABASE_ID;
  const acompanhantesDbId = process.env.NOTION_DATABASE_ACOMPANHANTES_ID;

  try {
    const body = await req.json();
    const searchName = body.name; // Não usar toLowerCase

    // Busca exata na tabela de Convidados
    const convidadoRes = await notion.databases.query({
      database_id: convidadosDbId,
      filter: {
        property: "Nome",
        rich_text: { equals: searchName },
      },
    });

    if (convidadoRes.results.length > 0) {
      const guest = convidadoRes.results[0];
      const confirmacao =
        guest.properties?.Confirmação?.status?.name || "Indefinido";
      return new Response(
        JSON.stringify({
          found: true,
          pageId: guest.id,
          confirmacao,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Se não achou, busca exata na tabela de Acompanhantes
    const acompanhanteRes = await notion.databases.query({
      database_id: acompanhantesDbId,
      filter: {
        property: "Nome",
        title: { equals: searchName },
      },
    });

    if (acompanhanteRes.results.length > 0) {
      const acompanhante = acompanhanteRes.results[0];
      const representanteRelation =
        acompanhante.properties?.Representante?.relation;
      const representantePageId = representanteRelation?.[0]?.id;

      if (representantePageId) {
        // Vamos buscar o convidado para saber a confirmação dele
        const convidadoPage = await notion.pages.retrieve({
          page_id: representantePageId,
        });
        const confirmacao =
          convidadoPage.properties?.Confirmação?.status?.name || "Indefinido";
        return new Response(
          JSON.stringify({
            found: true,
            pageId: representantePageId,
            confirmacao,
          }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    // Não achou em nenhum
    return new Response(JSON.stringify({ found: false }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao buscar convidado:", error);
    return new Response(
      JSON.stringify({ found: false, error: error.message }),
      { headers: { "Content-Type": "application/json" }, status: 500 }
    );
  }
};
