import { APICallType } from "../../src";

type DataRow = {
    name:string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
};

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) : DataRow {
    return { name, calories, fat, carbs, protein };
  }
  
const rows: DataRow[] = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];


type ResponseT = DataRow[];

export const fetchData : APICallType< ResponseT > = {
    call: () => 
                new Promise<ResponseT>(resolve => {
                    setTimeout(resolve, 2000, rows)
                }),
};
