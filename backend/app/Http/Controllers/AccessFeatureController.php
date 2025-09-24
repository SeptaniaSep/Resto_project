<?php

namespace App\Http\Controllers;

use App\Services\AccessFeatureService;
use Illuminate\Http\Request;

class AccessFeatureController extends Controller
{
    protected $service;
    
    public function __construct(AccessFeatureService $service)
    {
        $this->service = $service;    
    }

    public function getAccessFeature()
    {
        return $this->service->getAccessFeature();
    }
    public function createAccessFeature(Request $request)
    {
        $request->validate([
            'features' => 'required|string|max:255',
            'roles' => 'required|string|max:255',
        ]);
        return $this->service->createAccessFeature($request->all());
    }
    public function updateAccessFeature(Request $request, $id)
    {
        $request->validate([
            'features' => 'nullable|string|max:255', 
            'roles' => 'nullable|string|max:255',
        ]);
        return $this->service->updateAccessFeature($id, $request->all());
    }
    public function deleteAccessFeature($id)
    {
        return $this->service->deleteAccessFeature($id);
    }
}