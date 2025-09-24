<?php

namespace App\Services;

use App\Helpers\ApiResponse;
use App\Repositories\ListOrderRepository;

class ListOrderService
{
    protected $repo;

    public function __construct(ListOrderRepository $listOrderRepository)
    {
        $this->repo = $listOrderRepository;
    }

    public function getAllListOrder()
    {
        return ApiResponse::success($this->repo->show(), 'Successfully', 201);
    }

    public function getListOrderById($id)
    {
        return ApiResponse::success($this->repo->getById($id), 'Successfully', 201);
    }

    public function createListOrder($data)
    {
        return ApiResponse::success($this->repo->create($data), 'Successfully', 201);
    }

}