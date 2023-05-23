import MaterialReactTable , { type MRT_ColumnDef }  from 'material-react-table';
import React, { useMemo } from 'react';

type Props = {
  MonthData : {
    DATE:string;
    ITEM_NAME:string;
    MONEY:number;
    PAYMENT:string;
    USER_ID:string;
    USER_EMAIL:string;
    TAG:string
  }[]
};

type MonthData = {
  DATE:string;
  ITEM_NAME:string;
  MONEY:number;
  PAYMENT:string;
  USER_ID:string;
  USER_EMAIL:string;
  TAG:string
}




export const TableUI = ({MonthData}:Props) => {

  const columns = useMemo<MRT_ColumnDef<MonthData>[]>(
    () => [
      {
        accessorKey: 'DATE', //access nested data with dot notation
        header: '日付',
        size : 30 , //小さな列  
      },
      {
        accessorKey: 'PAYMENT',
        header: '入出区分',
        size : 40 , //小さな列  
      },
      {
        accessorKey: 'MONEY', //normal accessorKey
        header: '金額',
        size : 50 , //小さな列  
      },
      {
        accessorKey: 'USER_ID', //normal accessorKey
        header: '登録者',
        size : 50 , //小さな列  
      },
      {
        accessorKey: 'ITEM_NAME', //normal accessorKey
        header: '備考',
        size : 50 , //小さな列  
      },
    ],
    [],
  );

    return(
      <MaterialReactTable 
        columns={columns} 
        data={MonthData} 
        rowCount={MonthData.length}
      />
    )



}