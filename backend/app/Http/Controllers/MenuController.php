<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Services\MenuService;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    protected $menuService;

    public function __construct(MenuService $menuService)
    {
        $this->menuService = $menuService;
    }
    public function index()
    {
       return $this->menuService->getAllMenus();
    }

    public function show($id)
    {
        return $this->menuService->getMenuById($id);
    }
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
        ]);

        $menuId = $this->menuService->createMenu($data);
        $menu = $this->menuService->getMenuById($menuId);
        return ApiResponse::success($menu, 'Create Successfully');
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'name' => 'nullable|string',
            'description' => 'nullable|string',
            'price' => 'nullable|numeric',
        ]);

        $menu = $this->menuService->updateMenu($id, $data);

        if ($menu) {
            return ApiResponse::success($menu, 'Update Successfully');
        }

        return ApiResponse::notFound('Menu not found');
    }
    
        public function destroy($id)
    {
        $deleted = $this->menuService->deleteMenu($id);

        if ($deleted) {
            return ApiResponse::success(null, 'Menu deleted successfully');
        }

        return ApiResponse::notFound('Menu not found');
    }
}