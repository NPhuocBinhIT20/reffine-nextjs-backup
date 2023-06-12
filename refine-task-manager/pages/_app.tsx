import { OffLayoutArea } from "@components/offLayoutArea";
import {
  AuthPage,
  ErrorComponent,
  Layout,
  ReadyPage,
  notificationProvider,
} from "@pankod/refine-antd";
import "@pankod/refine-antd/dist/reset.css";
import { Refine } from "@pankod/refine-core";
import { AntdInferencer } from "@pankod/refine-inferencer/antd";
import { RefineKbarProvider } from "@pankod/refine-kbar";
import routerProvider from "@pankod/refine-nextjs-router";
import { dataProvider } from "@pankod/refine-supabase";
import { AppProps } from "next/app";
import { authProvider } from "src/authProvider";
import { supabaseClient } from "src/utility";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <RefineKbarProvider>
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider(supabaseClient)}
        authProvider={authProvider}
        LoginPage={AuthPage}
        notificationProvider={notificationProvider}
        Layout={Layout}
        ReadyPage={ReadyPage}
        catchAll={<ErrorComponent />}
        resources={[
          {
            name: "posts",
            list: AntdInferencer,
            edit: AntdInferencer,
            show: AntdInferencer,
            create: AntdInferencer,
            canDelete: true,
          },
        ]}
        OffLayoutArea={OffLayoutArea}
      >
        <Component {...pageProps} />
      </Refine>
    </RefineKbarProvider>
  );
}

export default MyApp;
