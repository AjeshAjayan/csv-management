import { Button, Card, Col, Flex, Form, Input, Modal, notification } from "antd"
import { useNavigate } from "react-router-dom"
import { loginAPI } from "../../api/loginAPI";
import { useState } from "react";

type FieldType = {
    email?: string;
    password?: string;
};

export const LoginPage = () => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [signUpConfirmation, setSignUpConfirmation] = useState(false);

    const handleLogin = (values: FieldType) => {
        setIsLoading(true);
        loginAPI(values.email ?? '', values.password ?? '').then(() => {
            navigate('/home');
            notification.success({
                message: `Successfully logged in`,
                description: '',
                placement: 'topRight',
            });
        }).catch((err) => {
            if (err.statusCode === 404) {
                setSignUpConfirmation(true);
            } else {
                notification.error({
                    message: `Error`,
                    description: err.message,
                    placement: 'topRight',
                });
            }
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const handleSignUpConfirmationClose = () => setSignUpConfirmation(false);

    const handleNavigationToSignUp = () => navigate('/sign-up');

    return <Flex vertical gap="middle" justify="center" align="center" style={{ height: '100%' }}>
        <Card style={{ width: 400 }} title="Login" bordered={false}>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                autoComplete="off"
                onFinish={handleLogin}
            >
                <Flex vertical gap="middle">
                    <Col>
                        <Form.Item<FieldType>
                            label=""
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                {
                                    type: 'email',
                                    message: 'Please enter a valid email address!',
                                },
                            ]}
                        >
                            <Input placeholder="email" />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item<FieldType>
                            label=""
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password placeholder="password" />
                        </Form.Item>
                    </Col>
                    <Flex justify="center">
                        <Form.Item label={''}>
                            <Button loading={isLoading} type="primary" htmlType="submit">
                                Log in
                            </Button>
                        </Form.Item>
                    </Flex>
                    <Flex justify="space-between" style={{ marginTop: 10 }}>
                        <Button type="text" onClick={() => {
                            alert('just for demo')
                        }}>Forgot Password?</Button>
                        <Button type="text" onClick={() => navigate('/sign-up')}>Sign Up</Button>
                    </Flex>
                </Flex>
            </Form>
        </Card>
        <Modal title="User not found..." 
            open={signUpConfirmation} 
            onOk={handleNavigationToSignUp} 
            onCancel={handleSignUpConfirmationClose}>
            <p>Do you want to sign up?</p>
        </Modal>
    </Flex>
}