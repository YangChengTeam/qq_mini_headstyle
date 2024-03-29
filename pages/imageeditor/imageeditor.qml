
<import src='/pages/common/common_bar.wxml' />

<!--引用自定义导航栏模板-->
<template is="bar" data='{{statusBarHeight:statusBarHeight,titleBarHeight:titleBarHeight,left_type:1,title_txt:"头像达人"}}' />

<view wx:if="{{!combine}}" style='padding-top:{{statusBarHeight + titleBarHeight}}px;' >
  <view class="container_edit" id="container" bind:touchstart="touchStart" bind:touchend="touchEnd" bind:touchmove="touchMove">
    <image class="bg" src="{{bgPic}}" mode='widthFix'></image>
    <image wx:if="{{is_sticker}}" class="cancel" id="cancel" src="../../images/delete_icon.png" bindtap='deletesticker' style="top:{{cancelCenterY-12+'px'}};left:{{cancelCenterX-12+'px'}}"></image>
    <image wx:if="{{is_sticker}}"  class="handle" id="handle" src="../../images/move_icon.png" color="green" style="top:{{handleCenterY-10+'px'}};left:{{handleCenterX-10+'px'}}"></image>
    <image wx:if="{{is_sticker}}" class="hat" id='hat' src="{{current_hat_img}}" style="top:{{hatCenterY-hatSize/2-2+'px'}};left:{{hatCenterX-hatSize/2-2+'px'}};transform:rotate({{rotate+'deg'}}) scale({{scale}})"></image>
  </view>
</view>

<view class='bottom-view'>
  <view class='list-collect'>
    <view class='left-list'>
      <view wx:for='{{left_list}}' wx:key='id' bindtap='leftClick' data-i='{{index}}'
      class="left-list-item {{index == leftindex?'left-item-selected':''}}">{{item}}</view>
    </view>
    <view class='line-view'></view>
    <scroll-view class="scrollView" scroll-y>
      <image class="imgList" wx:for="{{pendantlist}}" wx:key="{{index}}" wx:item='{{item}}' src="{{item.ico}}" data-hat-id="{{index}}" bind:tap="chooseImg"></image>
    </scroll-view>
  </view>
  <view class='create-view'><text bind:tap="combinePic" class='confirm_create'>完  成</text></view>
</view>
