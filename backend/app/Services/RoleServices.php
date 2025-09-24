<?php

namespace App\Services;

use App\Helpers\ApiResponse;
use App\Repositories\RoleRepository;

class RoleServices
{
    protected $repo;

    public function __construct(RoleRepository $repo)
    {
        $this->repo = $repo;
    }

    public function getRole()
    {
       return ApiResponse::success($this->repo->show(), 'Successfully', 201);
    }

    public function createRole($data)
    {
        $response = $this->repo->create($data);
        return ApiResponse::success($response, 'Create Successfully', 201);
    }

    public function updateRole($id, $data)
    {
        $response = $this->repo->update($id,$data);
        return ApiResponse::success($response, 'Update Successfully', 201);
    }

    public function deleteRole($id)
    {
        $response = $this->repo->delete($id);
        return ApiResponse::success($response, 'Delete Successfully', 201);
    }


}