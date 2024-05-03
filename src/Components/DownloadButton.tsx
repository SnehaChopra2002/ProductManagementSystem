import React from 'react';
import { Button } from '@mui/material';
import { Product } from '../App';

interface DownloadButtonProps {
  data: Product[];
}

const downloadCSV = (data: Product[]): void => {
  const csv = data.map(row => Object.values(row).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', 'download.csv');
  a.click();
  window.URL.revokeObjectURL(url);
};

const DownloadButton: React.FC<DownloadButtonProps> = ({ data }) => {
  return <Button color='primary' onClick={() => downloadCSV(data)}>Download CSV</Button>;
};

export default DownloadButton;
