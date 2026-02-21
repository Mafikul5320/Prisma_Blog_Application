import { skip } from "node:test";

type pagination = {
    page?: number,
    limit?: number | string,
    orderBy?: string,
    sortBy?: string
}

type result = {
    page: number,
    limit: number,
    skip: number,
    sortBy: string,
    orderBy: string
}

const Pagination = (option: pagination): result => {
    const page: number = Number(option.page) || 1;
    const limit = Number(option.limit) || 10;
    const skip: number = (page - 1) * limit;
    const sortBy: string = option.sortBy || "createAt";
    const orderBy: string = option.orderBy || "desc";
    return {
        page,
        limit,
        skip,
        sortBy,
        orderBy
    }
}

export default Pagination;