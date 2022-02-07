<template>
  <div class="app">
    <div class="header">
      <div class="name">v3design</div>
      <div class="menu"></div>
    </div>
    <designer />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.app {
  .header {
    height: 60px;
    padding: 0 20px;
    position: relative;
    display: flex;
    align-items: center;
    cursor: default;
    background-color: $white-color;
    border-bottom: 1px solid #dcdee2;
    .name {
      display: inline-block;
      color: rgba(0, 0, 0, 0.8);
      font-size: 20px;
      font-weight: 600;
      margin-left: 5px;
    }
    .menu {
      position: absolute;
      right: 0;
    }
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 30px;
    padding: 0 20px;
    font-size: 16px;
    border-top: 1px solid #ececec;
    background-color: #fff;
    cursor: pointer;
  }
}
</style>
