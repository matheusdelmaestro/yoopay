import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const YooButtonExamples: React.FC = () => {
  return (
    <div className="p-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Botões Yoo - Modo Dark Corrigido</CardTitle>
          <CardDescription>
            Exemplos de botões com as cores do Yoo otimizadas para o modo dark
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Botões Padrão do Sistema */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Botões Padrão (Sistema)</h3>
            <div className="flex gap-4 flex-wrap">
              <Button variant="default">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          {/* Botões Customizados Yoo */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Botões Yoo (Customizados)</h3>
            <div className="flex gap-4 flex-wrap">
              <button className="btn-yoo-primary px-4 py-2 rounded-md font-medium transition-colors">
                Yoo Primary
              </button>
              <button className="btn-yoo-secondary px-4 py-2 rounded-md font-medium transition-colors">
                Yoo Secondary
              </button>
              <button className="btn-yoo-outline px-4 py-2 rounded-md font-medium transition-colors">
                Yoo Outline
              </button>
              <button className="btn-yoo-ghost px-4 py-2 rounded-md font-medium transition-colors">
                Yoo Ghost
              </button>
            </div>
          </div>

          {/* Botões de Estado */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Botões de Estado</h3>
            <div className="flex gap-4 flex-wrap">
              <button className="btn-yoo-success px-4 py-2 rounded-md font-medium transition-colors">
                Success
              </button>
              <button className="btn-yoo-danger px-4 py-2 rounded-md font-medium transition-colors">
                Danger
              </button>
              <button className="btn-yoo-warning px-4 py-2 rounded-md font-medium transition-colors">
                Warning
              </button>
            </div>
          </div>

          {/* Tamanhos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tamanhos</h3>
            <div className="flex gap-4 flex-wrap items-center">
              <Button variant="default" size="sm">Small</Button>
              <Button variant="default" size="default">Default</Button>
              <Button variant="default" size="lg">Large</Button>
              <Button variant="default" size="icon">🚀</Button>
            </div>
          </div>

          {/* Estados */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Estados</h3>
            <div className="flex gap-4 flex-wrap">
              <Button variant="default">Normal</Button>
              <Button variant="default" disabled>Disabled</Button>
              <button className="btn-yoo-primary px-4 py-2 rounded-md font-medium transition-colors opacity-50 cursor-not-allowed" disabled>
                Yoo Disabled
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default YooButtonExamples;