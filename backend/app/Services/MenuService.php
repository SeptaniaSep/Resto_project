<?php

namespace App\Services;

use App\Helpers\ApiResponse;
use App\Repositories\MenuRepository;

class MenuService
{
     protected $repo;

    public function __construct(MenuRepository $menuRepository)
    {
        $this->repo = $menuRepository;
    }

    public function getAllMenus()
    {
        return ApiResponse::success($this->repo->show(), 'Successfully', 201);
    }
  
    public function getMenuById($id)
    {
        try {
            $menu = $this->repo->getById($id);
            
            if (!$menu) {
                ApiResponse::notFound("Menu with ID {$id} not found");
            }
            
            return ApiResponse::success($menu, 'Successfully', 201);
        }catch (\Exception $e) {
            return ApiResponse::notFound($e->getMessage());
        }
       
    }
    public function createMenu(array $data)
    {
        if (empty($data['name']) || empty($data['price'])) {
            ApiResponse::badRequest('Menu name and price must be filled in');
        }

        return $this->repo->create($data);
    }

    public function updateMenu($id, array $data)
    {
        return $this->repo->update($id, $data);
    }

    public function deleteMenu($id)
    {
        return $this->repo->delete($id);
    }
}