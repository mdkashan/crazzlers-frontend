export interface User {
    name:string;
    email:string;
    photo:string;
    gender:string;
    dob:string;
    _id:string;
    role:string;
};

export interface Product {
    name:string;
    price:number;
    stock:number;
    category:string;
    photo:string;
    _id:string;
};

export type ShippingInfo =  {
    address:string;
    pincode:string;
    city:string;
    country:string;
    state:string;
};

export type CartItem =  {
    productId:string;
    name:string;
    price:number;
    photo:string;
    quantity:number;
    stock:number;
};

export type OrderItem =  Omit<CartItem, "stock"> & { _id: string; };

export type Order = {
    orderItems: OrderItem[];
    shippingInfo: ShippingInfo;
    subTotal:number;
    tax:number;
    shippingCharges:number;
    discount:number;
    total:number;
    status:string;
    user:{
        name:string;
       _id:string;
    };
    _id:string;
};

type CountAndChange = {
    revenue: number;
    product: number;
    user: number;
    order:number;
};

type LatestTransaction = {
    _id: string;
    amount:number;
    discount:number;
    quantity:number;
    status:string;
}

export type Stats = {
    categoryCount:Record<string, number>[];
    changePercent:CountAndChange;
    counts:CountAndChange;
    chart:{
        order:number[],
        revenue:number[],
    },
    UserRatio:{
        male:number;
        female:number;
    },
    latestTransaction: LatestTransaction[]
}

type RevenueDistribution = {
    netMargin: number;
    discountCost: number;
    shippingCost: number;
    burnt: number;
    marketingCost: number;
}

type OrderFullfillment = {
    processing: number;
    shipped: number;
    delivered: number;
};

type UsersAgeGroup = {
    teen: number;
    adult: number;
    old: number;
};

export type Pie = {
    orderFullfillment: OrderFullfillment;
    productCategories: Record<string, number>[];
    stockAvailibility:{
        inStock: number;
        outOfStock: number;
    };
    revenueDistribution:RevenueDistribution;
    adminCustomer:{
        admin: number;
        customes: number;
    };
    usersAgeGroup: UsersAgeGroup;
};

export type Bar = {
    users:number[];
    products:number[];
    orders:number[];
}

export type Line = {
    users:number[];
    products:number[];
    discount:number[];
    revenue:number[];
}