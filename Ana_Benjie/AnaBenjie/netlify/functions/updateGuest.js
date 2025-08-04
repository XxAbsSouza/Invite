import { Client } from "@notionhq/client";

export default async (req, context) => {
  const notion = new Client({ auth: process.env.NOTION_TOKEN });

  try {
    const body = await req.json();
    const pageId = body.pageId;

    if (!pageId) {
      return new Response(JSON.stringify({ error: "pageId é obrigatório" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Atualiza apenas os campos do convidado principal
    await notion.pages.update({
      page_id: pageId,
      properties: {
        Email: { email: body.email || "" },
        Phone: { phone_number: body.phone || "" },
        Quantidade: { number: body.quantidade || 0 },
        Observacao: {
          rich_text: body.observacao
            ? [{ text: { content: body.observacao } }]
            : [],
        },
        Confirmação: body.confirmacao
          ? { status: { name: body.confirmacao } }
          : undefined,
      },
    });

    // Não cria nem atualiza acompanhantes — evita duplicação

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao atualizar convidado:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
