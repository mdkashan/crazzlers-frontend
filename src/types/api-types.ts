import { Bar, CartItem, Line, Order, Pie, Product, ShippingInfo, Stats, User } from "./types";

export type CustomError = {
    status:number;
    data :{
        message:string;
        success:boolean;
    }
} 
export type MessageResponse = {
    message:string,
    success:boolean,
}

export type AllUsersResponse = {
    users: User[];
    success:boolean;
}

export interface UserResponse{
    success: boolean;
    user: User;
} 

export interface AllProductResponse{
    success: boolean;
    products: Product[];
} 

export interface CategoriesResponse{
    success: boolean;
    categories: string[];
} 

export type SearchProductsResponse = {
    success: boolean;
    products: Product[];
    totalPage:number;
}


export type SearchProductsRequest = {
    price: string;
    page: number;
    category: string;
    search: string;
    sort: string;
}

export type ProductResponse = {
    success: boolean;
    product: Product;
}

export type NewProductRequest = {
    id:string,
    formData: FormData,
}

export type UpdateProductRequest = {
    userId: string,
    productId: string,
    formData: FormData,
}

export type deleteProductRequest = {
    userId: string,
    productId: string,
}

export type DeleteUserRequest = {
    userId: string;
    adminUserId: string;
}

export type NewOrderRequest = {
    orderItems :CartItem[],
    subTotal:number;
    tax:number;
    shippingCharges:number;
    discount:number;
    total:number;
    shippingInfo: ShippingInfo;
    user:string;
}

export type UpdateOrderRequest = {
    userId:string;
    orderId:string;
}

export type AllOrdersResponse = {
    success: boolean;
    orders: Order[];
}

export type OrderDetailsResponse = {
    success: boolean;
    order: Order;
}

export type StatsResponse = {
    success: boolean;
    stats: Stats;
} 

export type PieResponse = {
    success: boolean;
    charts: Pie;
}

export type BarResponse = {
    success: boolean;
    charts: Bar;
} 

export type LineResponse = {
    success: boolean;
    charts: Line;
} 