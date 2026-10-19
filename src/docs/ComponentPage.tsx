import React from "react";
import { Button, Icon, Table, Tag, Tooltip, type TableColumn } from "@/components";
import { DemoBlock } from "./DemoBlock";
import { ALL_DOCS, categoryLabel, href, storybookUrl } from "./registry";
import type { ComponentDoc, PropRow } from "./types";

const propColumns: TableColumn<PropRow>[] = [
  { key: "name", title: "PROP", dataIndex: "name", width: 180 },
  { key: "desc", title: "DESC", dataIndex: "desc" },
  { key: "type", title: "TYPE", dataIndex: "type", render: (v) => <code>{v}</code> },
  { key: "default", title: "DEFAULT", dataIndex: "default", width: 120, render: (v) => v ?? "-" },
];

export const ComponentPage: React.FC<{ doc: ComponentDoc }> = ({ doc }) => {
  const idx = ALL_DOCS.findIndex((d) => d.key === doc.key);
  const prev = ALL_DOCS[idx - 1];
  const next = ALL_DOCS[idx + 1];
  const cat = categoryLabel(doc.category);
  return (
    <div className="page">
      <header className="page__head">
        <div className="page__crumb">
          <a href={href("/")} style={{ textDecoration: "none" }}>
            HOME
          </a>
          <Icon name="chevronRight" size={8} />
          <span>{cat.en}</span>
          <Icon name="chevronRight" size={8} />
          <span>{doc.name.toUpperCase()}</span>
        </div>
        <h1 className="page__title">
          {doc.name} <small>{doc.cn}</small>
        </h1>
        <p className="page__desc">{doc.desc}</p>
        <div className="page__links">
          <Tag color="blue" variant="light" icon={<Icon name={doc.icon} size={10} />}>
            {cat.en}
          </Tag>
          <Tag variant="light" color="green">
            {doc.demos.length} DEMOS
          </Tag>
          <Tooltip title="需本地运行 npm run storybook (端口 6006)" placement="bottom">
            <Button size="sm" type="ghost" href={storybookUrl(doc)} target="_blank" icon={<Icon name="book" />}>
              STORYBOOK
            </Button>
          </Tooltip>
          <Tooltip title={`src/components/${doc.name}/${doc.name}.tsx`} placement="bottom">
            <Button size="sm" type="text" icon={<Icon name="code" />}>
              SOURCE
            </Button>
          </Tooltip>
        </div>
      </header>

      <h2 className="section-title">
        <Icon name="play" size={12} /> EXAMPLES
      </h2>
      {doc.demos.map((demo, i) => (
        <DemoBlock key={i} demo={demo} index={i} />
      ))}

      {doc.props && (
        <>
          <h2 className="section-title">
            <Icon name="gear" size={12} /> API
          </h2>
          {doc.props.map((p, i) => (
            <div key={i} style={{ marginBottom: 28 }}>
              <h3 className="px" style={{ fontSize: 11, margin: "0 0 12px", fontWeight: 400 }}>
                {p.title ?? doc.name} PROPS
              </h3>
              <Table className="props-table" size="sm" columns={propColumns} dataSource={p.rows} rowKey="name" />
            </div>
          ))}
        </>
      )}

      <nav className="pager">
        {prev ? (
          <a href={href(`/components/${prev.key}`)} className="prev">
            <span>← PREV</span>
            <b>
              {prev.name} {prev.cn}
            </b>
          </a>
        ) : (
          <span />
        )}
        {next ? (
          <a href={href(`/components/${next.key}`)} className="next">
            <span>NEXT →</span>
            <b>
              {next.name} {next.cn}
            </b>
          </a>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
};
