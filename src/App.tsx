import { Layout, Menu, Row, Col, Button, Space } from 'antd';
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
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: "#fff" }}>
        <Row>
          <Col span={2}>
            <div className="logo" >

            </div>
          </Col>
          <Col span={20}>
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
          </Col>
          <Col span={2}>
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
                navigate('register')
                setPathKey('');
              }}>
                注册
              </Button>
            </Space>
          </Col>
        </Row>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 1200 }}>
          {elements}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', position: "relative", width: '100%', backgroundColor: "black", bottom: "0px", marginBottom: 0 }}>
        <span style={{ color: "white" }}>
          蜀ICP备2021031394号
        </span>
      </Footer>
    </Layout>
  )
}
export default App;
