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

const DataGridContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background: white;
  border-right: 1px solid ${COLORS.border.light}; /* Separate DataGrid from Panel with internal border */
`;

const TableScrollArea = styled.div`
  flex: 1;
  overflow: auto;
  min-height: 0;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate; /* Required for sticky header border */
  border-spacing: 0;
`;

const Th = styled.th`
  padding: 16px 24px;
  background: ${COLORS.background.white};
  text-align: left;
  border-bottom: 1px solid ${COLORS.border.light};
  font-weight: 500;
  position: sticky;
  top: 0;
  z-index: 10;
  color: ${COLORS.text.muted};
  font-size: 13px;
  white-space: nowrap;
`;

const Td = styled.td`
  padding: 16px 24px;
  border-bottom: 1px solid ${COLORS.border.subtle};
  font-size: 14px;
  color: ${COLORS.text.primary};
  background: white;
`;

const Tr = styled.tr`
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: ${COLORS.background.hover};
    td { background-color: ${COLORS.background.hover}; }
  }
`;

// Footer with sticky positioning manually or just flex
const PaginationFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid ${COLORS.border.light};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  font-size: 14px;
  color: ${COLORS.text.muted};
  flex-shrink: 0;
  z-index: 20;
`;

const Button = styled.button`
  padding: 8px 14px;
  border: 1px solid ${COLORS.border.medium};
  border-radius: 8px;
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
    <DataGridContainer>
      <TableScrollArea>
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
      </TableScrollArea>
      
      <PaginationFooter>
          <div style={{color: COLORS.text.light}}>
             Showing 1 to {table.getRowModel().rows.length} of {data.length} entries
          </div> 
          
          <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
             <Button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                Previous
            </Button>
            
            <div style={{display: "flex", gap: 4}}>
               <div style={{width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", background: COLORS.background.alt, borderRadius: 6, fontSize: 13, fontWeight: 500}}>
                   {table.getState().pagination.pageIndex + 1}
               </div>
            </div>

            <Button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                Next
            </Button>
          </div>
      </PaginationFooter>
    </DataGridContainer>
  );
}


