import { Layout, Menu, Button, Space } from 'antd';
import { useRoutes, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import routers from './services/routes';
import './App.css';
const { Header, Content, Footer } = Layout;

const items = [
  {
    label: '族库',
    key: '/'
  },
  {
    label: '插件',
    key: 'plugin',
  }
]

function App() {
  const navigate = useNavigate();
  const elements = useRoutes(routers);
  const location = useLocation();
  const navigatePath = location.pathname.length > 1 ? location.pathname.slice(1) : location.pathname;
  const [pathKey, setPathKey] = useState<string>(navigatePath);

  useEffect(() => {
    setPathKey(navigatePath)
  }, [navigatePath])

  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 9999, width: '100%', background: "#fff", border: "1px solid #f0f0f0" }}>
        <div>
          <div className='iconContainer'>

          </div>
          <div className='navigateContainer' >
            <Menu
              items={items}
              multiple={false}
              selectedKeys={[pathKey]}
              mode='horizontal'
              onClick={(event) => {
                navigate(event.key, {
                  replace: false
                })
              }} />
          </div>
          <div className='extensContainer'>
            <Space >
              <Button type='link' onClick={() => {

              }}>
                帮助
              </Button>
              <Button type='link' onClick={() => {

              }}>
                反馈
              </Button>
              <Button type='link' onClick={() => {
                navigate('login')
                setPathKey('');
              }}>
                登录
              </Button>
            </Space>
          </div>
        </div>
      </Header>
      <Content style={{ marginTop: 64, background: "white" }}>
        <div className='contentContainer'>
          {elements}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', position: "relative", width: '100%', backgroundColor: "black", bottom: "0px" }}>
        <span style={{ color: "white" }}>
          蜀ICP备2021031394号
        </span>
      </Footer>
    </Layout >
  )
}
export default App;
