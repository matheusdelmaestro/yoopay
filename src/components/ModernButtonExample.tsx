import React from 'react';

const ModernButtonExample: React.FC = () => {
  return (
    <div className="p-8 space-y-6">
      <h2 className="text-gradient text-2xl mb-6">Exemplos de Botões Modernos</h2>
      
      {/* Botões Modernos */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Botões com Gradiente Verde</h3>
        <div className="flex gap-4 flex-wrap">
          <button className="btn-modern">
            Botão Principal
          </button>
          
          <button className="btn-soft">
            Botão Suave
          </button>
          
          <button className="bg-gradient-modern text-white px-6 py-3 rounded-lg font-semibold hover:shadow-green transition-all duration-300">
            Gradiente Completo
          </button>
        </div>
      </div>

      {/* Cards Modernos */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Cards com Estilo Moderno</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card-modern p-6">
            <h4 className="text-gradient text-lg font-semibold mb-2">Card Moderno</h4>
            <p className="text-gray-600 mb-4">Este card usa a nova paleta de cores verde com gradientes suaves.</p>
            <button className="btn-soft">
              Ação
            </button>
          </div>
          
          <div className="card-modern p-6">
            <h4 className="text-green-modern-dark text-lg font-semibold mb-2">Outro Card</h4>
            <p className="text-gray-600 mb-4">Demonstração de diferentes estilos com a paleta verde.</p>
            <div className="flex gap-2">
              <span className="badge-modern">Novo</span>
              <span className="badge-modern">Moderno</span>
            </div>
          </div>
        </div>
      </div>

      {/* Inputs Modernos */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Inputs com Estilo Moderno</h3>
        <div className="max-w-md space-y-3">
          <input 
            type="text" 
            placeholder="Input moderno com foco verde"
            className="input-modern w-full"
          />
          
          <input 
            type="email" 
            placeholder="Email com estilo atualizado"
            className="input-modern w-full"
          />
        </div>
      </div>

      {/* Demonstração de Gradientes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Backgrounds com Gradiente</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-modern p-6 rounded-lg text-white text-center">
            <h4 className="font-semibold">Gradiente Completo</h4>
            <p className="text-sm opacity-90">Verde escuro → médio → claro</p>
          </div>
          
          <div className="bg-gradient-soft p-6 rounded-lg text-green-800 text-center">
            <h4 className="font-semibold">Gradiente Suave</h4>
            <p className="text-sm opacity-80">Verde médio → claro</p>
          </div>
          
          <div className="bg-green-modern-light p-6 rounded-lg text-green-800 text-center border border-green-200">
            <h4 className="font-semibold">Cor Sólida</h4>
            <p className="text-sm opacity-80">Verde claro</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernButtonExample;