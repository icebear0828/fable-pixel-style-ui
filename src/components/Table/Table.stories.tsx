import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table, type TableColumn } from "./Table";
import { Tag } from "../Tag/Tag";
import { Progress } from "../Progress/Progress";

interface Hero {
  id: number;
  name: string;
  job: string;
  level: number;
  hp: number;
  status: "ALIVE" | "DEAD" | "AFK";
}
const DATA: Hero[] = [
  { id: 1, name: "PIXEL CAT", job: "WARRIOR", level: 42, hp: 88, status: "ALIVE" },
  { id: 2, name: "SLIME", job: "TANK", level: 7, hp: 35, status: "AFK" },
  { id: 3, name: "GHOSTY", job: "MAGE", level: 99, hp: 12, status: "DEAD" },
  { id: 4, name: "KNIGHT", job: "PALADIN", level: 56, hp: 100, status: "ALIVE" },
  { id: 5, name: "ARCHER", job: "RANGER", level: 31, hp: 64, status: "ALIVE" },
  { id: 6, name: "BARD", job: "SUPPORT", level: 18, hp: 50, status: "AFK" },
];
const STATUS = { ALIVE: "green", DEAD: "red", AFK: "yellow" } as const;
const columns: TableColumn<Hero>[] = [
  { key: "name", title: "NAME", dataIndex: "name", sorter: true },
  { key: "job", title: "JOB", dataIndex: "job" },
  { key: "level", title: "LV", dataIndex: "level", align: "center", sorter: true, width: 80 },
  { key: "hp", title: "HP", dataIndex: "hp", width: 180, render: (v) => <Progress percent={v} variant="hp" size="sm" showInfo={false} /> },
  { key: "status", title: "STATUS", dataIndex: "status", render: (v: Hero["status"]) => <Tag color={STATUS[v]}>{v}</Tag> },
];

const meta = {
  title: "Data/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    bordered: { control: "boolean" },
    striped: { control: "boolean" },
    loading: { control: "boolean" },
    columns: { control: false },
    dataSource: { control: false },
  },
  args: { columns: columns as TableColumn[], dataSource: DATA, rowKey: (r: unknown) => (r as Hero).id, size: "md", bordered: false, striped: false, loading: false, pagination: false },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Striped: Story = { args: { striped: true, bordered: true } };
export const Paginated: Story = { args: { pagination: { pageSize: 3 }, size: "sm" } };
export const Loading: Story = { args: { loading: true } };
export const Empty: Story = { args: { dataSource: [] } };
export const Scroll: Story = { args: { maxHeight: 200, size: "sm" } };
