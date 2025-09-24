<?php

namespace App\Http\Controllers;

use App\Services\RoleServices;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    protected $service;

    public function __construct(RoleServices $service)
    {
        $this->service = $service;   
    }

    public function getRole()
    {
        return $this->service->getRole();
    }
    
    public function createRole(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
        
        return $this->service->createRole($request);
    }
    public function updateRole(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
        return $this->service->updateRole($id, $request);
    }
    public function deleteRole($id)
    {
        return $this->service->deleteRole($id);
    }

}