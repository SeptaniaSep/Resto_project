<?php

namespace App\Http\Controllers;

use App\Repositories\RoleRepository;
use App\Services\RoleServices;
use App\Services\UserRoleService;
use Illuminate\Http\Request;

class UserRoleController extends Controller
{
    protected $service;
    

    public function __construct(UserRoleService $service)
    {
        $this->service = $service;    
    }
    public function getUserRole()
    {
        return $this->service->getUserRole();
    }
    
    public function createUserRole(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
        $userId = $request->get('user_id');
        return $this->service->createUserRole($userId, $request);
    }

    public function updateUserRole(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
        return $this->service->updateUserRole($id, $request);
    }

    public function deleteUserRole($id)
    {
         return $this->service->deleteUserRole($id);
    }
}