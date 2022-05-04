<template>
  <a-layout id="wrapper">
    <a-layout-header>
      <div id="logo_and_title">
        <div id="logo">
          <img src="../assets/logo.svg" alt="" />
        </div>
        <h1 id="title">HLJUBBS</h1>
      </div>
      <Navbar />
    </a-layout-header>
    <a-layout-content style="padding: 30px 50px">
      <div id="content">
       <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">
          <template #footer>
            <div>
              <b>ant design vue</b>
              footer part
            </div>
          </template>
          <template #renderItem="{ item }">
            <a-list-item key="item.title">
              <template #actions>
                <span v-for="{ type, text } in actions" :key="type">
                  <component :is="type" style="margin-right: 8px" />
                  {{ text }}
                </span>
              </template>
              <template #extra>
                <img
                  width="272"
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              </template>
              <a-list-item-meta :description="item.description">
                <template #title>
                  <a :href="item.href">{{ item.title }}</a>
                </template>
                <template #avatar><a-avatar :src="item.avatar" /></template>
              </a-list-item-meta>
              {{ item.content }}
            </a-list-item>
          </template>
        </a-list>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>
<script>
import { defineComponent } from "@vue/runtime-core";
import { getTopics } from "@/api/api.js";
// import request from "../api/request";
const axios = require("axios");
import Navbar from "@/components/Navbar";
import {
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
} from "@ant-design/icons-vue";
let listData = [];
getTopics().then((res) => {
  listData = res.topic;
  console.log("帖子请求完成", res.topic);
  console.log("list", listData);
});

// for (let i = 0; i < 23; i++) {
//   listData.push({
//     href: "",
//     title: `ant design vue part ${i}`,
//     avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
//     description:
//       "Ant Design, a design language for background applications, is refined by Ant UED Team.",
//     content:
//       "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
//   });
// }
export default defineComponent({
  name: "Index",
  components: {
    Navbar,
    StarOutlined,
    LikeOutlined,
    MessageOutlined,
  },
  setup() {
    const pagination = {
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 7,
    };
    const actions = [
      {
        type: "StarOutlined",
        text: "156",
      },
      {
        type: "LikeOutlined",
        text: "156",
      },
      {
        type: "MessageOutlined",
        text: "2",
      },
    ];
    return {
      listData,
      pagination,
      actions,
    };
  },
});
</script>
<style lang="less">
#wrapper {
  #content {
    background: #fff;
    padding: 24px;
    min-height: 1000px;
  }
  .ant-layout-header {
    display: flex;
    justify-content: space-between;
    #logo_and_title {
      float: left;
      display: flex;
      #logo {
        img {
          height: 50px;
        }
        margin-right: 10px;
      }
      #title {
        color: white;
      }
    }
    .a-layout-header {
      width: 60%;
    }
  }
}
</style>