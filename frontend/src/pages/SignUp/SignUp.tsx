import { Button, Card, Col, Flex, Form, Input, notification } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpAPI } from "../../api/signUpAPI";

type FormFields = {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
};

export const SignUpPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    
    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = (values: FormFields) => {
        setIsLoading(true);
        signUpAPI(
            values.email ?? '', 
            values.password ?? '',
            values.firstName ?? '', 
            values.lastName ?? ''
        ).then(() => {
            notification.success({
                message: `Successfully signed`,
                description: 'Enter credentials to login',
                placement: 'topRight',
            });
            navigate('/login');
        }).catch((err) => {
            notification.error({
                message: `Error`,
                description: err.message,
                placement: 'topRight',
            });
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const confirmPasswordValidator = (_: any, value: any, callback: any) => {
        console.log(form.getFieldValue('password'), _);
        if (!value) {
            callback('Please confirm your password!');
        } else if (value !== form.getFieldValue('password')) {
            callback('The two passwords that you entered do not match!');
        } else {
            callback();
        }
    };

    return <Flex vertical gap="middle" justify="center" align="center" style={{ height: '100%' }}>
        <Card style={{ width: 400 }} title="Sign Up" bordered={false}>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                form={form}
                autoComplete="off"
                onFinish={handleSignUp}
            >
                <Flex vertical gap="middle">
                    <Col>
                        <Form.Item<FormFields>
                            label=""
                            name="firstName"
                            rules={[
                                { required: true, message: 'This field is required' },
                            ]}
                        >
                            <Input placeholder="first name" />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item<FormFields>
                            label=""
                            name="lastName"
                            rules={[
                                { required: true, message: 'This field is required' },
                            ]}
                        >
                            <Input placeholder="last name" />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item<FormFields>
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
                        <Form.Item<FormFields>
                            label=""
                            name="password"
                            rules={[
                                { required: true, message: 'This field is required' },
                                {
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message: 'Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character.',
                                },
                            ]}
                        >
                            <Input.Password placeholder="password" />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item<FormFields>
                            label=""
                            name="confirmPassword"
                            rules={[
                                { required: true, message: 'This field is required' },
                                { validator: confirmPasswordValidator }
                            ]}
                        >
                            <Input.Password placeholder="confirm password" />
                        </Form.Item>
                    </Col>
                    <Flex justify="center">
                        <Form.Item label={''}>
                            <Button loading={isLoading} type="primary" htmlType="submit">Sign Up</Button>
                        </Form.Item>

                    </Flex>
                    <Flex align="center" style={{ marginTop: 10 }}>
                        <span>Already have an account?</span>
                        <Button type="link" onClick={() => navigate('/login')}>
                            Login
                        </Button>
                    </Flex>
                </Flex>
            </Form>
        </Card>
    </Flex>
}