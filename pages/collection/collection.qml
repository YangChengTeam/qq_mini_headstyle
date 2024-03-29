<import src='/pages/common/common_bar.wxml' />

<!--引用自定义导航栏模板-->
<template is="bar" data='{{statusBarHeight:statusBarHeight,titleBarHeight:titleBarHeight,left_type:1,title_txt:title_txt}}' />

  <view class='top-view' style='padding-top:{{statusBarHeight + titleBarHeight}}px;'>
    <image src='{{top_img}}' class='top-img'></image>
    <view class='banner-remark'>
      <text class='title'>{{title}}</text>
      <text class="des">{{des}}</text>
    </view>
  </view>
  <view class='img-list'>
    <block wx:for="{{array}}" wx:for="{{array}}" wx:key="id" wx:for-item="item">
      
      <view class='img-item' style="{{item.fixStyles}}" bindtap='imagedetail' data-index='{{index}}' data-keep='{{item.is_keep}}' data-sharetitle='{{item.share_title}}'>
        <image src='{{item.hurl}}' class='item-img' mode='widthFix'></image>
      </view>
    </block>
    <view class='load_more' wx:if="{{is_load_more}}">
      <image src='/images/load_more.gif' class='load_more_image'></image>
    </view>
  </view>

<view class="bottom-tab">
  <view class="bottom-tab-item" bindtap="toHome">
    <image class='category-img' src='../../images/category_home.png'></image>
    <text class='category-txt'>首页</text>
  </view>
  <view class="bottom-share-item">
    <view class='bottom-tab-item'>
      <image class='category-img' src='../../images/category_share.png'></image>
      <text class='category-txt'>分享</text>
    </view>
    <view>
      <button class='share-btn' open-type='share'></button>
    </view>
  </view>
  <view class="bottom-tab-item" bindtap="toTop">
    <image class='category-img' src='../../images/category_up.png'></image>
    <text class='category-txt'>返回顶部</text>
  </view>
</view>