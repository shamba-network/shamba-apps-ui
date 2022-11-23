import { Outlet } from "react-router-dom"
import { Layout } from "antd"
import { NavBar } from "../components";

const { Header, Content, Footer } = Layout;

export const AppsRoot:React.FC = () => {

  const year = new Date().getFullYear()

  return (
    <Layout>

      <Header className="header">
        <NavBar />
      </Header>

      <Content className="content">
        <Outlet />
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        {`Shamba ${year}`}
      </Footer>
    </Layout>
  )
}
