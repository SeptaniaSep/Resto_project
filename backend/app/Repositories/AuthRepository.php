<?php
namespace App\Repositories;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthRepository
{
    public function show()
    {

    }

    public function getUsersByEmail($email)
    {
        return DB::table('users')->where('email', $email)->first();
    }
    
    public function create($data)
    {
        try {
            DB::beginTransaction();
            
            if (DB::table('users')->where('email', $data['email'])->exists()) {
                return [
                    'status' => 'error',
                    'message' => 'The email address is already taken. Please choose another.',
                    'code' => 409
                ];
            }
            
            $data['roles'] = $data['roles'] ?? 'Pelayan';
            $roleId = DB::table('roles')
                ->where('name', $data['roles'])
                ->value('id');

            if (!$roleId) {
                return [
                    'status' => 'error',
                    'message' => 'Role not found',
                    'code' => 404
                ];
            }
            $now = now();
            $userId = DB::table('users')->insertGetId([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'created_at' => $now,
                'updated_at' => $now
            ]);

            DB::table('user_roles')->insert([
                'user_id' => $userId,
                'role_id' => $roleId,
                'created_at' => $now,
                'updated_at' => $now
            ]);

            DB::commit();

            return [
                'status' => 'success',
                'data' => [
                    'id' => $userId,
                    'email' => $data['email'],
                    'role' => $data['roles'],
                ]
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            return [
                'status' => 'error',
                'message' => 'Register failed: ' . $e->getMessage(),
                'code' => 500
            ];
        }
    }

    public function update($id)
    {

    }

    public function delete($id)
    {

    }

}