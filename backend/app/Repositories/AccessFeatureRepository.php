<?php
namespace App\Repositories;

use App\Helpers\ApiResponse;
use Exception;
use Illuminate\Support\Facades\DB;

class AccessFeatureRepository
{
    protected $roleRepository;
    protected $permissionRepository;

    public function __construct(RoleRepository $roleRepository, PermissionRepository $permissionRepository)
    {
        $this->roleRepository = $roleRepository;
        $this->permissionRepository = $permissionRepository;
    }

    public function show()
    {
        return DB::table('acl_features as af')
            ->join('permissions as p', 'af.permission_id', '=', 'p.id')
            ->join('roles as r', 'af.role_id', '=', 'r.id')
            ->select('af.id', 'af.permission_id', 'p.features', 'af.role_id', 'r.name as role_access')
            ->orderBy('p.features', 'ASC')
            ->get();

    }

    public function getById($id)
    {
        return DB::table('acl_features')->where(['id'=>$id])->first();
    }
    
    public function create($feature, $role)
    {
        DB::beginTransaction();
        try{
            $permission = $this->permissionRepository->getIdByFeatures($feature);
            if (!$permission) {
                DB::rollBack();
                return ApiResponse::notFound('Permission not found');
            }

            $roleData = $this->roleRepository->getIdRoleByName($role);
            if (!$roleData) {
                DB::rollBack();
                return ApiResponse::notFound('Role not found');
            }
            
             DB::table('acl_features')->insert([
                'permission_id' => $permission->id,
                'role_id' => $roleData->id,
                'created_at'=> now(),
                'updated_at' => now()
            ]);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return ApiResponse::somethingwentwrong('Something went wrong');
        }
    }

    public function update($id, $data)
    {
        DB::beginTransaction();
        try {
            $acl = $this->getById($id);
             if (!$acl) {
                DB::rollBack();
                return ApiResponse::notFound('Access Feature not found');
            }
            
            if (isset($data['features'])) {
                $permission = $this->permissionRepository->getIdByFeatures($data['features']);
                if (!$permission) {
                    DB::rollBack();
                    return ApiResponse::notFound('Permission not found');
                }
            }

            if (isset($data['roles'])) {
                $roleData = $this->roleRepository->getIdRoleByName($data['roles']);
                if (!$roleData) {
                    DB::rollBack();
                    return ApiResponse::notFound('Role not found');
                }
            }
            
            DB::table('acl_features')
                ->where('id', $id)
                ->update([
                    'permission_id' => $permission->id ?? $acl->permission_id,
                    'role_id' => $roleData->id ?? $acl->role_id,
                    'updated_at' => now(),
                ]);
            DB::commit();
        } catch (Exception $e){
            DB::rollBack();
            return ApiResponse::somethingwentwrong('Something went wrong');
        }
    }

    public function delete($id)
    {
         return DB::table('acl_features')->delete([
            "id"=> $id
        ]);
    }

}