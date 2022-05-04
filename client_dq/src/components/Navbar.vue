<template>
  <div id="wrapper">
    <div id="menu">
      <a-menu mode="horizontal" theme="dark" @click="handleClick">
        <a-menu-item key="home" class="menu-item">
          首页
        </a-menu-item>
        <a-menu-item key="sign_in" class="menu-item">
          注册
        </a-menu-item>
        <a-menu-item key="login" class="menu-item">
          登录
        </a-menu-item>
        <a-menu-item key="logout" class="menu-item">
          退出登录
        </a-menu-item>
      </a-menu>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import {
  MailOutlined,
} from "@ant-design/icons-vue";
import HomeVue from "../views/Home.vue";
export default defineComponent({
  name: "Navbar",
  components: {
    MailOutlined,
  },
  setup() {
    const handleClick = (e) => {
      console.log('click ', e);
      switch (e.key) {
        case 'home': {

          break;
        }
        case 'sign_in': {

          break;
        }
        case 'login': {

          break;
        }
        case 'logout': {

          break;
        }
      }
    };
    const current = ref(["home"]);
    return {
      current,
      handleClick,
    };
  },
  
});


</script>

<style lang="less" scoped>
#wrapper {
  // display: flex;
  justify-content: space-between;

  #menu {
    #title {
      line-height: 46px;
      vertical-align: center;
			position: absolute;
    }
    .menu-item {
      position: relative;
    }
    .ant-menu {
      // flex-direction: row-reverse;
    }
  }
}
</style>