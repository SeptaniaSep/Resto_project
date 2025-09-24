<?php

namespace App\Services;

use App\Helpers\ApiResponse;
use App\Repositories\RoleRepository;
use App\Repositories\UserRoleRepository;

class UserRoleService
{
    protected $repo;
    protected $roleRepository;

    public function __construct(UserRoleRepository $repo, RoleRepository $roleRepository)
    {
        $this->repo = $repo;
        $this->roleRepository = $roleRepository;  
    }
    public function getUserRole()
    {
       return ApiResponse::success($this->repo->show(), 'Successfully', 201);
    }
    public function createUserRole($userId, $data)
    {
        $roleId = $this->roleRepository->getIdRoleByName($data['name']);
        $response = $this->repo->create($userId,$roleId->id);
        return ApiResponse::success($response, 'Create Successfully', 201);
    }
    public function updateUserRole($id, $data)
    {
        $roleId = $this->roleRepository->getIdRoleByName($data['name']);
        if($roleId == null){
            return ApiResponse::notFound('Role Not Found');
        }
        $response = $this->repo->update($id, $roleId->id);
        return ApiResponse::success($response, 'Update Successfully', 201);
    }

    public function deleteUserRole($id)
    {
        $this->repo->delete($id);
        return ApiResponse::success(null, 'Delete Successfully', 201);
    }
}