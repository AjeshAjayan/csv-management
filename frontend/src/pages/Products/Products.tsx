import { Button, Card, Dropdown, Flex, Input, MenuProps, Pagination, Space } from "antd"
import { DownOutlined } from '@ant-design/icons';

const items: MenuProps['items'] = [
    {
        label: 'Alphabetical - ASC',
        key: '1',
    },
    {
        label: 'Alphabetical - DESC',
        key: '2',
    },
    {
        type: 'divider',
    },
    {
        label: 'Price - Highest to Lowest',
        key: '3',
    },
    {
        label: 'Price - Lowest to Highest',
        key: '3',
    },
];

export const ProductsPage = () => {
    return (
        <Flex vertical justify="center" align="center" gap={24}>
            <Flex gap={12}>
                <Button type="primary">Import</Button>
                <Input style={{ width: 400 }} placeholder="Search by name or SKU" />
                <Dropdown menu={{ items }} trigger={['click']}>
                    <a style={{ display: 'flex', alignItems: 'center' }} onClick={(e) => e.preventDefault()}>
                        <Space>
                            Click me
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </Flex>
            <Flex style={{ paddingLeft: '8rem' }} gap={20} wrap>
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
            <Pagination defaultCurrent={1}
                total={50}
                showSizeChanger
                onShowSizeChange={() => { }}
                defaultPageSize={20}
                onChange={() => { }}
            />
        </Flex>
    )
}