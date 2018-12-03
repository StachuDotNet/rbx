import { storiesOf } from "@storybook/react";
import React from "react";

import { List } from "@/components";

storiesOf("Components/List", module).add("Default", () => (
  <List hoverable>
    <List.Item>Featured</List.Item>
    <List.Item>All Posts</List.Item>
    <List.Item active>Announcements</List.Item>
    <List.Item>Business</List.Item>
    <List.Item>Community</List.Item>
    <List.Item>Data</List.Item>
    <List.Item>Editor Tools</List.Item>
    <List.Item>Education</List.Item>
    <List.Item>Engineering</List.Item>
    <List.Item>Events</List.Item>
    <List.Item>Policy</List.Item>
  </List>
));
