import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type RowSelectionState
} from "@tanstack/react-table";
import { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../constants/colors";

type Props<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  onRowClick?: (row: T) => void;
};

const TableContainer = styled.div`
  flex: 1;
  overflow: auto;
  border: 1px solid ${COLORS.border.light};
  border-radius: 10px;
  background: white;
  min-height: 0;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 12px;
  background: ${COLORS.background.main};
  text-align: left;
  border-bottom: 1px solid ${COLORS.border.light};
  font-weight: 500;
  position: sticky;
  top: 0;
  z-index: 1;
  color: ${COLORS.text.muted};
  font-size: 14px;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid ${COLORS.border.subtle};
  font-size: 14px;
  color: ${COLORS.text.primary};
`;

const Tr = styled.tr`
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.background.hover};
  }
`;

const Button = styled.button`
  padding: 6px 12px;
  border: 1px solid ${COLORS.border.medium};
  border-radius: 6px;
  background: white;
  color: ${COLORS.text.secondary};
  font-size: 14px;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    background: ${COLORS.background.alt};
  }
`;

const PaginationFooter = styled.div`
  padding: 12px 16px;
  border-top: 1px solid ${COLORS.border.light};
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  font-size: 14px;
  color: ${COLORS.text.muted};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  position: relative; 
`;

export function DataGrid<T>({ data, columns, onRowClick }: Props<T>) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
        pagination: {
            pageSize: 10,
        }
    }
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      <TableContainer>
        <StyledTable>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id} style={{ width: header.column.getSize() }}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id} onClick={() => onRowClick?.(row.original)}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
      
      <PaginationFooter>
          <div style={{ flex: 1 }}></div> 
          
          <div style={{display: 'flex', gap: 16, alignItems: 'center'}}>
             <Button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                Previous
            </Button>
            
            <div style={{display: 'flex', gap: 4, alignItems: 'center', whiteSpace: 'nowrap'}}>
                <span>
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
                <span style={{color: COLORS.text.light}}>
                ({table.getFilteredRowModel().rows.length} rows)
                </span>
            </div>

            <Button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                Next
            </Button>
          </div>

           <div style={{ flex: 1 }}></div>
      </PaginationFooter>
    </div>
  );
}


