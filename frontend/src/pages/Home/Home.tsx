import { Button, Card, Flex } from "antd"
import Title from "antd/es/typography/Title"
import { formatCompactNumber } from "../../utils/formatCompactNumber"

export const HomePage = () => {
    return (
        <Flex style={{ paddingBottom: 168, paddingLeft: '8rem', paddingRight: '8rem' }} vertical justify="start">
            <Flex gap={20} wrap>
                <Card title="Total number of products" bordered={false} style={{ width: 300 }}>
                    <Title>{formatCompactNumber(1000000)}</Title>
                </Card>
                <Card title="Total worth" bordered={false} style={{ width: 300 }}>
                    <Title>{formatCompactNumber(1000000000)}</Title>
                </Card>
                <Card title="" bordered={false} style={{ width: 300 }}>
                    <Flex style={{ height: '13rem' }} justify="center" align="center">
                        <Button type="primary">All products</Button>
                    </Flex>
                </Card>
            </Flex>
            <Flex vertical>
                <Title level={4}>Last add 5</Title>
                <Flex gap={20} wrap>
                <Card title="Name" bordered={false} style={{ width: 300 }}>
                    <div>
                        <label>SKU: 123345</label>
                    </div>
                    <div>
                        <label>Price: 100</label>
                    </div>
                    <p style={{ margin: 0 }}>description</p>
                </Card>
                <Card title="Name" bordered={false} style={{ width: 300 }}>
                    <div>
                        <label>SKU: 123345</label>
                    </div>
                    <div>
                        <label>Price: 100</label>
                    </div>
                    <p style={{ margin: 0 }}>description</p>
                </Card>
                <Card title="Name" bordered={false} style={{ width: 300 }}>
                    <div>
                        <label>SKU: 123345</label>
                    </div>
                    <div>
                        <label>Price: 100</label>
                    </div>
                    <p style={{ margin: 0 }}>description</p>
                </Card>
                <Card title="Name" bordered={false} style={{ width: 300 }}>
                    <div>
                        <label>SKU: 123345</label>
                    </div>
                    <div>
                        <label>Price: 100</label>
                    </div>
                    <p style={{ margin: 0 }}>description</p>
                </Card>
                <Card title="Name" bordered={false} style={{ width: 300 }}>
                    <div>
                        <label>SKU: 123345</label>
                    </div>
                    <div>
                        <label>Price: 100</label>
                    </div>
                    <p style={{ margin: 0 }}>description</p>
                </Card>
                </Flex>
            </Flex>
            <Flex vertical>
                <Title level={4}>First add 5</Title>
                <Flex gap={20} wrap>
                <Card title="Name" bordered={false} style={{ width: 300 }}>
                    <div>
                        <label>SKU: 123345</label>
                    </div>
                    <div>
                        <label>Price: 100</label>
                    </div>
                    <p style={{ margin: 0 }}>description</p>
                </Card>
                <Card title="Name" bordered={false} style={{ width: 300 }}>
                    <div>
                        <label>SKU: 123345</label>
                    </div>
                    <div>
                        <label>Price: 100</label>
                    </div>
                    <p style={{ margin: 0 }}>description</p>
                </Card>
                <Card title="Name" bordered={false} style={{ width: 300 }}>
                    <div>
                        <label>SKU: 123345</label>
                    </div>
                    <div>
                        <label>Price: 100</label>
                    </div>
                    <p style={{ margin: 0 }}>description</p>
                </Card>
                <Card title="Name" bordered={false} style={{ width: 300 }}>
                    <div>
                        <label>SKU: 123345</label>
                    </div>
                    <div>
                        <label>Price: 100</label>
                    </div>
                    <p style={{ margin: 0 }}>description</p>
                </Card>
                <Card title="Name" bordered={false} style={{ width: 300 }}>
                    <div>
                        <label>SKU: 123345</label>
                    </div>
                    <div>
                        <label>Price: 100</label>
                    </div>
                    <p style={{ margin: 0 }}>description</p>
                </Card>
                </Flex>
            </Flex>
            <Flex vertical>
                <Title level={4}>Highest priced 5</Title>
                <Flex gap={20} wrap>
                <Card title="Name" bordered={false} style={{ width: 300 }}>
                    <div>
                        <label>SKU: 123345</label>
                    </div>
                    <div>
                        <label>Price: 100</label>
                    </div>
                    <p style={{ margin: 0 }}>description</p>
                </Card>
                <Card title="Name" bordered={false} style={{ width: 300 }}>
                    <div>
                        <label>SKU: 123345</label>
                    </div>
                    <div>
                        <label>Price: 100</label>
                    </div>
                    <p style={{ margin: 0 }}>description</p>
                </Card>
                <Card title="Name" bordered={false} style={{ width: 300 }}>
                    <div>
                        <label>SKU: 123345</label>
                    </div>
                    <div>
                        <label>Price: 100</label>
                    </div>
                    <p style={{ margin: 0 }}>description</p>
                </Card>
                <Card title="Name" bordered={false} style={{ width: 300 }}>
                    <div>
                        <label>SKU: 123345</label>
                    </div>
                    <div>
                        <label>Price: 100</label>
                    </div>
                    <p style={{ margin: 0 }}>description</p>
                </Card>
                <Card title="Name" bordered={false} style={{ width: 300 }}>
                    <div>
                        <label>SKU: 123345</label>
                    </div>
                    <div>
                        <label>Price: 100</label>
                    </div>
                    <p style={{ margin: 0 }}>description</p>
                </Card>
                </Flex>
            </Flex>
            <Flex vertical>
                <Title level={4}>Lowest priced 5</Title>
                <Flex gap={20} wrap>
                <Card title="Name" bordered={false} style={{ width: 300 }}>
                    <div>
                        <label>SKU: 123345</label>
                    </div>
                    <div>
                        <label>Price: 100</label>
                    </div>
                    <p style={{ margin: 0 }}>description</p>
                </Card>
                <Card title="Name" bordered={false} style={{ width: 300 }}>
                    <div>
                        <label>SKU: 123345</label>
                    </div>
                    <div>
                        <label>Price: 100</label>
                    </div>
                    <p style={{ margin: 0 }}>description</p>
                </Card>
                <Card title="Name" bordered={false} style={{ width: 300 }}>
                    <div>
                        <label>SKU: 123345</label>
                    </div>
                    <div>
                        <label>Price: 100</label>
                    </div>
                    <p style={{ margin: 0 }}>description</p>
                </Card>
                <Card title="Name" bordered={false} style={{ width: 300 }}>
                    <div>
                        <label>SKU: 123345</label>
                    </div>
                    <div>
                        <label>Price: 100</label>
                    </div>
                    <p style={{ margin: 0 }}>description</p>
                </Card>
                <Card title="Name" bordered={false} style={{ width: 300 }}>
                    <div>
                        <label>SKU: 123345</label>
                    </div>
                    <div>
                        <label>Price: 100</label>
                    </div>
                    <p style={{ margin: 0 }}>description</p>
                </Card>
                </Flex>
            </Flex>
        </Flex>
    )
}