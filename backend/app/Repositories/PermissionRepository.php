<?php
namespace App\Repositories;

use App\Helpers\ApiResponse;
use Illuminate\Support\Facades\DB;

class PermissionRepository
{
    public function show()
    {
        return DB::table('permissions')->get();
    }

    public function getById($id)
    {
        return DB::table('permissions')->where($id);
    }

    public function getIdByFeatures(string $features)
    {
        return DB::table('permissions')->select('id')->where(['features' => $features])->first();
    }
    
    public function create($data)
    {
        return DB::table('permissions')->insert([
            'features'=>$data['features'],
            'created_at'=> now(),
            'updated_at' => now()
        ]);
    }

    public function update($id, $data)
    {   
        $permission = DB::table('permissions')->where('id', $id);
        if (!$permission) {
            return ApiResponse::notFound('permissions Not Found'); 
        }
        return DB::table('permissions')
           ->where('id', $id)
           ->update([
                'features' => $data['features'],
                'updated_at' => now(),
        ]);
    }

    public function delete($id)
    {
        $permission = DB::table('permissions')->where('id', $id);
        if (!$permission) {
            return ApiResponse::notFound('permissions Not Found'); 
        }
        return DB::table('permissions')->delete([
            "id"=> $id
        ]); 
    }

}