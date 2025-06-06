
import { useEffect, useState } from 'react';

export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({ nome: '', descricao: '', preco: '', categoria: '' });
  const [editandoId, setEditandoId] = useState(null);

  const fetchProdutos = async () => {
    const res = await fetch('http://localhost:3001/api/produtos');
    const data = await res.json();
    setProdutos(data);
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const salvarProduto = async () => {
    const method = editandoId ? 'PUT' : 'POST';
    const url = editandoId
      ? `http://localhost:3001/api/produtos/${editandoId}`
      : `http://localhost:3001/api/produtos`;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, preco: parseFloat(form.preco) }),
    });

    setForm({ nome: '', descricao: '', preco: '', categoria: '' });
    setEditandoId(null);
    fetchProdutos();
  };

  const deletarProduto = async (id) => {
    await fetch(`http://localhost:3001/api/produtos/${id}`, { method: 'DELETE' });
    fetchProdutos();
  };

  const editarProduto = (produto) => {
    setForm(produto);
    setEditandoId(produto._id);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">📦 Catálogo de Produtos</h1>

      <div className="space-y-2">
        <input className="w-full border p-2 rounded" placeholder="Nome"
          value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
        <input className="w-full border p-2 rounded" placeholder="Descrição"
          value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} />
        <input className="w-full border p-2 rounded" placeholder="Preço"
          type="number" value={form.preco} onChange={(e) => setForm({ ...form, preco: e.target.value })} />
        <input className="w-full border p-2 rounded" placeholder="Categoria"
          value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={salvarProduto}>
          {editandoId ? 'Atualizar' : 'Adicionar'}
        </button>
      </div>

      <hr />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {produtos.map(prod => (
          <div key={prod._id} className="border rounded p-4 shadow space-y-2">
            <h2 className="text-xl font-semibold">{prod.nome}</h2>
            <p>{prod.descricao}</p>
            <p>💲 R$ {prod.preco.toFixed(2)}</p>
            <p className="italic text-sm">{prod.categoria}</p>
            <div className="space-x-2">
              <button className="bg-yellow-400 px-3 py-1 rounded" onClick={() => editarProduto(prod)}>Editar</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => deletarProduto(prod._id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
