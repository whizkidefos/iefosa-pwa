'use client';

import { MailDoc } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';

const STATE_VARIANT: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  SUCCESS: 'default',
  PENDING: 'secondary',
  PROCESSING: 'secondary',
  ERROR: 'destructive',
};

const toText = (to?: string | string[]) => (Array.isArray(to) ? to.join(', ') : to || '');

export function MailLogTab({ mail }: { mail: MailDoc[] }) {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>To</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Queued</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mail.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                No outbound mail yet
              </TableCell>
            </TableRow>
          )}
          {mail.map((m) => (
            <TableRow key={m.id}>
              <TableCell className="max-w-[200px] truncate">{toText(m.to)}</TableCell>
              <TableCell className="max-w-xs truncate">{m.message?.subject}</TableCell>
              <TableCell>
                <Badge variant={STATE_VARIANT[m.delivery?.state || ''] || 'outline'}>
                  {m.delivery?.state || 'PENDING'}
                </Badge>
              </TableCell>
              <TableCell>
                {m.createdAt ? format(new Date(m.createdAt), 'MMM d, yyyy h:mm a') : '-'}
              </TableCell>
              <TableCell className="max-w-[220px] truncate text-xs text-muted-foreground">
                {m.delivery?.error ||
                  m.delivery?.info?.messageId ||
                  `attempts: ${m.delivery?.attempts ?? 0}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
