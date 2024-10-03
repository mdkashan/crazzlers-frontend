import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from 'react-table';
import TableHOC from "../components/admin/TableHOC";
import { Skeleton } from "../components/Loader";
import { useMyOrdersQuery } from "../redux/api/orderAPI";
import { CustomError } from "../types/api-types";
import { UserReducerInitialState } from "../types/reducer-types";

    type DataType = {
        _id: string;
        amount:number;
        quantity:number;
        discount:number;
        status:ReactElement;
        action:ReactElement;
    };


    const column: Column<DataType>[] =[
        {
        Header : "ID",
        accessor:'_id',
        },
        {
            Header : "Quantity",
            accessor:'quantity',
        },
        {
            Header : "Discount",
            accessor:'discount',
        },
        {
            Header : "Amount",
            accessor:'amount',
        },
        {
            Header : "Status",
            accessor:'status',
        },
        {
            Header : "Action",
            accessor:'action',
        },
]

function Orders() {

  const { user } = useSelector((state: {userReducer: UserReducerInitialState}) => state.userReducer );
  const {  data, isLoading, isError, error  } = useMyOrdersQuery(user?._id!)


    const [rows, setRows] = useState<DataType[]>([]);

    if(isError) {
        const err = error as CustomError;
        toast.error(err.data.message);
      };
    
      useEffect(()=>{
        if(data) {
          setRows(
            data.orders.map((order) => ({
              _id:order._id,
              amount:order.total,
              discount:order.discount,
              quantity:order.orderItems.length,
              status:<span
              className={order.status==="Processing"?"red":order.status==="Shipped"?"green":"purple"}>{order.status}</span>,
              action: <Link to={`/admin/transaction/${order._id}`}>Manage</Link>
            }))
          )
        }
      },[data]);
    

    const Table = TableHOC<DataType>(column, rows, "dashboard-product-box", "Orders", rows.length > 6)()
    return (
        <div className='container'>
            {/* <h1>Orders page</h1> */}
            <main>{isLoading? <Skeleton length={20}/> : Table}</main>
        </div>
    )
}

export default Orders;