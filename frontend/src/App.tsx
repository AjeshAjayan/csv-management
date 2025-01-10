import { Layout, Menu } from 'antd'
import { Header, Content } from 'antd/es/layout/layout'
import { Link, Outlet } from 'react-router-dom'

function App() {

  return (
    <Layout style={{ height: '100%' }}>
      <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            items={[
              {
                key: '1',
                label: <Link to="login">Log in</Link>,
              },
              {
                key: '2',
                label: <Link to="home">Home</Link>,
              },
            ]}
          />
      </Header>
      <Content style={{ padding: '2rem', height: '100%' }}>
        <div>
          <Outlet />
        </div>
      </Content>
    </Layout>
  )
}

export default App
