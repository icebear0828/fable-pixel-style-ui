import { Button, Icon, Sprite, GHOST_SPRITE } from "@/components";
import { Layout } from "./docs/Layout";
import { Home } from "./docs/Home";
import { ComponentPage } from "./docs/ComponentPage";
import { GuidePage } from "./docs/Guides";
import { findDoc, href, useHashRoute, GUIDES, type GuideKey } from "./docs/registry";

const NotFound = () => (
  <div className="page" style={{ textAlign: "center", paddingTop: 80 }}>
    <Sprite {...GHOST_SPRITE} scale={6} animation="float" />
    <h1 className="page__title" style={{ justifyContent: "center", marginTop: 24 }}>
      404
    </h1>
    <p className="page__desc" style={{ margin: "0 auto 24px" }}>
      这片区域还没有被探索……
    </p>
    <Button type="primary" href={href("/")} icon={<Icon name="home" />}>
      BACK HOME
    </Button>
  </div>
);

function App() {
  const path = useHashRoute();
  let page: React.ReactNode;

  if (path === "/" || path === "") {
    page = <Home />;
  } else if (path.startsWith("/components/")) {
    const doc = findDoc(path.replace("/components/", ""));
    page = doc ? <ComponentPage doc={doc} /> : <NotFound />;
  } else if (path.startsWith("/guide/")) {
    const key = path.replace("/guide/", "") as GuideKey;
    page = GUIDES.some((g) => g.key === key) ? <GuidePage guide={key} /> : <NotFound />;
  } else {
    page = <NotFound />;
  }

  return <Layout path={path}>{page}</Layout>;
}

export default App;
