import React from "react";
import { THEME } from "../../constants/theme";
import { ModalCard } from "../cards/ModalCard";

interface TableRow {
  time: string;
  count: number;
  rs: number;
  trs: number;
  cho: string;
  res: string;
  dif: string;
  dealer: string;
}

interface TableResultsProps {
  onClose?: () => void;
}

const TableResults: React.FC<TableResultsProps> = ({ onClose }) => {
  const data: TableRow[] = [];

  return (
    <div style={tableStyles.overlay}>
      <ModalCard
        width={THEME.size.frame.w}
        maxWidth="900px"
        height="auto"
        padding={0}
        onClick={(e) => e.stopPropagation()}
        >
      <div style={tableStyles.container}>
        <h2 style={tableStyles.title}>TABLE RESULT</h2>
        <table style={tableStyles.table}>
          <thead>
            <tr>
              <th style={tableStyles.th}>TIME</th>
              <th style={tableStyles.th}>COUNT</th>
              <th style={tableStyles.th}>RS</th>
              <th style={tableStyles.th}>TRS</th>
              <th style={tableStyles.th}>CHO</th>
              <th style={tableStyles.th}>RES</th>
              <th style={tableStyles.th}>DIF</th>
              <th style={tableStyles.th}>DEALER</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={8} style={tableStyles.emptyCell}>
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr key={index} style={index % 2 === 0 ? tableStyles.evenRow : tableStyles.oddRow}>
                  <td style={tableStyles.td}>{row.time}</td>
                  <td style={tableStyles.td}>{row.count}</td>
                  <td style={tableStyles.td}>{row.rs}</td>
                  <td style={tableStyles.td}>{row.trs}</td>
                  <td style={tableStyles.td}>{row.cho}</td>
                  <td style={tableStyles.td}>{row.res}</td>
                  <td style={tableStyles.td}>{row.dif}</td>
                  <td style={tableStyles.td}>{row.dealer}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div style={tableStyles.exitButton}>
          <button onClick={onClose} style={tableStyles.exitBtn}>
            Close
          </button>
        </div>
      </div>
      </ModalCard>
    </div>
  );
};

const tableStyles = {
  overlay: {
    position: 'fixed' as const,
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1001,
    padding: 16,
  },
  container: {
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center' as const,
    color: '#2c3e50',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold' as const,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden' as const,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    marginBottom: '16px',
  },
  th: {
    padding: '15px',
    textAlign: 'center' as const,
    backgroundColor: '#3498db',
    color: 'white',
    fontWeight: '600' as const,
    fontSize: '16px',
    border: '1px solid #ddd',
  },
  td: {
    padding: '12px 15px',
    textAlign: 'center' as const,
    borderBottom: '1px solid #e0e0e0',
    border: '1px solid #ddd',
    fontSize: '14px',
  },
  emptyCell: {
    padding: '20px',
    textAlign: 'center' as const,
    color: '#7f8c8d',
    fontStyle: 'italic' as const,
    border: '1px solid #ddd',
  },
  evenRow: {
    backgroundColor: '#f8f9fa',
  },
  oddRow: {
    backgroundColor: 'white',
  },
  exitButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
  },
  exitBtn: {
    padding: '12px 30px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600' as const,
    fontSize: '16px',
    transition: 'background-color 0.2s',
  },
};

export default TableResults;