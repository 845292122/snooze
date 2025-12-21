'use client'

import { Layout } from 'antd'
import { createStyles } from 'antd-style'

const useStyles = createStyles(() => {
  return {
    appContainer: {
      display: 'flex',
      width: '100vw',
      height: '100vh'
    }
  }
})

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { styles } = useStyles()
  return (
    <Layout className={styles.appContainer}>
      <Layout.Sider></Layout.Sider>
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  )
}
