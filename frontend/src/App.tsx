import { Avatar, Button, Layout, Menu, Modal } from 'antd'
import { Header, Content } from 'antd/es/layout/layout'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';

function App() {
  const navigate = useNavigate();
  const [signOutConfirmation, setSignOutConfirmation] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login')
  }

  const handleSignOutConfirmationClose = () => setSignOutConfirmation(false);

  return (
    <Layout style={{ height: '100%' }}>
      <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            items={[
              {
                key: '1',
                label: <>{
                  localStorage.getItem('token') 
                    ? <Avatar size={36} icon={<UserOutlined />} /> 
                    : <Link to="login">Log in</Link>

                }</>,
              },
              {
                key: '2',
                label: <Link to="home">Home</Link>,
              },
              {
                key: '3',
                label: <Link to="products">Products</Link>,
              },
              {
                key: '4',
                label: <Button onClick={() => setSignOutConfirmation(true)} type='primary'>Log out</Button>,
              },
            ]}
          />
      </Header>
      <Content style={{ padding: '2rem', height: '100%' }}>
        <div>
          <Outlet />
        </div>
      </Content>
      <Modal title="Log out?" 
        open={signOutConfirmation} 
        onOk={handleSignOut} 
        onCancel={handleSignOutConfirmationClose}>
        <p>Are you sure?</p>
      </Modal>
    </Layout>
  )
}

export default App
