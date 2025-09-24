<?php

namespace App\Http\Controllers;

use App\Services\PermissionService;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    protected $service;

    public function __construct(PermissionService $service)
    {
        $this->service = $service;   
    }
    public function getPermission()
    {
        return $this->service->getPermission();
    }
    public function createPermission(Request $request)
    {
        // $userId = $request->get('user_id');
        $request->validate([
            'features' => 'required|string|max:255',
        ]);

        return $this->service->createPermission($request);
    }
    public function updatePermission(Request $request, $id)
    {
        $request->validate([
            'features' => 'required|string|max:255',
        ]);

        return $this->service->updatePermission($id, $request);
    }
    public function deletePermission($id)
    {
        return $this->service->deletePermission($id);
    }
}