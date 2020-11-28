<?php
namespace app\controller;

use app\BaseController;

class CommonController extends BaseController{
    public function _initialize(){
        //判断用户是否已经登录
        if (!isset($_SESSION['user_id'])) {
            return json(['msg'=>'请先登录']);
        }else{
            return json(['msg'=>'拦截成功']);
        }
    }
}