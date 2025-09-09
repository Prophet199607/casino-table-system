import React from "react";
import { THEME } from "../../../constants/theme";
import { ModalCard } from "../../../components/cards/ModalCard";

interface TableRow {
  type: string;
  shift: string;
  time: string;
  amount: number;
  cm5: number;
  cm1: number;
  cl5: number;
  cl1: number;
  ct50: number;
  ct10: number;
  ct5: number;
  ct1: number;
  ch5: number;
  ch1: number;
  c50: number;
  sendBy: string;
  appBy: string;
  id: string;
}

interface TransferRefillProps {
  onClose?: () => void;
}

const TransferRefill: React.FC<TransferRefillProps> = ({ onClose }) => {
  const data: TableRow[] = [];

  return (
    <div style={tableStyles.overlay}>
      <ModalCard
        width={THEME.size.frame.w}
        maxWidth="930px"
        height="auto"
        padding={0}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={tableStyles.container}>
          <h2 style={tableStyles.title}>Transfer & Refill</h2>
          <div style={tableStyles.scrollContainer}>
            <table style={tableStyles.table}>
              <thead>
                <tr>
                  <th style={tableStyles.th}>TYPE</th>
                  <th style={tableStyles.th}>SHIFT</th>
                  <th style={tableStyles.th}>TIME</th>
                  <th style={tableStyles.th}>AMOUNT</th>
                  <th style={tableStyles.th}>CM5</th>
                  <th style={tableStyles.th}>CM1</th>
                  <th style={tableStyles.th}>CL5</th>
                  <th style={tableStyles.th}>CL1</th>
                  <th style={tableStyles.th}>CT50</th>
                  <th style={tableStyles.th}>CT10</th>
                  <th style={tableStyles.th}>CT5</th>
                  <th style={tableStyles.th}>CT1</th>
                  <th style={tableStyles.th}>CH5</th>
                  <th style={tableStyles.th}>CH1</th>
                  <th style={tableStyles.th}>C50</th>
                  <th style={tableStyles.th}>SEND BY</th>
                  <th style={tableStyles.th}>APP BY</th>
                  <th style={tableStyles.th}>ID</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={18} style={tableStyles.emptyCell}>
                      No data available
                    </td>
                  </tr>
                ) : (
                  data.map((row, index) => (
                    <tr key={index} style={index % 2 === 0 ? tableStyles.evenRow : tableStyles.oddRow}>
                      <td style={tableStyles.td}>{row.type}</td>
                      <td style={tableStyles.td}>{row.shift}</td>
                      <td style={tableStyles.td}>{row.time}</td>
                      <td style={tableStyles.td}>{row.amount}</td>
                      <td style={tableStyles.td}>{row.cm5}</td>
                      <td style={tableStyles.td}>{row.cm1}</td>
                      <td style={tableStyles.td}>{row.cl5}</td>
                      <td style={tableStyles.td}>{row.cl1}</td>
                      <td style={tableStyles.td}>{row.ct50}</td>
                      <td style={tableStyles.td}>{row.ct10}</td>
                      <td style={tableStyles.td}>{row.ct5}</td>
                      <td style={tableStyles.td}>{row.ct1}</td>
                      <td style={tableStyles.td}>{row.ch5}</td>
                      <td style={tableStyles.td}>{row.ch1}</td>
                      <td style={tableStyles.td}>{row.c50}</td>
                      <td style={tableStyles.td}>{row.sendBy}</td>
                      <td style={tableStyles.td}>{row.appBy}</td>
                      <td style={tableStyles.td}>{row.id}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
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
    position: "fixed" as const,
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1001,
    padding: 16,
    color: "black",
  },
  container: {
    padding: "10px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    height: "500px",
    display: "flex",
    flexDirection: "column" as const,
  },
  title: {
    textAlign: "center" as const,
    color: "#2c3e50",
    marginBottom: "10px",
    fontSize: "24px",
    fontWeight: "bold" as const,
  },
  scrollContainer: {
    flex: 1,
    overflowY: "auto" as const,
    overflowX: "auto" as const,
    borderRadius: "8px",
    marginBottom: "16px",
  },
  table: {
    borderCollapse: "collapse" as const,
    backgroundColor: "white",
  },
  th: {
    padding: "8px",
    textAlign: "center" as const,
    backgroundColor: "#3498db",
    color: "white",
    fontWeight: "600" as const,
    fontSize: "16px",
    border: "1px solid #ddd",
    position: "sticky" as const, 
    top: 0,
    zIndex: 2,
  },
  td: {
    padding: "12px 15px",
    textAlign: "center" as const,
    borderBottom: "1px solid #e0e0e0",
    border: "1px solid #ddd",
    fontSize: "14px",
  },  
  emptyCell: {
    padding: "20px",
    textAlign: "center" as const,
    color: "#7f8c8d",
    fontStyle: "italic" as const,
    border: "1px solid #ddd",
  },
  evenRow: {
    backgroundColor: "#f8f9fa",
  },
  oddRow: {
    backgroundColor: "white",
  },
  exitButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px",
  },
  exitBtn: {
    padding: "12px 30px",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600" as const,
    fontSize: "16px",
    transition: "background-color 0.2s",
  },
};

export default TransferRefill;