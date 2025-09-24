<?php
namespace App\Repositories;

use App\Helpers\ApiResponse;
use Illuminate\Support\Facades\DB;

class RoleRepository
{
    public function show()
    {
        return DB::table('roles')->get();
    }

    public function create($data)
    {
        return DB::table('roles')->insert([
            'name' => $data['name'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);   
    }
    public function getRoles($userId)
    {
       return DB::table('user_roles as ru')
        ->join('roles as r', 'r.id', '=', 'ru.role_id')
        ->where('ru.user_id', $userId)
        ->pluck('r.name')
        ->toArray();
    }
    public function getIdRoleByName(string $name)
    {
        return DB::table('roles')->select('id')->where(['name' => $name])->first();
    }

    public function update($id, $data)
    {
        $role = DB::table('roles')->where('id', $id)->first();
        if (!$role) {
            return ApiResponse::notFound('Role Not Found'); 
        }
        return DB::table('roles')
            ->where('id', $id)
            ->update([
                'name' => $data['name'],
                'updated_at' => now(),
        ]);
    }

    public function delete($id)
    {
        return DB::table('roles')->delete([
            "id"=> $id
        ]);
    }

}