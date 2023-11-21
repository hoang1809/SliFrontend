import { LayoutProps } from 'models/common';
import React from 'react';
import { Layout } from 'antd';
import Sidebar from '../sidebar';
import Footer from '../footer';
import Header from '../header';
const { Sider, Content } = Layout;
const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div id="components-layout-demo-custom-trigger">
      <Layout className="min-h-screen flex-row">
        {/* this is sidebar if exist */}
        {/* <div className="hidden desktop:block">
          <Sidebar />
        </div> */}
        <Layout className="site-layout">
          {/* <Header className="site-layout-background" style={{ padding: 0 }}>
            <AppHeader />
          </Header> */}
          <Header />
          <Content className="site-layout-background">
            <div className="h-full">{children}</div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </div>
  );
};

export default MainLayout;
