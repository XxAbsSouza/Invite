import React from 'react'

const FormsConfirmation = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [quantidade, setQuantidade] = useState(0);
    const [acompanhantes, setAcompanhantes] = useState([]);
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
      setAcompanhantes(
        Array.from({ length: quantidade }, () => ({ nome: "", tipo: "adulto" }))
      );
    }, [quantidade]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch("/.netlify/functions/confirm", {
        method: "POST",
        body: JSON.stringify({
          nome,
          email,
          whatsapp,
          quantidade,
          acompanhantes,
        }),
      });
      const data = await response.json();
      setMensagem(data.message);
    };

    return (
      <div className="max-w-xl mx-auto mt-8 p-4 shadow rounded">
        <h1 className="text-2xl mb-4">Confirmação de Presença</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Quantas pessoas vão com você?"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            min={0}
          />

          {acompanhantes.map((a, i) => (
            <div key={i} className="flex gap-2">
              <input
                placeholder={`Nome acompanhante ${i + 1}`}
                value={a.nome}
                onChange={(e) => {
                  const novo = [...acompanhantes];
                  novo[i].nome = e.target.value;
                  setAcompanhantes(novo);
                }}
                required
              />
              <select
                value={a.tipo}
                onChange={(e) => {
                  const novo = [...acompanhantes];
                  novo[i].tipo = e.target.value;
                  setAcompanhantes(novo);
                }}
              >
                <option value="adulto">Adulto</option>
                <option value="criança">Criança</option>
              </select>
            </div>
          ))}
          <button type="submit" className="bg-blue-500 text-white rounded p-2">
            Confirmar Presença
          </button>
        </form>
        {mensagem && <p className="mt-4">{mensagem}</p>}
      </div>
    );
}

export default FormsConfirmation