import { Button, Card, Col, Flex, Input } from "antd"
import { useNavigate } from "react-router-dom"

export const LoginPage = () => {

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/home');
    }

    return <Flex vertical gap="middle" justify="center" align="center" style={{ height: '100%' }}>
        <Card style={{ width: 400 }} title="Login" bordered={false}>
            <Flex vertical gap="middle">
                <Col>
                    <Input placeholder="email" />
                </Col>
                <Col>
                    <Input placeholder="password" />
                </Col>
                <Flex justify="center">
                    <Button type="primary" onClick={handleLogin}>Login</Button>
                </Flex>
                <Flex justify="space-between" style={{ marginTop: 10 }}>
                    <Button type="text" onClick={() => {
                        alert('just for demo')
                    }}>Forgot Password?</Button>
                    <Button type="text" onClick={() => navigate('/sign-up')}>Sign Up</Button>
                </Flex>
            </Flex>
        </Card>
    </Flex>
}