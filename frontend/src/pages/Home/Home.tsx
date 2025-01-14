import { Button, Card, Flex, Spin, notification } from "antd"
import Title from "antd/es/typography/Title"
import { formatCompactNumber } from "../../utils/formatCompactNumber"
import { useEffect, useState } from "react"
import { dashboardInsightAPI } from "../../api/dashboardInsightAPI"
import { Product } from "../../models/Products"
import { Link } from "react-router-dom"

export const HomePage = () => {

    const [last5, setLast5] = useState<Product[]>([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        dashboardInsightAPI().then((res) => {
            setLast5(res.data.last5Products);
            setTotalProducts(res.data.totalProducts);
            setTotalPrice(res.data.totalPrice);
        }).catch(() => {
            notification.destroy()
            notification.error({
                message: `Error fetching dashboard insight`,
                placement: 'topRight',
            })
        }).finally(() => {
            setIsLoading(false);
        })
    }, [])

    return (
        <Flex style={{ paddingBottom: 168, paddingLeft: '8rem', paddingRight: '8rem' }} vertical justify="start">
            {
                isLoading
                    ? <Flex justify="center">
                        <Card bordered={false}>
                            <Spin />
                        </Card>
                    </Flex>
                    : <>
                        <Flex gap={20} wrap>
                            <Card title="Total number of products" bordered={false} style={{ width: 300 }}>
                                <Title>{formatCompactNumber(totalProducts)}</Title>
                            </Card>
                            <Card title="Total worth" bordered={false} style={{ width: 300 }}>
                                <Title>{formatCompactNumber(totalPrice)}</Title>
                            </Card>
                            <Card title="" bordered={false} style={{ width: 300 }}>
                                <Flex style={{ height: '13rem' }} justify="center" align="center">
                                    <Link to={'/home/products'}>
                                        <Button type="primary">All products</Button>
                                    </Link>
                                </Flex>
                            </Card>
                        </Flex>
                        {
                            last5.length > 0 && <Flex vertical>
                                <Title level={4}>Last add 5</Title>
                                <Flex gap={20} wrap>
                                    {
                                        last5.map(product => (
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
                            </Flex>
                        }
                    </>
            }
        </Flex>
    )
}