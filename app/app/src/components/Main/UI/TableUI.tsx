import MaterialReactTable , { type MRT_ColumnDef }  from 'material-react-table';
import React, { useMemo } from 'react';

type Props = {
  MonthData : {
    DATE:string;
    ITEM_NAME:string;
    MONEY:number;
    PAYMENT:string;
  }[]
};

type MonthData = {
  DATE:string;
  ITEM_NAME:string;
  MONEY:number;
  PAYMENT:string;
}




export const TableUI = ({MonthData}:Props) => {

  const columns = useMemo<MRT_ColumnDef<MonthData>[]>(
    () => [
      {
        accessorKey: 'DATE', //access nested data with dot notation
        header: '日付',
      },
      {
        accessorKey: 'PAYMENT',
        header: '入出区分',
      },
      {
        accessorKey: 'MONEY', //normal accessorKey
        header: '金額',
      },
    ],
    [],
  );

    return(
      <MaterialReactTable 
        columns={columns} 
        data={MonthData} 
      />
    )



}