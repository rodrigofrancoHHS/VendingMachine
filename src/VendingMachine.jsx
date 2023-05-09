import React, { useState } from 'react';

function VendingMachine() {

  const [intro, setIntro] = useState(0);  
  const [quantidade, setQuantidade] = useState(50);
  const [total, setTotal] = useState(0);  
  const [items, setItems] = useState([
    { name: 'Coca-cola', price: 1.20, quantity: 10 },
    { name: 'Sprite', price: 0.80, quantity: 5 },
    { name: 'Ice-Tea', price: 1.20, quantity: 15 },
    { name: 'Pepsi', price: 0.85, quantity: 14 },
    { name: 'Bongo', price: 0.99, quantity: 9 },
    { name: 'Monster', price: 1.40, quantity: 20 },
    { name: 'Guaraná', price: 1.00, quantity: 10 },
    { name: 'Sumol', price: 1.10, quantity: 1 },
    { name: 'Chá', price: 1.25, quantity: 4 },
    { name: 'Água', price: 1.30, quantity: 16 },
    { name: '7UP', price: 0.85, quantity: 17 },
    { name: 'Café', price: 0.80, quantity: 20 }
  ]); 
  const [moedas, setMoedas] = useState([
    { name: '1 cêntimo', price: 0.01},
    { name: '2 cêntimos', price: 0.02},
    { name: '5 cêntimos', price: 0.05},
    { name: '10 cêntimos', price: 0.10},
    { name: '20 cêntimos', price: 0.20},
    { name: '50 cêntimos', price: 0.50},
    { name: '1 euro', price: 1.00},
    { name: '2 euros', price: 2.00}
  ]);

  const handleItemSelection = (item) => {
    if (item.quantity > 0) {
      setTotal(total + item.price);
      localStorage.setItem('item:', JSON.stringify(item));
      setItems(
        items.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity - 1 } : i
        )
      );
      alert(`Você comprou ${item.name}!`);
    } else {
      alert('Saldo insuficiente ou item fora de estoque!');
    }
  };

  const handleMoedasSelection = (moeda) => {
    if (quantidade > 0) {
      setIntro(intro + moeda.price);
      localStorage.setItem('tipo de moeda', JSON.stringify(moeda.price));
      setQuantidade(quantidade - 1);
      const index = moedas.findIndex((m) => m.name === moeda.name);
      setMoedas((prevState) => [      ...prevState.slice(0, index),      { ...prevState[index], quantity: prevState[index].quantity + 1 },
        ...prevState.slice(index + 1),
      ]);
    } else {
      alert('Saldo insuficiente ou item fora de estoque!');
    }
  };
  

  const FaltaPagar = total - intro;
  const mtotal = 10 - total;

  return (

    <div>

<div className="bg-white rounded-lg shadow-lg">
    <table className="table-auto w-full">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2 text-center">Moeda</th>
          <th className="px-4 py-2 text-center">Quantidade</th>
          <th className="px-4 py-2 text-center">Valor Total, Máx: 10€</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border px-4 py-2 text-center">20 cent</td>
          <td className="border px-4 py-2 text-center"><label>{quantidade.toFixed()} </label></td>
          <td className="border px-4 py-2 text-center">{mtotal.toFixed(2)} €</td>
        </tr>
      </tbody>
    </table>
  </div>


  <div>
      <h2>Máquina de Venda</h2>
      <div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {items.map((item) => (
          <div key={item.name} style={{ flexBasis: 'calc(33.33% - 20px)', marginBottom: '20px', marginRight: '20px' }}>
          <p>{item.name}</p>
          <p>Preço: € {item.price.toFixed(2)}</p>
          <p>Quantidade: {item.quantity}</p>
          <button onClick={() => handleItemSelection(item)}>Comprar</button>
        </div>
      ))}
    </div>
  </div>

  <br/><br/><br/><br/><br/>



      <div>
        {moedas.map((moeda) => (
          <div key={moeda.name}>
            <p>Moedas: € {moeda.price.toFixed(2)} &nbsp;&nbsp;  <button onClick={() => handleMoedasSelection(moeda) } disabled={FaltaPagar <= 0}>Inserir</button></p>
          </div>
        ))}
      </div>

      <div>
        <br/><br/>
        <p>Valor a Pagar: <label>{total.toFixed(2)} €</label></p>
        <p>Valor introduzido até agora:   <label>{intro.toFixed(2)} €</label></p>
        <p>Falta Pagar:   <label>{FaltaPagar.toFixed(2)} €</label></p>
      </div>
    </div>
    </div>
  );
}

export default VendingMachine;
