import { Button, Card, Col, Flex, Input } from "antd";
import { useNavigate } from "react-router-dom";

export const SignUpPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/home');
    }

    return <Flex vertical gap="middle" justify="center" align="center" style={{ height: '100%' }}>
        <Card style={{ width: 400 }} title="Sign Up" bordered={false}>
            <Flex vertical gap="middle">
                <Col>
                    <Input placeholder="first name" />
                </Col>
                <Col>
                    <Input placeholder="last name" />
                </Col>
                <Col>
                    <Input placeholder="email" />
                </Col>
                <Col>
                    <Input placeholder="password" />
                </Col>
                <Col>
                    <Input placeholder="confirm password" />
                </Col>
                <Flex justify="center">
                    <Button type="primary" onClick={handleLogin}>Sign Up</Button>
                </Flex>
                <Flex align="center" style={{ marginTop: 10 }}>
                    <span>Already have an account?</span>
                    <Button type="link" onClick={() => navigate('/login')}>
                        Login
                    </Button>
                </Flex>
            </Flex>
        </Card>
    </Flex>
}