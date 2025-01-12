export type Response<T> = {
    message: string,
    statusCode: number,
    status: "success" | "error" | "bad-request" | "unauthorized" | "forbidden",
    data: T
}
