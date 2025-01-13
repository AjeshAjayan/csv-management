import { Card, Dropdown, Flex, Input, MenuProps, Pagination, Space, Spin, notification } from "antd"
import { DownOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from "react";
import { ImportCSV } from "./features/ImportCSV";
import { getProducts } from "../../api/getProducts";
import { ProductsResponse } from "../../models/ProductsResponse";
import { getUploadStatusAPI } from "../../api/getUploadStatusAPI";

const items: MenuProps['items'] = [
    {
        label: 'Alphabetical - ASC',
        key: 'productName',
    },
    {
        label: 'Alphabetical - DESC',
        key: '-productName',
    },
    {
        type: 'divider',
    },
    {
        label: 'Price - Highest to Lowest',
        key: '-price',
    },
    {
        label: 'Price - Lowest to Highest',
        key: 'price',
    },
    {
        type: 'divider',
    },
    {
        label: 'Date - ASC',
        key: 'createdAt',
    },
    {
        label: 'Date - DESC',
        key: '-createdAt',
    },
];

const DEFAULT_PAGE_SIZE = 10;

export const ProductsPage = () => {

    const [sort, setSort] = useState(items[6]);
    const [limit, setLimit] = useState(DEFAULT_PAGE_SIZE);
    const [page, setPage] = useState(1);
    const [productsRes, setProductsRes] = useState<ProductsResponse>({
        products: [],
        total: 0,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const clearIntervalRef = useRef<any>(null);

    useEffect(() => {
        fetchProducts({ limitArg: null, pageArg: null, sortArg: null, searchArg: null });

        startPolling();

        return () => {
            clearInterval(clearIntervalRef.current);
            clearIntervalRef.current = null;
        }
    }, [])

    const startPolling = () => {
        clearIntervalRef.current = setInterval(() => {
            getUploadStatusAPI().then((status) => {
                if (status.data.parsingInProgress) {
                    notification.warning({
                        message: `Products are still being uploaded`,
                        placement: 'topRight',
                    });
                } else if (status.data.uploadStatus === 'failed') {
                    notification.error({
                        message: `Last uploading attempt was a failure, please try again`,
                        placement: 'topRight',
                    })
                    clearInterval(clearIntervalRef.current);
                    clearIntervalRef.current = null;
                } else if (status.data.uploadStatus === 'completed') {
                    notification.success({
                        message: `Products uploaded successfully`,
                        placement: 'topRight',
                    })
                    fetchProducts({ limitArg: null, pageArg: null, sortArg: null, searchArg: null });
                    clearInterval(clearIntervalRef.current);
                    clearIntervalRef.current = null;
                } else {
                    clearInterval(clearIntervalRef.current);
                    clearIntervalRef.current = null;
                }
            })
        }, 3000);
    }

    const fetchProducts = ({
        limitArg,
        pageArg,
        sortArg,
        searchArg,
    }: {
        limitArg: null | number,
        pageArg: null | number,
        sortArg: null | string,
        searchArg: null | string,
    }) => {
        setIsLoading(true);
        getProducts(limitArg || limit, pageArg || page, sortArg || sort?.key as any, searchArg || search)
            .then(res => {
                setProductsRes(res.data);
            }).catch(err => {
                console.error(err);
                notification.error({
                    message: `Error fetching products`,
                    placement: 'topRight',
                })
            }).finally(() => {
                setIsLoading(false);
            });
    }


    const handlePaginationOnChange = (value: number, pageSizeValue: number) => {
        setLimit(value);
        setPage(pageSizeValue);
        fetchProducts({ limitArg: pageSizeValue, pageArg: value, sortArg: null, searchArg: null });
    };

    const handleSortOnClick = (item: any) => {
        setSort(items.find(i => i?.key === item.key) as any);
        fetchProducts({ limitArg: null, pageArg: null, sortArg: item.key, searchArg: null });
    }

    const handleAfterUploadingFinished = () => {
        fetchProducts({ limitArg: null, pageArg: null, sortArg: null, searchArg: null });
        if(clearIntervalRef.current === null) {
            startPolling();
        }
    }

    const handleSearch = (event: any) => {
        setSearch(event.target.value);
        fetchProducts({ limitArg: null, pageArg: null, sortArg: null, searchArg: event.target.value });
    }

    return (
        <Flex style={{ paddingBottom: 100 }} vertical justify="center" align="center" gap={24}>
            <div>
                <Flex style={{ marginBottom: 12 }} gap={12}>
                    <Input style={{ width: 400 }}
                        placeholder="Search by name or SKU"
                        onKeyUp={handleSearch}
                    />
                    <Dropdown menu={{ items, onClick: handleSortOnClick }} trigger={['click']}>
                        <a style={{ display: 'flex', alignItems: 'center' }} onClick={(e) => e.preventDefault()}>
                            <Space>
                                {(sort as any).label ?? 'sort'}
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </Flex>
                <Flex gap={12}>
                    <ImportCSV afterUploadingFinished={handleAfterUploadingFinished} />
                </Flex>
            </div>
            {
                isLoading
                    ? <Flex justify="">
                        <Spin />
                    </Flex>
                    : <Flex style={{ paddingLeft: '8rem' }} gap={20} wrap>
                        {
                            productsRes.products.map(product => (
                                <Card key={product._id} title={product.productName} bordered={false} style={{ width: 300 }}>
                                    <div>
                                        <label>SKU: {product.SKU}</label>
                                    </div>
                                    <div>
                                        <label>Price: {product.price}</label>
                                    </div>
                                    <p style={{ margin: 0 }}>{product.description}</p>
                                </Card>
                            ))
                        }
                    </Flex>
            }
            <Pagination defaultCurrent={1}
                total={productsRes.total}
                showSizeChanger
                defaultPageSize={DEFAULT_PAGE_SIZE}
                onChange={handlePaginationOnChange}
            />
        </Flex>
    )
}