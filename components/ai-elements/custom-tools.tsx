'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { AlertCircleIcon, CheckCircleIcon, ClockIcon, CreditCardIcon, FileTextIcon, ShieldCheckIcon, XCircleIcon } from 'lucide-react';
import type { ComponentProps } from 'react';

// Base Tool Component
export type ToolProps = ComponentProps<typeof Card> & {
  toolName: string;
  state: 'input-streaming' | 'input-available' | 'output-available' | 'output-error';
  input?: any;
  output?: any;
  errorText?: string | undefined;
  toolCallId: string;
};

export const Tool = ({
  toolName,
  state,
  input,
  output,
  errorText,
  toolCallId,
  className,
  ...props
}: ToolProps) => {
  const getStateIcon = () => {
    switch (state) {
      case 'input-streaming':
        return <ClockIcon className="h-4 w-4 animate-spin" />;
      case 'input-available':
        return <ClockIcon className="h-4 w-4" />;
      case 'output-available':
        return <CheckCircleIcon className="h-4 w-4 text-green-600" />;
      case 'output-error':
        return <XCircleIcon className="h-4 w-4 text-red-600" />;
    }
  };

  const getStateText = () => {
    switch (state) {
      case 'input-streaming':
        return 'Processing...';
      case 'input-available':
        return 'Ready';
      case 'output-available':
        return 'Complete';
      case 'output-error':
        return 'Error';
    }
  };

  return (
    <Card className={cn('w-full max-w-2xl', className)} {...props}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            {toolName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          </CardTitle>
          <Badge variant="outline" className="flex items-center gap-1">
            {getStateIcon()}
            {getStateText()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {state === 'output-error' && errorText && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
            <div className="flex items-center gap-2">
              <AlertCircleIcon className="h-4 w-4" />
              <span className="font-medium">Error:</span>
            </div>
            <p className="mt-1">{errorText}</p>
          </div>
        )}

        {(state === 'input-streaming' || state === 'input-available') && input && (
          <div className="text-sm">
            <p className="font-medium mb-2">Input Parameters:</p>
            <pre className="bg-gray-50 p-2 rounded text-xs overflow-x-auto">
              {JSON.stringify(input, null, 2)}
            </pre>
          </div>
        )}

        {state === 'output-available' && output && (
          <div className="text-sm">
            <p className="font-medium mb-2">Result:</p>
            <div className="bg-green-50 p-3 rounded-md">
              {typeof output === 'string' ? (
                <p>{output}</p>
              ) : (
                <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                  {JSON.stringify(output, null, 2)}
                </pre>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Insurance-specific tool components
export type InsurancePolicyDisplayProps = {
  policy: {
    policyNumber: string;
    type: string;
    holder: string;
    status: string;
    premium: number;
    coverage: number;
    guarantees?: string[];
  };
};

export const InsurancePolicyDisplay = ({ policy }: InsurancePolicyDisplayProps) => (
  <Card className="w-full">
    <CardHeader>
      <div className="flex items-center gap-2">
        <ShieldCheckIcon className="h-5 w-5 text-blue-600" />
        <CardTitle>Policy Information</CardTitle>
      </div>
      <CardDescription>Policy #{policy.policyNumber}</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-600">Type</p>
          <p className="text-sm">{policy.type}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Status</p>
          <Badge variant={policy.status === 'active' ? 'default' : 'secondary'}>
            {policy.status}
          </Badge>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Holder</p>
          <p className="text-sm">{policy.holder}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Premium</p>
          <p className="text-sm font-medium">${policy.premium.toLocaleString()}</p>
        </div>
      </div>

      {policy.guarantees && policy.guarantees.length > 0 && (
        <>
          <Separator />
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Guarantees</p>
            <div className="flex flex-wrap gap-2">
              {policy.guarantees.map((guarantee, index) => (
                <Badge key={index} variant="outline">
                  {guarantee}
                </Badge>
              ))}
            </div>
          </div>
        </>
      )}
    </CardContent>
  </Card>
);

export type ClaimStatusDisplayProps = {
  claim: {
    claimNumber: string;
    type: string;
    status: string;
    amount: number;
    submittedDate: string;
    description: string;
  };
};

export const ClaimStatusDisplay = ({ claim }: ClaimStatusDisplayProps) => (
  <Card className="w-full">
    <CardHeader>
      <div className="flex items-center gap-2">
        <FileTextIcon className="h-5 w-5 text-orange-600" />
        <CardTitle>Claim Status</CardTitle>
      </div>
      <CardDescription>Claim #{claim.claimNumber}</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-600">Type</p>
          <p className="text-sm">{claim.type}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Status</p>
          <Badge variant={claim.status === 'approved' ? 'default' : 'secondary'}>
            {claim.status}
          </Badge>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Amount</p>
          <p className="text-sm font-medium">${claim.amount.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Submitted</p>
          <p className="text-sm">{claim.submittedDate}</p>
        </div>
      </div>

      <Separator />
      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">Description</p>
        <p className="text-sm text-gray-800">{claim.description}</p>
      </div>
    </CardContent>
  </Card>
);

export type PaymentStatusDisplayProps = {
  payment: {
    status: string;
    lastPayment: string;
    nextDue: string;
    amount: number;
    outstandingBalance: number;
  };
};

export const PaymentStatusDisplay = ({ payment }: PaymentStatusDisplayProps) => (
  <Card className="w-full">
    <CardHeader>
      <div className="flex items-center gap-2">
        <CreditCardIcon className="h-5 w-5 text-green-600" />
        <CardTitle>Payment Status</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-600">Status</p>
          <Badge variant={payment.status === 'current' ? 'default' : 'destructive'}>
            {payment.status}
          </Badge>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Outstanding Balance</p>
          <p className="text-sm font-medium">${payment.outstandingBalance.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Last Payment</p>
          <p className="text-sm">{payment.lastPayment}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Next Due</p>
          <p className="text-sm">{payment.nextDue}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);
