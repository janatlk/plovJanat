export interface IDishShort {
    name: string;
    description: string;
    price: number;
}

export interface IDish extends IDishShort {
    id: string;
}

export interface IDishesList {
    [id: string]: IDishShort;
}
export interface IBasket {
    dish: IDish
    count: number
    }
    export interface IBasketState {
    items: IBasket[]
    totalPrice: number
    totalCount: number
    }
    