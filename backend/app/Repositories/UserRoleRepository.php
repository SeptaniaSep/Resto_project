<?php
namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class UserRoleRepository
{
    public function show()
    {
        return DB::table('users as u')
            ->join('user_roles as ur', 'u.id', '=', 'ur.user_id')  
            ->leftJoin('roles as r', 'r.id', '=', 'ur.role_id') 
            ->select('ur.id','u.id as user_id', 'u.email as email', 'ur.role_id as role_id', 'r.name as role_name')
            ->get();
    }

    public function getById($id)
    {
        return DB::table('user_roles')->where(['id'=> $id]);
    }
    
    public function create($userId, $role_id)
    {
        return DB::table('user_roles')->insert([
            'user_id' => $userId,
            'role_id' => $role_id,
            'created_at' => now(),
            'updated_at' => now(),
        ]); 
    }

    public function update($id, $role_id)
    {
        return DB::table('user_roles')
            ->where(['id'=> $id])
            ->update([
                "role_id" => $role_id,
                'updated_at' => now()
            ]);
    }

    public function delete($id)
    {
        return DB::table('user_roles')->delete([
            "id"=> $id
        ]);
    }

}