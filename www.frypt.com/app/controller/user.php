<?php
namespace app\controller;

use app\BaseController;
use app\controller\CommonController;
use think\exception\HttpException;
use think\facade\Db;
use think\facade\Request;
use think\captcha\facade\Captcha;

class User extends BaseController
{
    protected $middleware = ['check'=> ['except' => [''],
                                        'only' => ['changePsw','']
                                    ]];
    /**
     * 登录
     */
    public function login()
    {
        $username = Request::param('username');
        $password = Request::param('password');
        if (Db::table('ad_user')->where('username', $username)->limit(1)->find()) {
            if ($res = Db::table('ad_user')->where('username', $username)->where('password', $password)->limit(1)->find()) {
                session_start();
                session('user_id', $res['id']); // 保存用户登录信息
                return json([
                    'code'=>0,
                    'msg'=>'登录成功',
                    'username'=>$res['username'],
                    'user_id'=>$res['id'],
                    'role'=>$res['role']
                    ]);
            } else {
                return json(['code'=>1,'msg'=>'密码错误']);
            }
        }
        return json(['code'=>2,'msg'=>'该用户不存在，请先注册']);
    }

    /**
     * 退出登录
     */
    public function logout(){
        // unset($_SESSION['user_id']);  // TD:清除session无效
        session_unset();
    }

    /**
     * 注册
     */
    public function register()
    {
        $username = Request::param('username');
        $password = Request::param('password');
        $data = ['username'=>$username,'password'=>$password];
        try {
            if (Db::table('ad_user')->where('username', $username)->limit(1)->find()) {
                return json(['code'=>1,'msg'=>"该用户已存在"]);
            }
            if (Db::table('ad_user')->strict(false)->insert($data)) {
                return json(['code'=>0,'msg'=>"恭喜你，注册成功！"]);
            }
        } catch (\Throwable $th) {
            throw new HttpException(520, "服务器错误");
        }
    }

    /**
     * 修改密码
     */
    public function changePsw(){
        $user_id = session('user_id');
        $psw = Request::param('password');
        if(Db::table('ad_user')->where('id',$user_id)->update(['password'=>$psw])){
            return json([
                'code' => 0,
                'msg' => '密码修改成功'
            ]);
        }else{
            return json([
                'code' => 1,
                'msg' => '密码修改失败'
            ]);
        }
    }

    /**
     * 验证码
     */
    public function verify()
    {
        $value = Request::param('captcha');
        if (!$value) {
             return Captcha::create();
        }
        if (!captcha_check($value.'')) {
            // 验证失败
            return json(['code'=>1,'msg'=>'验证码错误']);
        }
        return json(['code'=>0,'msg'=>'验证码正确']);
    }
}
