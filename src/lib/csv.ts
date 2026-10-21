import { DrawRecord } from '../types';

/**
 * Generates and triggers browser download of an auditable CSV draw log.
 */
export function exportDrawsToCsv(records: DrawRecord[], filename = 'sentinel-live-audit-log.csv') {
  const headers = [
    'Webinar ID',
    'Webinar Title',
    'Seed (PRNG)',
    'SHA-256 Hash',
    'Timestamp (UTC)',
    'Winner Seat(s)',
    'Winner Email(s)',
    'Total Eligible Seats',
    'Authorized Operator'
  ];

  const rows = records.map(record => [
    `"${record.webinarId}"`,
    `"${record.webinarTitle.replace(/"/g, '""')}"`,
    `"${record.seed}"`,
    `"${record.hash}"`,
    `"${record.timestamp}"`,
    `"${record.winnerSeats.join(', ')}"`,
    `"${record.winnerEmails.join(', ')}"`,
    record.totalEligible,
    `"${record.operator}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
