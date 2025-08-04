import { useState, useCallback } from 'react';
import { createAuthHeaders, API_CONFIG } from '@/lib/api-config';
import { useCustomToast } from './useCustomToast';

export interface PixValidationRequest {
  id: number;
  originId: string;
  payload: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  switchPlan: boolean;
}

interface PixPayloadData {
  uuid: string | null;
  token: string | null;
  deletedAt: string | null;
  id: string | null;
  document: string;
  switchPlan: boolean;
  tradeName: string;
  originId: string;
  bank: {
    bankName: string;
    bankNumber: string;
    agency: string;
    account: string;
    accountDigit: string;
    pixKey: string;
    holderName: string;
    holderDocument: string;
    pixKeyType: string;
  };
  fees: Array<{
    driver: string;
    method: string;
    feeValue: number;
    feeType: string;
    transactionFeeValue: number;
    transactionFeeType: string;
  }>;
}

export const usePixValidation = () => {
  const [pendingRequests, setPendingRequests] = useState<PixValidationRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const { success, error } = useCustomToast();

  const fetchPendingRequests = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_CONFIG.endpoints.PAYMENT_API}/marketplace/validation/pending`, {
        method: 'GET',
        headers: createAuthHeaders('YOOGA_PAYMENT_TOKEN'),
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar solicitações pendentes');
      }

      const data: PixValidationRequest[] = await response.json();
      setPendingRequests(data);
    } catch (err) {
      error({
        title: 'Erro',
        description: 'Erro ao carregar solicitações pendentes de PIX',
      });
    } finally {
      setLoading(false);
    }
  }, [error]);

  const approveRequest = useCallback(async (clienteId: string) => {
    try {
      const response = await fetch(`${API_CONFIG.endpoints.PAYMENT_API}/marketplace/validation/approve/${clienteId}`, {
        method: 'GET',
        headers: createAuthHeaders('YOOGA_PAYMENT_TOKEN'),
      });

      if (!response.ok) {
        throw new Error('Erro ao aprovar solicitação');
      }

      success({
        title: 'Sucesso',
        description: 'Solicitação de PIX aprovada com sucesso',
      });

      // Atualizar lista após aprovação
      fetchPendingRequests();
    } catch (err) {
      error({
        title: 'Erro',
        description: 'Erro ao aprovar solicitação de PIX',
      });
    }
  }, [success, error, fetchPendingRequests]);

  const rejectRequest = useCallback(async (clienteId: string) => {
    try {
      const response = await fetch(`${API_CONFIG.endpoints.PAYMENT_API}/marketplace/validation/pending/delete/${clienteId}`, {
        method: 'GET',
        headers: createAuthHeaders('YOOGA_PAYMENT_TOKEN'),
      });

      if (!response.ok) {
        throw new Error('Erro ao rejeitar solicitação');
      }

      success({
        title: 'Sucesso',
        description: 'Solicitação de PIX rejeitada com sucesso',
      });

      // Atualizar lista após rejeição
      fetchPendingRequests();
    } catch (err) {
      error({
        title: 'Erro',
        description: 'Erro ao rejeitar solicitação de PIX',
      });
    }
  }, [success, error, fetchPendingRequests]);

  const parsePayload = useCallback((payloadString: string): PixPayloadData | null => {
    try {
      return JSON.parse(payloadString);
    } catch (err) {
      return null;
    }
  }, []);

  return {
    pendingRequests,
    loading,
    fetchPendingRequests,
    approveRequest,
    rejectRequest,
    parsePayload,
  };
};