<?php

namespace app\controller;

use app\BaseController;
use think\facade\Db;
use think\facade\Request;

class Company extends BaseController
{
    protected $middleware = ['check'=> ['except' => [''],
                                        'only' => ['auth','findAll','findById','audit']
                            ]];

    public function auth()
    {
        $user_id = session('user_id');
        $req = Request::param();
        $data = ['company'=>$req['company'],'name'=>$req['name'],'telephone'=>$req['telephone'],
                'vx'=>$req['vx'],'email'=>$req['email'],'license'=>$req['license'],
                'license_img'=>$req['license_img'],'audit'=>1,'user_id'=>$user_id];
        $ret = Db::table('ad_company')->strict(false)->insert($data);
        if ($ret) {
            return json(['code'=>0,'msg'=>'提交成功']);
        }
        return json(['code'=>1,'msg'=>'提交失败']); // TBD:异常处理
    }

    public function findAll(){
        $num = Request::param('num');
        $page = Request::param('page');
        $list = Db::name('company')->paginate(['list_rows'=>$num,'page'=>$page]);
        return json([
            "code" => 0,
            "msg" => "查询成功",
            "lists" => $list
        ]);
    }

    public function findById(){
        $id = Request::param('id');
        $res = Db::table('ad_company')->where('user_id',$id)->limit(1)->find();  // TD:兼容user_id 和 企业id : 一个user_id 对应 一个企业id
        return json([
            'code'=>0,
            'msg'=>"查询成功",
            'data'=>$res
        ]);
    }

    public function audit(){
        $req = Request::param();
        if(Db::table('ad_company')->where('id',$req['id'])->update(['audit'=>$req['audit'],'reason'=>$req['reason']])){
            return json(['code'=>0,'msg'=>'操作成功']);
        }else{
            return json(['code'=>1,'msg'=>'操作失败']);
        }
    }
}
