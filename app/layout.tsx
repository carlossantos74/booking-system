/* Components */
import { Providers } from '@/lib/providers'

import './styles/globals.css'


export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <section>{props.children}</section>
        </body>
      </html>
    </Providers>
  )
}
