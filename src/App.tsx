import { Breadcrumb, Layout, Menu } from 'antd';
import './App.css';

const { Header, Content, Footer } = Layout;
function App() {
  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: "#fff" }}>
        <div className="logo" >

        </div>
        <Menu
          style={{ marginLeft: "100px" }}
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={new Array(3).fill(null).map((_, index) => ({
            key: String(index + 1),
            label: `nav ${index + 1}`,
          }))}
        />
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 800 }}>
          Content
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', width: "100%" }}>
        
        </Footer>
    </Layout>
  )
}

export default App;
