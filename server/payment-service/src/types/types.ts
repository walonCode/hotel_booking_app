export interface CreatePaymentCode {
  success: boolean;
  messages: string[];
  result: Result;
}

interface Result {
  id: string;
  name: string;
  mode: string;
  isActive: boolean;
  status: string;
  ussdCode: string;
  amount: Amount;
  customerTarget: CustomerTarget;
  financialTarget: FinancialTarget;
  allowedProviders: string[];
  progress: Progress;
  financialAccountId: string;
  expireTime: string;
  createTime: string;
  metadata: Metadata;
}

interface Metadata {
}

interface Progress {
  isCompleted: boolean;
  totalPaymentCount: number;
  totalPaymentSum: Amount;
}

interface FinancialTarget {
  expectedPaymentCount: number;
  expectedPaymentSum: Amount;
}

interface CustomerTarget {
  name: string;
  reference: string;
  payingPhoneNumber: string;
}

interface Amount {
  currency: string;
  value: number;
}




// {
//   allowedProviders: [ 'm17', 'm18' ],
//   amount: { currency: 'SLE', value: 100 },
//   createTime: '2025-06-03T11:48:26.204191Z',
//   customerTarget: {
//     name: 'speed',
//     payingPhoneNumber: '+23275396143',
//     reference: '0123456789'
//   },
//   expireTime: '2025-06-03T12:18:26.204218784Z',
//   financialTarget: null,
//   id: 'pmc-k6De88MncQcxmBdLCfW3igABSnH',
//   isActive: false,
//   metadata: null,
//   mode: 'oneTime',
//   name: 'Premium Payment',
//   progress: {
//     isCompleted: true,
//     totalPaymentCount: 1,
//     totalPaymentSum: { currency: 'SLE', value: 100 }
//   },
//   status: 'completed',
//   ussdCode: '*715*5773920187#'
// }

export interface ConfirmPayment {
  allowedProviders: string[];
  amount: Amount;
  createTime: string;
  customerTarget: CustomerTarget;
  expireTime: string;
  financialTarget: null;
  id: string;
  isActive: boolean;
  metadata: null;
  mode: string;
  name: string;
  progress: Progress;
  status: string;
  ussdCode: string;
}

interface Progress {
  isCompleted: boolean;
  totalPaymentCount: number;
  totalPaymentSum: Amount;
}

interface CustomerTarget {
  name: string;
  payingPhoneNumber: string;
  reference: string;
}

interface Amount {
  currency: string;
  value: number;
}